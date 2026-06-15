import { useState, type FormEvent } from 'react'
import './Map.css'

type Message = {
  alias: string
  text: string
}

export default function Map() {
  const [alias, setAlias] = useState('')
  const [draft, setDraft] = useState('')
  const [messages, setMessages] = useState<Message[]>([])

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const text = draft.trim()
    if (!text) return
    setMessages(prev => [{ alias: alias.trim(), text }, ...prev]) // newest first
    setAlias('')
    setDraft('')
  }

  return (
    <section className="hero">
      <p className="hero__eyebrow">and we must all do our part</p>
      <h2 className="hero__line">
        by the deep sea,
        <br />
        and music in its roar:
      </h2>
      <p className="hero__moon-text" aria-hidden="true">
        i love not man the less,
        <br />
        but nature more
      </p>

      <form className="message-form" onSubmit={handleSubmit}>
        <label className="message-form__label" htmlFor="message">
          help me hang up the stars
        </label>
        <div className="message-form__row">
          <div className="message-form__field">
            <span className="message-form__sizer" data-value={alias || 'alias'}>
              <input
                id="alias"
                className="message-form__part message-form__part--alias"
                type="text"
                value={alias}
                onChange={event => setAlias(event.target.value)}
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
              onChange={event => setDraft(event.target.value)}
              placeholder=". . ."
              autoComplete="off"
            />
          </div>
          <button className="message-form__submit" type="submit">
            shoot
          </button>
        </div>
      </form>

      {messages.length > 0 && (
        <ul className="message-list" aria-label="Registered messages">
          {messages.map((message, i) => (
            <li key={i} className="message-list__item">
              <span className="message-list__star" aria-hidden="true">✦</span>
              <span className="message-list__text">{message.text}</span>
              {message.alias && (
                <span className="message-list__alias">— {message.alias}</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
