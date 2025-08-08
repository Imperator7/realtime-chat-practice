import { useState, useEffect } from 'react'
import { io } from 'socket.io-client'

const socket = io('http://localhost:5000')

export const useChat = () => {
  const [messages, setMessages] = useState([])
  const [typingMessage, setTypingMessage] = useState('')
  const [isConnected, setIsConnected] = useState(socket.isConnected)

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true)
      console.log('Connected to server as:', socket.id)
    })

    return () => {
      socket.off('connect')
    }
  }, [])

  useEffect(() => {
    socket.on('receive-message', (receivedMessage) => {
      setMessages((prev) => [
        ...prev,
        { type: 'received', content: receivedMessage },
      ])
    })

    return () => {
      socket.off('receive-message')
    }
  })

  const sendMessage = (message, e) => {
    e.preventDefault()

    if (message.trim() === '') return
    socket.emit('send-message', message)
    setMessages((prev) => [...prev, { type: 'sent', content: message }])
    setTypingMessage('')
  }

  return { messages, isConnected, sendMessage, typingMessage, setTypingMessage }
}
