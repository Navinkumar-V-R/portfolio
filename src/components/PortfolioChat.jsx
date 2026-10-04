import '../styles/PortfolioChat.css'
import { useEffect, useRef, useState } from 'react'
import { profile } from '../data/portfolio'
import { answerPortfolioQuestion, getPortfolioAction } from '../data/portfolioAssistant'

const suggestions = ['Tell me about your experience', 'What projects have you built?', 'What are your core skills?']

function renderMessageLine(line) {
  const emailMatch = line.match(/[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}/)
  if (emailMatch) {
    const [email] = emailMatch
    const index = line.indexOf(email)
    return <>{line.slice(0, index)}<a href={`mailto:${email}`}>{email}</a>{line.slice(index + email.length)}</>
  }

  const phoneMatch = line.match(/\+\d[\d\s()-]*\d/)
  if (phoneMatch) {
    const [phone] = phoneMatch
    const index = line.indexOf(phone)
    const number = phone.replace(/[^+\d]/g, '')
    return <>{line.slice(0, index)}<a href={`tel:${number}`}>{phone}</a>{line.slice(index + phone.length)}</>
  }

  return line
}

export default function PortfolioChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [question, setQuestion] = useState('')
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: `Hi! I’m ${profile.name}’s portfolio assistant. Ask me about experience, skills, projects, or certifications.`,
    },
  ])
  const inputRef = useRef(null)
  const messagesRef = useRef(null)

  useEffect(() => {
    if (isOpen) inputRef.current?.focus()
  }, [isOpen])

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight
    }
  }, [messages, isOpen])

  const ask = prompt => {
    const text = prompt.trim()
    if (!text) return
    setMessages(current => [
      ...current,
      { role: 'user', text },
      { role: 'assistant', text: answerPortfolioQuestion(text), action: getPortfolioAction(text) },
    ])
    setQuestion('')
  }

  const handleSubmit = event => {
    event.preventDefault()
    ask(question)
  }

  const handleKeyDown = event => {
    if (event.key === 'Escape') setIsOpen(false)
  }

  return (
    <div className="portfolio-chat" onKeyDown={handleKeyDown}>
      {isOpen && (
        <section className="chat-panel" role="dialog" aria-modal="false" aria-labelledby="chat-title">
          <header className="chat-header">
            <span className="chat-avatar" aria-hidden="true">NK</span>
            <div className="chat-heading">
              <h2 id="chat-title">Ask about Navin</h2>
              <span><i /> Portfolio assistant</span>
            </div>
            <button className="chat-close" type="button" aria-label="Close chat" onClick={() => setIsOpen(false)}>×</button>
          </header>

          <div className="chat-messages" ref={messagesRef} role="log" aria-live="polite" aria-relevant="additions">
            {messages.map((message, index) => (
              <div className={`chat-message chat-${message.role}`} key={`${index}-${message.role}`}>
                {message.text.split('\n').map((line, lineIndex) => (
                  <p key={`${lineIndex}-${line}`}>{renderMessageLine(line)}</p>
                ))}
                {message.action && (
                  <a
                    className="chat-answer-action"
                    href={message.action.href}
                    target={message.action.external ? '_blank' : undefined}
                    rel={message.action.external ? 'noreferrer' : undefined}
                  >
                    {message.action.label}<span aria-hidden="true">↗</span>
                  </a>
                )}
              </div>
            ))}
            {messages.length === 1 && (
              <div className="chat-suggestions" aria-label="Suggested questions">
                {suggestions.map(suggestion => (
                  <button key={suggestion} type="button" onClick={() => ask(suggestion)}>{suggestion}</button>
                ))}
              </div>
            )}
          </div>

          <form className="chat-form" onSubmit={handleSubmit}>
            <label className="visually-hidden" htmlFor="portfolio-chat-input">Ask a question about Navin</label>
            <input
              id="portfolio-chat-input"
              ref={inputRef}
              value={question}
              onChange={event => setQuestion(event.target.value)}
              placeholder="Ask about skills, projects…"
              autoComplete="off"
            />
            <button type="submit" aria-label="Send question" disabled={!question.trim()}>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h15M13 5l7 7-7 7" /></svg>
            </button>
          </form>
          <p className="chat-footnote">Answers are based on the information in this portfolio.</p>
        </section>
      )}

      <button
        className={`chat-launcher${isOpen ? ' chat-launcher-open' : ''}`}
        type="button"
        aria-label={isOpen ? 'Close portfolio assistant' : 'Ask about Navin'}
        aria-expanded={isOpen}
        onClick={() => setIsOpen(open => !open)}
      >
        {isOpen ? (
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg>
        ) : (
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 11.5a7.5 7.5 0 0 1-7.5 7.5H6l-3 2v-9.5A7.5 7.5 0 0 1 10.5 4h2A7.5 7.5 0 0 1 20 11.5Z" /><path d="M8 11h8M8 14h5" /></svg>
        )}
      </button>
    </div>
  )
}
