import MessageList from '../components/MessageList'
import MessageInput from '../components/MessageInput'
import '../styles/ChatPage.css'
import { useChat } from '../customHooks/useChat'

function ChatPage() {
  const {
    messages,
    isConnected,
    sendMessage,
    typingMessage,
    setTypingMessage,
  } = useChat()

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
