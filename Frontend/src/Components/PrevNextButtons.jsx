function PrevNextButtons({
  currentQuestionIndex,
  totalQuestions,
  handlePrev,
  handleNext,
  isPrevDisabled,
  isNextDisabled
}) {
  return (
    <div className="flex items-center justify-between w-full sm:w-3/4 lg:w-1/2 mt-6">
      <button
        className={`px-4 py-2 font-bold rounded-md shadow-md transition-all ${
          isPrevDisabled
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-indigo-600 hover:bg-indigo-700 cursor-pointer'
        }`}
        onClick={handlePrev}
        disabled={isPrevDisabled}
      >
        Previous
      </button>

      <p className="py-2 text-xl font-bold">
        {currentQuestionIndex + 1}/{totalQuestions}
      </p>

      <button
        className={`px-8 py-2 rounded-md font-bold shadow-md transition-all ${
          isNextDisabled
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-green-500 hover:bg-green-600 cursor-pointer'
        }`}
        onClick={handleNext}
        disabled={isNextDisabled}
      >
        Next
      </button>
    </div>
  )
}

export default PrevNextButtons
