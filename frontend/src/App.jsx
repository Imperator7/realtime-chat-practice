import { useState } from 'react'
import './App.css'

function App() {
  const [messages, setMessages] = useState([
    { type: 'received', content: 'Hi!' },
    { type: 'sent', content: 'Hi there!' },
    { type: 'sent', content: 'Wassup? wat du u do broo' },
  ])

  const [typingMessage, setTypingMessage] = useState('')

  const sendMessage = (message, e) => {
    e.preventDefault()

    if (message === '') return
    setMessages((prev) => [...prev, { type: 'sent', content: message }])
    setTypingMessage('')
  }

  return (
    <main>
      <h1 className="text-3xl m-3">Socket.io Chat</h1>
      <section className="m-3">
        <ul className="flex flex-col bg-purple-100 p-2 rounded-xl min-h-96 max-h-[550px] overflow-y-auto">
          {messages.map((message, index) =>
            message.type === 'received' ? (
              <li
                key={index}
                className="bg-blue-300 text-white rounded-lg p-2 m-1 w-fit text-overflow"
              >
                {message.content}
              </li>
            ) : (
              <li
                key={index}
                className="bg-blue-400 rounded-lg p-2 m-1 w-fit self-end text-overflow"
              >
                {message.content}
              </li>
            )
          )}
        </ul>

        <form action="send-message" className="flex items-baseline">
          <input
            className="mt-2 rounded border border-gray-300 px-1 py-0.5 w-full focus:outline-none"
            type="text"
            placeholder="type messages..."
            value={typingMessage}
            onChange={(e) => setTypingMessage(e.target.value)}
          />
          <button
            className="bg-green-500 text-white rounded py-1 px-3 mx-1 hover:bg-green-600 active:scale-95 active:translate-y-0.5 duration-50 "
            onClick={(e) => sendMessage(typingMessage, e)}
          >
            Send
          </button>
        </form>
      </section>
    </main>
  )
}

export default App
