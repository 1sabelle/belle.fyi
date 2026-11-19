import { createContext, useContext, useState, type ReactNode } from 'react'

type MoonPreviewValue = {
  preview: string | null
  isShowing: boolean
  showPreview: (preview: string) => void
  hidePreview: () => void
}

const MoonPreviewContext = createContext<MoonPreviewValue | null>(null)

export function MoonPreviewProvider({ children }: { children: ReactNode }) {
  // the last preview stays mounted after hiding, so it can fade out instead of vanishing
  const [preview, setPreview] = useState<string | null>(null)
  const [isShowing, setIsShowing] = useState(false)

  function showPreview(next: string) {
    setPreview(next)
    setIsShowing(true)
  }

  function hidePreview() {
    setIsShowing(false)
  }

  return (
    <MoonPreviewContext.Provider value={{ preview, isShowing, showPreview, hidePreview }}>
      {children}
    </MoonPreviewContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useMoonPreview() {
  const ctx = useContext(MoonPreviewContext)
  if (!ctx) throw new Error('useMoonPreview must be used within a MoonPreviewProvider')
  return ctx
}
