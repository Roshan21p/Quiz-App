import { useNavigate } from 'react-router-dom'
import Layout from '../Layout/Layout'
import homeImage from '../assets/homeImage.png'

const Home = () => {
  const navigate = useNavigate()

  return (
    <Layout>
      <div className="flex flex-col  items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 text-white min-h-screen px-4 mt-0">
        <img
          src={homeImage}
          className="w-full md:w-1/2 mb-6 md:mb-0"
          alt="Quiz Illustration"
        />

        <div className="text-center md:ml-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Challenge Your Mind with the Ultimate Quiz!
          </h1>
          <p className="text-lg mb-6">
            Explore a variety of exciting questions, test your knowledge, and
            climb the leaderboard. Are you ready to prove your skills?
          </p>

          <button
            className="bg-yellow-400 text-gray-900 px-6 py-3 text-xl  font-semibold rounded-lg shadow-md hover:bg-yellow-300 transition duration-300 cursor-pointer"
            onClick={() => navigate('/quiz')}
          >
            Start Quiz 🚀
          </button>
        </div>
      </div>
    </Layout>
  )
}

export default Home
