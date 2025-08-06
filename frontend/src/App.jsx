import { useState } from 'react'
import './App.css'

const handleSubmit = (e) => {
  e.preventDefault()
}

function App() {
  return (
    <main>
      <h1 className="text-3xl m-3">Socket.io Chat</h1>
      <section className="m-3 ">
        <ul className="flex flex-col bg-purple-100 p-2  rounded-xl min-h-96">
          <li className="bg-blue-300 text-white rounded-lg p-2 m-1 w-fit text-overflow">
            Hello!
          </li>
          <li className="bg-gray-400 rounded-lg p-2 m-1 w-fit self-end text-overflow">
            Hi there!
          </li>
        </ul>

        <form action="send-message" className="flex items-baseline">
          <input
            className="mt-2 rounded border border-gray-300 px-1 py-0.5 w-full focus:outline-none"
            type="text"
            placeholder="type messages..."
          />
          <button
            className="bg-green-500 text-white rounded py-1 px-3 mx-1"
            onClick={handleSubmit}
          >
            Send
          </button>
        </form>
      </section>
    </main>
  )
}

export default App
