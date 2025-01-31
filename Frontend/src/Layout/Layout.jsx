import { Link } from 'react-router-dom'
import QuizLogo from '../assets/QuizLogo.jpg'

function Layout({ children }) {
  return (
    <div className="flex flex-col">
      {/* Navbar */}
      <nav className="bg-white drop-shadow-lg">
        <div className="container  mx-auto px-2 sm:px-12 py-4 flex justify-between items-center">
          {/* Logo & App Name */}
          <Link to="/" className="flex items-center space-x-3">
            <img
              src={QuizLogo}
              alt="Quiz logo"
              className="w-12 h-12 rounded-full"
            />
            <p className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-indigo-700 bg-clip-text text-transparent">
              QuizApp
            </p>
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-300 py-4 min-v-[10vh]">
        <div className="container mx-auto px-6 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-700 text-center sm:text-left">
            Copyright &copy; {new Date().getFullYear()} QuizApp. All rights
            reserved.
          </p>
          <div className="flex space-x-4 mt-2 sm:mt-0">
            <p className="text-gray-700 hover:text-blue-500">Privacy</p>
            <p className="text-gray-700 hover:text-blue-500">
              Terms of Service
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
export default Layout
