import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Result() {
  const navigate = useNavigate()

  const [quiz, setQuiz] = useState({
    score: 0,
    selectedAnswers: {},
    totalQuestions: 0,
    correctAnswers: 0,
    wrongAnswers: 0
  })

  function handleRestart() {
    sessionStorage.removeItem('quizProgress')
    navigate('/quiz')
  }

  // Dynamic score message based on correct answers percentage
  const percentage = (quiz?.correctAnswers / quiz?.totalQuestions) * 100
  let scoreMessage = ''
  if (percentage >= 80) {
    scoreMessage = 'Excellent! 🎉 You aced it!'
  } else if (percentage >= 50) {
    scoreMessage = 'Good job! 👍 You passed!'
  } else {
    scoreMessage = 'Keep trying! 💪 You can do better!'
  }

  useEffect(() => {
    const savedProgress = JSON.parse(sessionStorage.getItem('quizProgress'))
    const quizQuestions = JSON.parse(sessionStorage.getItem('quizQuestions'))

    if (savedProgress) {
      let correctScore = 0,
        wrongScore = 0
      const totalQues = quizQuestions?.length
      correctScore = savedProgress?.score / 4
      wrongScore = totalQues - correctScore

      setQuiz((prevState) => ({
        ...prevState,
        score: savedProgress?.score,
        selectedAnswers: savedProgress?.selectedAnswers,
        totalQuestions: totalQues,
        correctAnswers: correctScore,
        wrongAnswers: wrongScore
      }))
    } else {
      setQuiz({
        score: 0,
        totalQuestions: quizQuestions?.length,
        correctAnswers: 0,
        wrongAnswers: 10
      })
    }
  }, [])

  return (
    <div className="flex mx-auto flex-col p-4 items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 text-white">
      <div className="bg-white text-black p-8 rounded-xl shadow-xl w-ful sm:w-3/4 lg:w-1/2 text-center">
        <h2 className="text-3xl font-extrabold text-indigo-700 mb-4">
          🎉 Quiz Result 🎉
        </h2>

        {/* Score Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-4 mt-4 mb-6">
          <div
            className="bg-green-500 h-4 rounded-full transition-all duration-500"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>

        {/* Dynamic Message Based on Score */}
        <p className="text-xl font-semibold">{scoreMessage}</p>

        <p className="text-xl mt-2 font-semibold">
          Total Score:{' '}
          <span className="font-bold text-blue-600">{quiz?.score}</span>
        </p>
        <p className="text-lg mt-2 font-semibold">
          Total Questions:{' '}
          <span className="font-bold">{quiz?.totalQuestions}</span>
        </p>
        <p className="text-green-600 font-bold mt-2">
          ✅ Correct Answers: {quiz?.correctAnswers}
        </p>
        <p className="text-red-500 font-bold">
          ❌ Wrong Answers: {quiz?.wrongAnswers}
        </p>

        {/* Buttons Section */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
          <button
            onClick={handleRestart}
            className="w-full sm:w-auto bg-blue-500 px-6 py-3 text-lg font-semibold rounded-lg shadow-md transition-all hover:bg-blue-600 cursor-pointer"
          >
            🔄 Restart Quiz
          </button>
          <button
            className="w-full sm:w-auto bg-purple-500 px-6 py-3 text-lg font-semibold rounded-lg shadow-md transition-all hover:bg-purple-600 cursor-pointer"
            onClick={() => navigate('/review')}
          >
            📑 Review Answers
          </button>
        </div>
        <div>
          <button
            className="w-full sm:w-auto bg-green-500 px-6 py-3 text-lg font-semibold rounded-lg shadow-md transition-all hover:bg-green-600 cursor-pointer mt-4"
            onClick={() => navigate('/')}
          >
            🏠 Go Back Home
          </button>
        </div>
      </div>
    </div>
  )
}

export default Result
