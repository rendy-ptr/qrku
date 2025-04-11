import React from 'react'

export const Header: React.FC = () => {
  return (
    <header className="border-4 border-[var(--color-brutal-black)] bg-[var(--color-brutal-yellow)] p-6 mb-8 shadow-[8px_8px_0_0_var(--color-brutal-black)]">
      <h1
        className="text-4xl font-bold uppercase text-center"
        style={{ fontFamily: 'var(--font-brutallay)' }}
      >
        QR CODE GENERATOR
      </h1>
    </header>
  )
}

