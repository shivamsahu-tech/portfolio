import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Mail, CheckCircle, AlertCircle } from 'lucide-react'
import sendEmail from '../sendEmail'

const Contact = () => {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('idle') // idle, sending, success, error
  const [errorMessage, setErrorMessage] = useState('')



  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!message.trim()) {
      setStatus('error')
      setErrorMessage('Please enter a message')
      return
    }

    if(email == "" || !email.includes("@")) return;
    try {
      const response = await fetch("https://portfolio-kf16.onrender.com", {
        method: "POST",
        body: {email, message}
      })
      const data = await response.json();
    } catch (error) {
      console.log("Error : ", error)
    }



  return (
    <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3">
            Any Message for Me?
          </h2>
          <p className="text-base sm:text-lg text-[#4a4a4a]">
            Feel free to drop me a message. I'd love to hear from you!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-[#FFFEF9] rounded-2xl p-6 sm:p-8 border-2 border-[rgba(99,102,241,0.1)] shadow-lg"
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-[#1a1a1a] mb-2">
                Your Email <span className="text-[#4a4a4a] font-normal text-xs">(One copy will be sent to you - optional)</span>
              </label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4a4a4a]" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-[rgba(99,102,241,0.15)] bg-white text-[#1a1a1a] placeholder-[#9ca3af] focus:border-nav-color focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Message Textarea */}
            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-[#1a1a1a] mb-2">
                Your Message <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Feel free to write anything..."
                rows="6"
                className="w-full px-4 py-3 rounded-lg border-2 border-[rgba(99,102,241,0.15)] bg-white text-[#1a1a1a] placeholder-[#9ca3af] focus:border-nav-color focus:outline-none transition-colors resize-none"
                required
              />
            </div>

            {/* Status Messages */}
            {status === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm"
              >
                <AlertCircle size={18} />
                <span>{errorMessage}</span>
              </motion.div>
            )}

            {status === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm"
              >
                <CheckCircle size={18} />
                <span>Message sent successfully! Thank you for reaching out.</span>
              </motion.div>
            )}

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={status === 'sending'}
              className="w-full py-3 px-6 bg-gradient-to-r from-nav-color to-accent-1 text-white rounded-lg font-semibold text-base hover:shadow-lg transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {status === 'sending' ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <Send size={18} />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact