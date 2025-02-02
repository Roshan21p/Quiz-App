function PrevNextButtons({ quiz, handlePrev, handleNext }) {
  return (
    <div className="flex items-center justify-between w-full sm:w-3/4 lg:w-1/2 mt-6">
      <button
        className={`px-4 py-2 font-bold rounded-md shadow-md transition-all ${
          quiz?.currentQuestionIndex === 0
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-indigo-600 hover:bg-indigo-700 cursor-pointer'
        }`}
        onClick={handlePrev}
        disabled={quiz?.currentQuestionIndex === 0}
      >
        Previous
      </button>

      <p className="py-2 text-xl font-bold">
        {quiz?.currentQuestionIndex + 1}/{quiz?.questions?.length}
      </p>

      <button
        className={`px-8 py-2 rounded-md font-bold shadow-md transition-all ${
          quiz?.currentQuestionIndex === quiz?.questions?.length - 1
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-green-500 hover:bg-green-600 cursor-pointer'
        }`}
        onClick={handleNext}
        disabled={quiz?.currentQuestionIndex === quiz?.questions?.length - 1}
      >
        Next
      </button>
    </div>
  )
}

export default PrevNextButtons

// currentQuestionIndex={quiz.currentQuestionIndex}
// totalQuestions={quiz.questions.length}
// handlePrev={handlePrev}
// handleNext={handleNext}
// isPrevDisabled={quiz.currentQuestionIndex === 0}
// isNextDisabled={quiz.currentQuestionIndex === quiz.questions.length - 1}
