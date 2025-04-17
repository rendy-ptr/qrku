import { QRCodeSVG } from 'qrcode.react'
import { useState } from 'react'

interface QRModalProps {
  value: {
    qrid: string
    qrvalue: string
  }
  onClose: () => void
}

export const QRModal = ({ value, onClose }: QRModalProps) => {
  const [copied, setCopied] = useState(false)
  return (
    <div className="fixed inset-0 bg-[var(--color-brutal-grain)] flex items-center justify-center z-50 p-4">
      <div
        className="bg-[var(--color-brutal-white)] border-2 border-[var(--color-brutal-primary)] p-4 sm:p-6 relative shadow-[var(--shadow-brutal)] max-w-md w-full rounded-[var(--radius-brutal)]"
        style={{ fontFamily: 'var(--font-brutal-body)' }}
      >
        <button
          onClick={onClose}
          className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-[var(--color-brutal-accent)] border-2 border-[var(--color-brutal-primary)] text-[var(--color-brutal-primary)] font-bold px-3 py-1 shadow-[var(--shadow-brutal)] hover:bg-[var(--color-brutal-primary)] hover:text-[var(--color-brutal-accent)] transition-all ease-[var(--ease-snappy)] hover:[var(--scale-hover)] cursor-pointer rounded-[var(--radius-brutal)]"
          style={{ fontFamily: 'var(--font-brutal-heading)' }}
        >
          ✕
        </button>
        <h2
          className="text-2xl sm:text-3xl font-bold uppercase mb-4 sm:mb-6 text-center text-[var(--color-brutal-primary)]"
          style={{ fontFamily: 'var(--font-brutal-heading)' }}
        >
          QR - CODE - ID#{value.qrid.slice(-4).toUpperCase()}
        </h2>
        <div className="flex justify-center mb-4">
          <QRCodeSVG
            value={value.qrvalue}
            size={180}
            fgColor="var(--color-brutal-primary)"
            bgColor="transparent"
          />
        </div>
        <div className="border-t-2 border-[var(--color-brutal-primary)] pt-4 mt-4">
          <div className="flex items-center justify-between gap-4 bg-[var(--color-brutal-white)] border-2 border-[var(--color-brutal-primary)] p-3 shadow-[var(--shadow-brutal)] rounded-[var(--radius-brutal)]">
            <p
              className="text-sm break-all text-[var(--color-brutal-primary)]"
              style={{ fontFamily: 'var(--font-brutal-body)' }}
            >
              {value.qrvalue}
            </p>
            <button
              onClick={() => {
                navigator.clipboard.writeText(value.qrvalue)
                setCopied(true)
                setTimeout(() => setCopied(false), 1500)
              }}
              disabled={copied}
              className={`px-3 py-1 text-xs font-bold border-2 border-[var(--color-brutal-primary)] shadow-[var(--shadow-brutal)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[var(--shadow-brutal-active)] transition-all ease-[var(--ease-snappy)] hover:[var(--scale-hover)] rounded-[var(--radius-brutal)] ${
                copied
                  ? 'bg-[var(--color-brutal-grain)] text-[var(--color-brutal-primary)] cursor-not-allowed'
                  : 'bg-[var(--color-brutal-primary)] text-[var(--color-brutal-white)] cursor-pointer hover:bg-[var(--color-brutal-accent)] hover:text-[var(--color-brutal-primary)]'
              }`}
              style={{ fontFamily: 'var(--font-brutal-heading)' }}
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
