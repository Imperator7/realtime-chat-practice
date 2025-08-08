import { useState, useEffect } from 'react'
import { io } from 'socket.io-client'
import MessageList from './MessageList'
import MessageInput from './MessageInput'
import '../styles/ChatPage.css'

const socket = io('http://localhost:5000')

function ChatPage() {
  const [messages, setMessages] = useState([
    { type: 'received', content: 'Hi!' },
    { type: 'sent', content: 'Hi there!' },
    { type: 'sent', content: 'Wassup? wat du u do broo' },
  ])

  const [typingMessage, setTypingMessage] = useState('')

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

  return (
    <>
      <h1 className="text-3xl m-3">Socket.io Chat</h1>
      <section className="m-3">
        <MessageList messages={messages} />
        <MessageInput
          typingMessage={typingMessage}
          setTypingMessage={setTypingMessage}
          sendMessage={sendMessage}
        />
      </section>
    </>
  )
}

export default ChatPage
