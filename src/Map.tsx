import { useState, type FormEvent } from 'react'
import { useMessages } from './MessagesContext'
import './Map.css'

export default function Map() {
  const { addMessage } = useMessages()
  const [alias, setAlias] = useState('')
  const [draft, setDraft] = useState('')

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const text = draft.trim()
    if (!text) return
    addMessage({ alias: alias.trim(), text }) 
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
      <div className="hero__moon-block" aria-hidden="true">
        <p className="hero__moon-text">
          ‟i love not man the less,
          <br />
          but nature more
        </p>
        <p className="hero__moon-cite">… Byron</p>
      </div>

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
              placeholder="a message"
              autoComplete="off"
              maxLength={280}
            />
          </div>
          <button className="message-form__submit" type="submit">
            shoot
          </button>
        </div>
      </form>
    </section>
  )
}
