import React, { useState } from 'react'
import Layout from '../Layout/Layout'

function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [statusMessage, setStatusMessage] = useState('')

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500)) // Simulated delay
      setStatusMessage('Your message has been sent successfully!')
      setFormData({
        name: '',
        email: '',
        message: ''
      })
    } catch (error) {
      setStatusMessage('There was an error sending your message.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center">
        <div className="w-full rounded-lg p-8 sm:w-3/4 lg:w-1/2">
          <h1 className="text-3xl font-semibold mb-6 text-center">
            Contact Us
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-lg font-semibold">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 mt-2 rounded-lg border border-gray-300 bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-lg font-semibold">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 mt-2 rounded-lg border border-gray-300 bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-lg font-semibold">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                className="w-full p-3 mt-2 rounded-lg border border-gray-300 bg-white text-black focus:outline-none resize-none focus:ring-2 focus:ring-blue-500"
                required
              ></textarea>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className={`px-6 py-3 text-lg font-semibold text-white rounded-md  shadow-md bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 transition-all ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </form>
          {statusMessage && (
            <div className="mt-6 text-center text-lg">
              <p>{statusMessage}</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default ContactUs
