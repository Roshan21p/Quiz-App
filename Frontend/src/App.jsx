import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Quiz from './Pages/Quiz'
import Result from './Pages/Result'
import Review from './Pages/Review'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/result" element={<Result />} />
        <Route path="/review" element={<Review />} />
      </Routes>
    </>
  )
}

export default App
