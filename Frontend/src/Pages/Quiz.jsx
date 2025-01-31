import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import QuestionCard from '../Components/QuestionCard'
import Options from '../Components/Options'

function Quiz() {
  const navigate = useNavigate()
  const [questions, setQuestions] = useState([])
  const [currentQuestionIndex, setcurrentQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/quiz`
        )
        if (response?.data?.success) {
          setQuestions(response?.data?.data?.questions)
        }
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching quiz data:', error)
      }
    }
    fetchQuizData()
  }, [])

  useEffect(() => {
    // Load progress from localStorage
    const savedProgress = JSON.parse(sessionStorage.getItem('quizProgress'))
    if (savedProgress) {
      setSelectedAnswers(savedProgress.selectedAnswers || {})
      setScore(savedProgress.score || 0)
    }
  }, [])

  function handleAnswer(selectedOption) {
    const questionId = questions[currentQuestionIndex].id
    const prevAnswer = selectedAnswers[questionId] // Get previous answer

    let newScore = score

    // If user previously selected the correct answer, subtract 4 points
    if (prevAnswer?.is_correct) {
      newScore -= 4
    }

    // If the new selected option is correct, add 4 points
    if (selectedOption.is_correct) {
      newScore += 4
    }

    setScore(newScore) // Update the score
    // Store new answer
    const updatedAnswers = {
      ...selectedAnswers,
      [questionId]: selectedOption
    }
    setSelectedAnswers(updatedAnswers)

    // Save progress in localStorage
    sessionStorage.setItem(
      'quizProgress',
      JSON.stringify({
        selectedAnswers: updatedAnswers,
        score: newScore
      })
    )
  }

  function handleNext() {
    if (currentQuestionIndex < questions.length - 1) {
      setcurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  function handlePrev() {
    if (currentQuestionIndex > 0) {
      setcurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  if (isLoading) {
    return (
      <div className="text-center text-xl pt-10 bg-gradient-to-br from-blue-500 to-indigo-700 min-h-screen">
        Loading Quiz...
      </div>
    )
  }
  return (
    <div className="mx-auto px-2 flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-700 text-white min-h-screen">
      <div
        className="bg-white text-black text-
            lg  py-4 rounded-lg shadow-lg w-full sm:w-3/4 lg:w-1/2  text-center"
      >
        {questions.length > 0 && (
          <>
            <QuestionCard
              question={questions[currentQuestionIndex].description}
            />
            <Options
              options={questions[currentQuestionIndex].options}
              onAnswerClick={handleAnswer}
              selectedOption={
                selectedAnswers[questions[currentQuestionIndex].id] || null
              }
            />
          </>
        )}
      </div>
      <div className="flex justify-between w-full  sm:w-3/4 lg:w-1/2  mt-6">
        <button
          className={`px-4 py-2 rounded-md shadow-md transition-all ${currentQuestionIndex === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 cursor-pointer'}`}
          onClick={handlePrev}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </button>

        <button
          className={`px-8 py-2 rounded-md shadow-md transition-all ${currentQuestionIndex === questions.length - 1 ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600 cursor-pointer'}`}
          onClick={handleNext}
          disabled={currentQuestionIndex === questions.length - 1}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default Quiz
