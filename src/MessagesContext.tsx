import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

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

type StoredMessage = {
  id: string
  alias: string
  message: string
  created_at: string
}

type MessagesValue = {
  messages: StarMessage[]
  addMessage: (input: { alias: string, text: string }) => Promise<string | null>
}

const MessagesContext = createContext<MessagesValue | null>(null)

function hashSeed(str: string): number {
  let h = 2166136261
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

function mulberry32(seed: number): () => number {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function decorate(stored: StoredMessage): StarMessage {
  const rand = mulberry32(hashSeed(stored.id))
  return {
    id: stored.id,
    alias: stored.alias,
    text: stored.message,
    createdAt: Date.parse(stored.created_at),
    top: `${rand() * 80 + 10}%`,
    left: `${rand() * 88 + 6}%`,
    size: rand() * 2 + 3,
    delay: `${rand() * 6}s`,
    duration: `${rand() * 4 + 4}s`,
    opacity: rand() * 0.3 + 0.6,
  }
}

export function MessagesProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<StarMessage[]>([])

  useEffect(() => {
    let cancelled = false
    fetch('/api/messages')
      .then(res => (res.ok ? res.json() : []))
      .then((rows: StoredMessage[]) => {
        if (!cancelled) setMessages(rows.map(decorate))
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [])

  async function addMessage(input: { alias: string, text: string }): Promise<string | null> {
    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ alias: input.alias, message: input.text }),
      })
      if (!res.ok) {
        return (await res.text()) || 'Something went wrong. Try again?'
      }
      const stored: StoredMessage = await res.json()
      setMessages(prev => [decorate(stored), ...prev])
      return null
    }
    catch {
      return 'Could not reach the sky. Check your connection?'
    }
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
