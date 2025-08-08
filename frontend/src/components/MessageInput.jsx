function MessageInput({ typingMessage, setTypingMessage, sendMessage }) {
  return (
    <>
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
    </>
  )
}

export default MessageInput
