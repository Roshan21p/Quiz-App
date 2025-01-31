import { useNavigate } from 'react-router-dom'
import Layout from '../Layout/Layout'

const Home = () => {
  const navigate = useNavigate()

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-700 text-white min-h-[90vh]">
        <h1 className="text-2xl sm:text-4xl text-center font-bold mb-4">
          Welcome to the Ultimate Quiz!
        </h1>
        <p className="text-lg text-center mb-6">
          Test your knowledge and earn points!
        </p>

        <button
          className="bg-yellow-400 text-gray-900 px-6 py-3 text-xl font-semibold rounded-lg shadow-md hover:bg-yellow-300 transition duration-300"
          onClick={() => navigate('/quiz')}
        >
          Start Quiz 🚀
        </button>
      </div>
    </Layout>
  )
}

export default Home
