import React from 'react'

export const Header: React.FC = () => {
  return (
    <header className="border-2 border-[var(--color-brutal-primary)] bg-[var(--color-brutal-accent)] p-4 sm:p-6 mb-6 sm:mb-8 shadow-[var(--shadow-brutal)] rounded-[var(--radius-brutal)]">
      <h1
        className="text-3xl sm:text-4xl font-bold uppercase text-center text-[var(--color-brutal-primary)]"
        style={{ fontFamily: 'var(--font-brutal-heading)' }}
      >
        QR Code Generator
      </h1>
      <p
        className="text-sm sm:text-base text-center text-[var(--color-brutal-primary)] mt-2"
        style={{ fontFamily: 'var(--font-brutal-body)' }}
      >
        Create Secure QR Codes Instantly
      </p>
      <p
        className="text-xs sm:text-sm text-center text-[var(--color-brutal-primary)] mt-1"
        style={{ fontFamily: 'var(--font-brutal-body)' }}
      >
        Protect your data with password-encrypted QR codes that expire
        automatically every midnight.
      </p>
    </header>
  )
}
