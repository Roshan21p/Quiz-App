function Options({ options, onAnswerClick, selectedOption }) {
  return (
    <div className="mt-4 flex flex-col gap-4 w-full px-4">
      {options.map((option) => {
        return (
          <button
            key={option?.id}
            className="bg-white flex items-center text-black text-left hover:bg-blue-200 cursor-pointer  py-2 px-4 rounded-lg border border-indigo-500 shadow-md transition-all"
            onClick={() => onAnswerClick(option)}
          >
            <div className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-indigo-500 mr-2">
              {selectedOption?.id === option.id && (
                <div className="w-4 h-4 bg-indigo-500 rounded-full"></div>
              )}
            </div>
            <span className="text-black">{option.description}</span>
          </button>
        )
      })}
    </div>
  )
}

export default Options
