function QuestionCard({ question }) {
  console.log('question', question)

  return (
    <div className=" text-black text-lg px-4 rounded-lg text-left w-full">
      <h2 className="font-semibold">{question}</h2>
    </div>
  )
}

export default QuestionCard
