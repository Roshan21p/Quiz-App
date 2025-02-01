import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PrevNextButtons from '../Components/PrevNextButtons'

function Review() {
  const navigate = useNavigate()
  const [questions, setQuestions] = useState([])
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

  useEffect(() => {
    const storedQuestions = JSON.parse(sessionStorage.getItem('quizQuestions'))
    const savedProgress = JSON.parse(sessionStorage.getItem('quizProgress'))

    if (storedQuestions && savedProgress) {
      setQuestions(storedQuestions)
      setSelectedAnswers(savedProgress.selectedAnswers || {})
    }
  }, [])

  function handleNext() {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  function handlePrev() {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  if (questions.length === 0) {
    return (
      <div className="text-center text-xl pt-10 bg-gradient-to-br from-blue-500 to-purple-600 min-h-screen">
        Loading Review...
      </div>
    )
  }

  const currentQuestion = questions[currentQuestionIndex]
  const userSelectedOption = selectedAnswers[currentQuestion.id] // User's selected answer

  return (
    <div className="mx-auto  px-2 flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 text-white">
      <div className="bg-white text-black text-lg py-2 px-2  rounded-lg shadow-lg w-full sm:w-3/4 lg:w-1/2 text-center">
        <h2 className="text-2xl font-bold text-indigo-700 mb-4">
          Review Answers
        </h2>

        {/* Display Question */}
        <div className="text-left mb-6">
          <h3 className="text-lg font-semibold">
            {currentQuestion.description}
          </h3>
        </div>

        {/* Display Options */}
        <div className="flex flex-col gap-4">
          {currentQuestion.options.map((option) => {
            const isSelected = userSelectedOption?.id === option.id
            const isCorrect = option.is_correct
            const isWrong = isSelected && !isCorrect

            return (
              <div
                key={option.id}
                className={`flex items-center py-2 px-4 rounded-lg border border-indigo-500 shadow-md
                ${isCorrect ? 'bg-green-400 text-white' : ''}
                ${isWrong ? 'bg-red-500 text-white' : ''}
                `}
              >
                {/* Circle Indicator */}
                <div className="w-6 h-6 mr-2 flex items-center justify-center rounded-full border-2 border-indigo-500">
                  {isSelected && (
                    <div
                      className={`w-4 h-4  rounded-full ${
                        isCorrect ? 'bg-green-800' : 'bg-indigo-500'
                      }`}
                    ></div>
                  )}
                </div>

                <span className="text-black font-normal text-lg">
                  {option.description}
                </span>
              </div>
            )
          })}
        </div>
      </div>
      {/* Navigation Buttons */}
      <PrevNextButtons
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={questions.length}
        handlePrev={handlePrev}
        handleNext={handleNext}
        isPrevDisabled={currentQuestionIndex === 0}
        isNextDisabled={currentQuestionIndex === questions.length - 1}
      />
      {/* Back to Results */}
      <button
        className="mt-6 bg-amber-500 px-6 py-2 text-lg font-bold rounded-md shadow-md transition-all hover:bg-amber-600 cursor-pointer"
        onClick={() => navigate('/result')}
      >
        Back to Results
      </button>
    </div>
  )
}

export default Review
