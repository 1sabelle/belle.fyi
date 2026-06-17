import { createContext, useContext, useState, type ReactNode } from 'react'

// A message that's been "hung up" as a star in the sky.
export type StarMessage = {
  id: string
  alias: string
  text: string
  createdAt: number
  top: string
  left: string
  size: number
  delay: string
  duration: string
  opacity: number
}

type MessagesValue = {
  messages: StarMessage[]
  addMessage: (input: { alias: string; text: string }) => void
}

const MessagesContext = createContext<MessagesValue | null>(null)

let seq = 0

function placeStar(input: { alias: string; text: string }): StarMessage {
  return {
    id: `star-${seq++}`,
    alias: input.alias,
    text: input.text,
    createdAt: Date.now(),
    top: `${Math.random() * 80 + 10}%`,
    left: `${Math.random() * 88 + 6}%`,
    size: Math.random() * 2 + 3,
    delay: `${Math.random() * 6}s`,
    duration: `${Math.random() * 4 + 4}s`,
    opacity: Math.random() * 0.3 + 0.6,
  }
}

export function MessagesProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<StarMessage[]>([])

  function addMessage(input: { alias: string; text: string }) {
    setMessages(prev => [placeStar(input), ...prev])
  }

  return (
    <MessagesContext.Provider value={{ messages, addMessage }}>
      {children}
    </MessagesContext.Provider>
  )
}

export function useMessages() {
  const ctx = useContext(MessagesContext)
  if (!ctx) throw new Error('useMessages must be used within a MessagesProvider')
  return ctx
}
