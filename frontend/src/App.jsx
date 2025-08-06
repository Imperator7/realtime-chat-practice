import { useState, useRef, useEffect } from 'react'
import { io } from 'socket.io-client'
import './App.css'

const socket = io('http://localhost:5000/')

function App() {
  const [messages, setMessages] = useState([
    { type: 'received', content: 'Hi!' },
    { type: 'sent', content: 'Hi there!' },
    { type: 'sent', content: 'Wassup? wat du u do broo' },
  ])

  const [typingMessage, setTypingMessage] = useState('')
  const bottomRef = useRef(null)

  const sendMessage = (message, e) => {
    e.preventDefault()

    if (message.trim() === '') return
    socket.emit('send-message', message)
    setMessages((prev) => [...prev, { type: 'sent', content: message }])
    setTypingMessage('')
  }

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to server as:', socket.id)
    })

    socket.on('receive-message', (receiveMessage) => {
      setMessages((prev) => [
        ...prev,
        { type: 'received', content: receiveMessage },
      ])
    })

    return () => {
      socket.off('connect')
      socket.off('receive-message')
    }
  })

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <main>
      <h1 className="text-3xl m-3">Socket.io Chat</h1>
      <section className="m-3">
        <ul className="flex flex-col bg-purple-100 p-2 rounded-xl min-h-96 max-h-[550px] overflow-y-auto">
          {messages.map((message, index) =>
            message.type === 'received' ? (
              <li
                key={index}
                className="bg-blue-300 text-white rounded-lg p-2 m-1 w-fit max-w-[70%] break-words"
              >
                {message.content}
              </li>
            ) : (
              <li
                key={index}
                className="bg-blue-400 rounded-lg p-2 m-1 w-fit self-end max-w-[70%] break-words"
              >
                {message.content}
              </li>
            )
          )}
          <div ref={bottomRef}></div>
        </ul>

        <form
          action="send-message"
          onSubmit={(e) => sendMessage(typingMessage, e)}
          className="flex items-baseline"
        >
          <input
            className="mt-2 rounded border border-gray-300 px-1 py-0.5 w-full focus:outline-none"
            type="text"
            placeholder="type messages..."
            value={typingMessage}
            onChange={(e) => setTypingMessage(e.target.value)}
          />
          <button
            type="submit"
            className="bg-green-500 text-white rounded py-1 px-3 mx-1 hover:bg-green-600 active:scale-95 active:translate-y-0.5 duration-50 "
          >
            Send
          </button>
        </form>
      </section>
    </main>
  )
}

export default App
