import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Result() {
  const navigate = useNavigate()
  const [score, setScore] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [totalQuestions, setTotalQuestions] = useState(0)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [wrongAnswers, setWrongAnswers] = useState(0)

  useEffect(() => {
    const savedProgress = JSON.parse(sessionStorage.getItem('quizProgress'))
    if (savedProgress) {
      setSelectedAnswers(savedProgress.selectedAnswers || {})
      setScore(savedProgress.score || 0)
      const totalQues = Object.keys(savedProgress.selectedAnswers || {}).length
      setTotalQuestions(totalQues)

      let correct = 0,
        wrong = 0
      Object.values(savedProgress.selectedAnswers).forEach((answer) => {
        if (answer.is_correct) {
          correct++
        } else {
          wrong++
        }
      })

      setCorrectAnswers(correct)
      setWrongAnswers(wrong)
    }
  }, [])

  function handleRestart() {
    sessionStorage.removeItem('quizProgress')
    navigate('/quiz')
  }

  return (
    <div className="flex mx-auto flex-col p-4 items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 text-white">
      <div className="bg-white text-black p-8 rounded-xl shadow-xl w-full sm:w-3/4 lg:w-1/3 text-center">
        <h2 className="text-3xl font-extrabold text-indigo-700 mb-4">
          🎉 Quiz Result 🎉
        </h2>

        {/* Score Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-4 mt-4 mb-6">
          <div
            className="bg-green-500 h-4 rounded-full transition-all duration-500"
            style={{ width: `${(correctAnswers / totalQuestions) * 100}%` }}
          ></div>
        </div>

        <p className="text-xl font-semibold">
          Total Score: <span className="font-bold text-blue-600">{score}</span>
        </p>
        <p className="text-lg mt-2">
          Total Questions: <span className="font-bold">{totalQuestions}</span>
        </p>
        <p className="text-green-600 font-bold mt-2">
          ✅ Correct Answers: {correctAnswers}
        </p>
        <p className="text-red-500 font-bold">
          ❌ Wrong Answers: {wrongAnswers}
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
      </div>
    </div>
  )
}

export default Result
