import { useEffect, useRef } from 'react'

function MessageList({ messages }) {
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <>
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
    </>
  )
}

export default MessageList
