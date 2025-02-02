import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PrevNextButtons from '../Components/PrevNextButtons'
import Confetti from 'react-confetti'

function Review() {
  const navigate = useNavigate()
  const [quiz, setQuiz] = useState({
    questions: [],
    selectedAnswers: {},
    currentQuestionIndex: 0
  })

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



  const currentQuestion = quiz?.questions[quiz?.currentQuestionIndex]
  const userSelectedOption = quiz?.selectedAnswers[currentQuestion?.id] // User's selected answer
  const isCorrect = userSelectedOption?.is_correct || false

  useEffect(() => {
    const storedQuestions = JSON.parse(sessionStorage.getItem('quizQuestions'))
    const savedProgress = JSON.parse(sessionStorage.getItem('quizProgress'))

    if (storedQuestions || savedProgress) {
      setQuiz((prevState) => ({
        ...prevState,
        questions: storedQuestions || [],
        selectedAnswers: savedProgress?.selectedAnswers || {}
      }))
    }
  }, [])

  
  if (quiz?.questions?.length === 0) {
    return (
      <div className="text-center text-xl pt-10 bg-gradient-to-br from-blue-500 to-purple-600 min-h-screen">
        Loading Review...
      </div>
    )
  }

  return (
    <div className="mx-auto  px-2 flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 text-white">
      {/* Container for Confetti */}
      <div className="relative w-full sm:w-3/4 lg:w-1/2">
        {isCorrect && (
          <div className="absolute inset-0 flex  items-center justify-center overflow-hidden">
            <Confetti
              key={quiz?.currentQuestionIndex}
              width={window.innerWidth}
              height={window.innerHeight}
              numberOfPieces={300}
              recycle={false}
            />
          </div>
        )}

        <div className="bg-white text-black text-lg py-2 px-2 rounded-lg shadow-lg w-full text-center">
          <h2 className="text-2xl font-bold text-indigo-700 mb-4">
            Review Answers
          </h2>

          {/* Display Question */}
          <div className="text-left mb-6">
            <h3 className="text-lg font-semibold">
              {currentQuestion?.description}
            </h3>
          </div>

          {/* Display Options */}
          <div className="flex flex-col gap-4">
            {currentQuestion?.options?.map((option) => {
              const isSelected = userSelectedOption?.id === option?.id
              const isCorrect = option?.is_correct
              const isWrong = isSelected && !isCorrect

              return (
                <div
                  key={option.id}
                  className={`flex items-center py-2 px-1 sm:1px-4 rounded-lg border border-indigo-500 shadow-md
                ${isCorrect ? 'bg-green-400 text-white' : ''}
                ${isWrong ? 'bg-red-500 text-white' : ''}
                `}
                >
                  {/* Circle Indicator */}
                  <div className="w-6 h-6 mr-1 flex items-center justify-center rounded-full border-2 border-indigo-500">
                    {isSelected && (
                      <div
                        className={`w-4 h-4  rounded-full ${
                          isCorrect ? 'bg-green-800' : 'bg-indigo-500'
                        }`}
                      ></div>
                    )}
                  </div>

                  <span className="text-black font-normal text-lg">
                    {option?.description}
                  </span>
                </div>
              )
            })}
          </div>

          {/* Show Points Earned */}
          <div className="mt-4 text-lg font-semibold">
            <p className={`${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
              {isCorrect ? '🎉 Correct! +4 points' : '❌ Wrong! 0 points'}
            </p>
          </div>
        </div>
      </div>
      {/* Navigation Buttons */}
      <PrevNextButtons
        quiz={quiz}
        handlePrev={handlePrev}
        handleNext={handleNext}
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
