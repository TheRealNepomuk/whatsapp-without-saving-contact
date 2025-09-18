import { useMemo, useState } from 'react'
import './App.css'
import { sanitizePhoneInput, isLikelyValidPhoneNumber, buildWhatsAppUrl, mightBeMissingCountryCode, PHONE_NUMBER_CONSTRAINTS } from './utils/phone'
import { useModal } from './hooks/useModal'

function App() {
  const [rawInput, setRawInput] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState({ type: 'idle', message: '' })
  const [showPrivacy, setShowPrivacy] = useState(false)
  const [showCountryCodeWarning, setShowCountryCodeWarning] = useState(false)

  const sanitized = useMemo(() => sanitizePhoneInput(rawInput), [rawInput])
  const isValid = useMemo(() => isLikelyValidPhoneNumber(sanitized), [sanitized])
  const whatsappUrl = useMemo(() => (isValid ? buildWhatsAppUrl(sanitized) : ''), [isValid, sanitized])
  const modalRef = useModal(showCountryCodeWarning, () => setShowCountryCodeWarning(false))


  function handleSubmit(e) {
    e.preventDefault()
    setStatus({ type: 'idle', message: '' })
    setShowCountryCodeWarning(false)
    const cleaned = sanitizePhoneInput(rawInput)
    if (!isLikelyValidPhoneNumber(cleaned)) {
      setStatus({ type: 'error', message: `Enter a valid phone number with country code (${PHONE_NUMBER_CONSTRAINTS.MIN_LENGTH}-${PHONE_NUMBER_CONSTRAINTS.MAX_LENGTH} digits).` })
      return
    }
    if (mightBeMissingCountryCode(rawInput)) {
      setShowCountryCodeWarning(true)
      return
    }
    proceedToWhatsApp(cleaned)
  }

  function proceedToWhatsApp(cleaned) {
    setIsSubmitting(true)
    try {
      window.location.href = buildWhatsAppUrl(cleaned)
      setStatus({ type: 'success', message: 'Opening…' })
    } catch {
      setStatus({ type: 'error', message: 'Could not open WhatsApp. You can tap the link below.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  function handleFixNumber() {
    setShowCountryCodeWarning(false)
    document.getElementById('phone').focus()
  }

  function handleProceedAnyway() {
    setShowCountryCodeWarning(false)
    const cleaned = sanitizePhoneInput(rawInput)
    proceedToWhatsApp(cleaned)
  }

  return (
    <div className="container" lang="en">
      <header className="header">
        <h1 className="title">
          Message a Whatsapp number without saving it to Contacts
        </h1>
      </header>

      <form className="form" onSubmit={handleSubmit} noValidate>
        <label htmlFor="phone" className="label">Phone number</label>
        <div className={`input-container ${rawInput ? (isValid ? 'valid' : 'invalid') : ''}`}>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="e.g. 0034612345678 or +34612345678"
            value={rawInput}
            onChange={(e) => setRawInput(e.target.value)}
            className="input"
            aria-invalid={!!rawInput && !isValid}
            aria-describedby="phone-help"
    
          />
          <button
  className="submit"
  type="submit"
  disabled={!isValid || isSubmitting}
>
            {isSubmitting ? 'Opening…' : 'Open in WhatsApp'}
          </button>
        </div>
        <p id="phone-help" className="help">
          Please include the country code and use one of the following formats: 0034 or +34.
        </p>

        {status.type === 'error' && (
          <p className="status error" role="alert">
            {status.message || `Enter a valid phone number with country code (${PHONE_NUMBER_CONSTRAINTS.MIN_LENGTH}-${PHONE_NUMBER_CONSTRAINTS.MAX_LENGTH} digits).`}
          </p>
        )}
        {status.type === 'success' && whatsappUrl && (
          <p className="status success">
            If nothing happens, this fallback link: <a href={whatsappUrl}>WhatsApp</a>
          </p>
        )}
      </form>

      {showCountryCodeWarning && (
        <div
          ref={modalRef}
          className="modal-overlay"
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowCountryCodeWarning(false);
            }
          }}
        >
          <div className="modal-content">
            <h3 id="modal-title">Missing country code?</h3>
            <p>
              Your number might be missing the country code. The country code consists of a + or 00 and your country prefix, for example <strong>001</strong> for USA, <strong>0049</strong> for Germany and <strong>00359</strong> for Bulgaria.
            </p>
            <div className="modal-buttons">
              <button type="button" className="button-primary" onClick={handleFixNumber}>
                Let me fix this
              </button>
              <button type="button" className="button-secondary" onClick={handleProceedAnyway}>
                Proceed anyway
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="footer">
        <button
          type="button"
          className="privacy-toggle"
          onClick={() => setShowPrivacy(!showPrivacy)}
        >
          {showPrivacy ? 'Hide' : 'Show'} Privacy Notice
        </button>
        {showPrivacy && (
          <div className="privacy-notice">
            <h3>Privacy & Data Usage</h3>
            <p><strong>Your phone number is completely private and secure:</strong></p>
            <ul>
              <li>This app runs entirely in your browser - no data is sent to our servers</li>
              <li>Your phone number is only used to create the WhatsApp link and is never stored</li>
              <li>After redirecting to WhatsApp, your number is automatically deleted from memory</li>
              <li>We don't use cookies, analytics, or any tracking</li>
              <li>Your number never leaves your device except to WhatsApp's servers</li>
            </ul>
            <p><strong>What happens:</strong> You type a number → we format it → we redirect you to WhatsApp → your number is gone from our app.</p>
          </div>
        )}
        
        <div className="coffee-button-container">
          <a
            href="https://www.buymeacoffee.com/TheRealNepomuk"
            target="_blank"
            rel="noopener noreferrer"
            className="coffee-button"
          >
            <img
              src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
              alt="Buy Me A Coffee"
            />
          </a>
        </div>
        
        <div className="version-info">
          v1.2
        </div>
      </footer>
    </div>
  )
}

export default App