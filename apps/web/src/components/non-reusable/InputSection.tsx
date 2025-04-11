import { ChangeEvent } from 'react'

interface InputSectionProps {
    input: string
    onInputChange: (value: string) => void
    onGenerate: () => void
}

export const InputSection = ({ input, onInputChange, onGenerate}: InputSectionProps) => {
  return (
    <section className="bg-white border-4 border-[var(--color-brutal-black)] p-6 shadow-[6px_6px_0_0_var(--color-brutal-black)]">
      <h2
        className="text-2xl font-bold mb-2"
        style={{ fontFamily: 'var(--font-brutallay)' }}
      >
        Input your text
      </h2>
      <input
        type="text"
        placeholder="Enter your text..."
        value={input}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onInputChange(e.target.value)}
        className="w-full border-2 border-[var(--color-brutal-black)] p-2 mb-4 bg-transparent"
      />
      <button
        onClick={onGenerate}
        className="text-[var(--color-brutal-black)] px-4 py-2 border-2 border-[var(--color-brutal-black)] shadow-[4px_4px_0_0_var(--color-brutal-black)] transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_0_var(--color-brutal-black)] hover:bg-[var(--color-brutal-yellow)] hover:text-[var(--color-brutal-black)] cursor-pointer font-bold"
      >
        Generate QR
      </button>
    </section>
  )
}
