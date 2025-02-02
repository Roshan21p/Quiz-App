import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import QuestionCard from '../Components/QuestionCard'
import Options from '../Components/Options'
import PrevNextButtons from '../Components/PrevNextButtons'
import toast from 'react-hot-toast'

function Quiz() {
  const navigate = useNavigate()

  const [quiz, setQuiz] = useState({
    questions: [],
    currentQuestionIndex: 0,
    score: 0,
    selectedAnswers: {},
    isLoading: true
  })

  const [timeLeft, setTimeLeft] = useState(300) // Separate state for time left

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes < 10 ? `0${minutes}` : minutes}:${remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}`
  }

  async function fetchQuizData() {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/quiz`
      )
      if (response?.data?.success) {
        const fetchedQuestions = response?.data?.data?.questions
        sessionStorage.setItem(
          'quizQuestions',
          JSON.stringify(fetchedQuestions)
        )
        setQuiz((prevState) => ({
          ...prevState,
          questions: fetchedQuestions,
          isLoading: false
        }))
      }
    } catch (error) {
      console.error('Error fetching quiz data:', error)
      navigate('/')
    }
  }

  function session() {
    // Load progress from sessionStorage
    const savedProgress = JSON.parse(sessionStorage.getItem('quizProgress'))
    const storedTime = JSON.parse(sessionStorage.getItem('quizTime'))

    if (savedProgress) {
      setQuiz((prevState) => ({
        ...prevState,
        score: savedProgress.score || 0,
        selectedAnswers: savedProgress.selectedAnswers || {}
      }))
    }

    if (storedTime) {
      setTimeLeft(storedTime)
    }
    // First, check if we have stored questions in sessionStorage
    const storedQuestions = JSON.parse(sessionStorage.getItem('quizQuestions'))

    if (storedQuestions && storedQuestions.length > 0) {
      setQuiz((prevState) => ({
        ...prevState,
        questions: storedQuestions,
        isLoading: false
      }))
    } else {
      fetchQuizData()
    }
  }

  function handleAnswer(selectedOption) {
    const questionId = quiz?.questions[quiz?.currentQuestionIndex]?.id
    const prevAnswer = quiz?.selectedAnswers[questionId] // Get previous answer

    let newScore = quiz?.score

    // If user previously selected the correct answer, subtract 4 points
    if (prevAnswer?.is_correct) {
      newScore -= 4
    }

    // If the new selected option is correct, add 4 points
    if (selectedOption?.is_correct) {
      newScore += 4
    }

    // Store new answer
    const updatedAnswers = {
      ...quiz?.selectedAnswers,
      [questionId]: selectedOption
    }

    setQuiz((prevState) => ({
      ...prevState,
      score: newScore,
      selectedAnswers: updatedAnswers
    }))

    // Save progress in sessionStorage
    sessionStorage.setItem(
      'quizProgress',
      JSON.stringify({
        selectedAnswers: updatedAnswers,
        score: newScore
      })
    )
  }

  function handleNext() {
    if (quiz?.currentQuestionIndex < quiz?.questions?.length - 1) {
      setQuiz((prevState) => ({
        ...prevState,
        currentQuestionIndex: prevState.currentQuestionIndex + 1
      }))
    }
  }

  function handlePrev() {
    if (quiz?.currentQuestionIndex > 0) {
      setQuiz((prevState) => ({
        ...prevState,
        currentQuestionIndex: prevState.currentQuestionIndex - 1
      }))
    }
  }

  function handleSubmit() {

    sessionStorage.removeItem('quizTime')
    navigate('/result')
  }

  useEffect(() => {
    session()
  }, [])

  useEffect(() => {
    if (!quiz?.isLoading && quiz?.questions?.length > 0) {
      if (timeLeft === 0) {
        handleSubmit()
      } else {
        if (timeLeft === 60) {
          toast('Hurry up! Only 1 minute left to complete the quiz!')
        }
        // save time left in session storage
        sessionStorage.setItem('quizTime', JSON.stringify(timeLeft))
        const countdown = setInterval(() => {
          setTimeLeft((prevTime) => prevTime - 1)
        }, 1000)

        //Cleanup the interval on component unmount
        return () => clearInterval(countdown)
      }
    }
  }, [timeLeft, quiz?.isLoading, quiz?.questions])

  if (quiz?.isLoading) {
    return (
      <div className="text-center text-xl pt-10 bg-gradient-to-br from-blue-500 to-purple-600 min-h-screen">
        Loading Quiz...
      </div>
    )
  }
  return (
    <div className="mx-auto px-2 flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 text-white min-h-screen">
      <div className="bg-white text-black text-lg py-4 rounded-lg shadow-lg w-full sm:w-3/4 lg:w-1/2 text-center">
        <div className="text-xl font-semibold mb-4">
          Time Left: {formatTime(timeLeft)}
        </div>
        {quiz?.questions?.length > 0 && (
          <>
            <QuestionCard
              question={
                quiz?.questions[quiz?.currentQuestionIndex]?.description
              }
            />
            <Options
              options={quiz?.questions[quiz?.currentQuestionIndex]?.options}
              onAnswerClick={handleAnswer}
              selectedOption={
                quiz?.selectedAnswers[
                  quiz?.questions[quiz?.currentQuestionIndex]?.id
                ] || null
              }
            />
          </>
        )}
      </div>

      <PrevNextButtons
        quiz={quiz}
        handlePrev={handlePrev}
        handleNext={handleNext}
      />
      {Object.keys(quiz?.selectedAnswers)?.length ===
        quiz?.questions?.length && (
        <div className=" mt-6">
          <button
            className="px-4 py-2 font-bold text-xl rounded-md bg-amber-500 shadow-md transition-all cursor-pointer"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      )}
    </div>
  )
}

export default Quiz
