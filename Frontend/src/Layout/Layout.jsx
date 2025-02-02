import { Link } from 'react-router-dom'
import QuizLogo from '../assets/QuizLogo.jpg'

function Layout({ children }) {
  return (
    <div className="flex flex-col">
      {/* Navbar */}
      <nav className="bg-white drop-shadow-lg">
        <div className="mx-auto px-2 md:px-12 py-2 flex justify-between items-center">
          {/* Logo & App Name */}
          <Link to="/" className="flex items-center space-x-3">
            <img
              src={QuizLogo}
              alt="Quiz logo"
              className="w-8 h-8 sm:w-12 sm:h-12 rounded-full opacity-90"
            />
            <p className="text-xl sm:text-4xl font-bold bg-gradient-to-br from-blue-500 to-purple-600 bg-clip-text text-transparent">
              QuizApp
            </p>
          </Link>

          {/* Right-aligned Links (About and Contact) */}
          <div className="flex space-x-6 sm:mr-10 text-lg">
            <Link
              to="/about"
              className="text-purple-500 hover:text-blue-500 transition-all duration-300"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-purple-500 hover:text-blue-500 transition-all duration-300"
            >
              Contact
            </Link>
          </div>
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
