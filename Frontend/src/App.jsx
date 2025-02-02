import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Quiz from './Pages/Quiz'
import Result from './Pages/Result'
import Review from './Pages/Review'
import AboutUs from './Pages/AboutUs'
import ContactUs from './Pages/ContactUs'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/result" element={<Result />} />
        <Route path="/review" element={<Review />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
      </Routes>
    </>
  )
}

export default App
