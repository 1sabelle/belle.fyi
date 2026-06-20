import { useState, type FormEvent } from 'react'
import { useMessages } from './MessagesContext'
import './MessageForm.css'

export default function MessageForm() {
  const { addMessage } = useMessages()
  const [alias, setAlias] = useState('')
  const [draft, setDraft] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (submitting) return

    const name = alias.trim()
    const text = draft.trim()
    if (!name) {
      setError('an epiteth is required')
      return
    }
    if (!text) {
      setError('a message is required')
      return
    }

    setSubmitting(true)
    const failure = await addMessage({ alias: name, text })
    setSubmitting(false)

    if (failure) {
      setError(failure)
      return
    }
    setAlias('')
    setDraft('')
    setError(null)
  }

  return (
    <form className="message-form" onSubmit={handleSubmit}>
      <label className="message-form__label" htmlFor="message">
        help me hang up the stars
      </label>
      <div className="message-form__row">
        <div className="message-form__field">
          <span className="message-form__sizer" data-value={alias || 'an epiteth?'}>
            <input
              id="alias"
              className="message-form__part message-form__part--alias"
              type="text"
              value={alias}
              onChange={(event) => {
                setAlias(event.target.value)
                setError(null)
              }}
              placeholder="an epiteth"
              autoComplete="off"
              maxLength={20}
              size={1}
            />
          </span>
          <span className="message-form__divider" aria-hidden="true">|</span>
          <input
            id="message"
            className="message-form__part message-form__part--message"
            type="text"
            value={draft}
            onChange={(event) => {
              setDraft(event.target.value)
              setError(null)
            }}
            placeholder="a message"
            autoComplete="off"
            maxLength={280}
          />
        </div>
        <button className="message-form__submit" type="submit" disabled={submitting}>
          shoot
        </button>
      </div>
      <p
        className={`message-form__hint${error ? ' message-form__hint--error' : ''}`}
        role={error ? 'alert' : undefined}
      >
        {error}
      </p>
    </form>
  )
}
