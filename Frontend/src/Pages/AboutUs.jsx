import Layout from '../Layout/Layout'

function AboutUs() {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center">
        <div className="text-lg p-8 w-full sm:w-3/4 lg:w-1/2 space-y-6 bg-opacity-80 rounded-lg">
          <h1 className="text-3xl font-semibold mb-6 text-center">About Us</h1>
          <p className="mb-4">
            Welcome to our quiz application! This quiz has been designed to help
            users test their knowledge on various topics.
          </p>
          <p className="mb-4">
            Our goal is to provide an interactive and engaging platform for
            learning. Whether you're here to test your skills, learn something
            new, or just have fun, we aim to offer a smooth and enjoyable
            experience.
          </p>
          <h2 className="text-2xl font-semibold mt-6 mb-4">How It Works</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Start the quiz by answering questions one by one.</li>
            <li>
              You will have a timer to complete the quiz, so make sure to answer
              before time runs out!
            </li>
            <li>
              Your score will be calculated based on correct and incorrect
              answers.
            </li>
            <li>
              Once the quiz is completed, you'll see your result and score.
            </li>
          </ul>
          <h2 className="text-2xl font-semibold mt-6 mb-4">Our Mission</h2>
          <p>
            We are passionate about making learning fun and accessible. Our team
            is dedicated to creating quizzes that challenge users while
            providing an enjoyable learning experience. We believe in the power
            of knowledge and strive to deliver high-quality content for users of
            all levels.
          </p>
        </div>
      </div>
    </Layout>
  )
}

export default AboutUs
