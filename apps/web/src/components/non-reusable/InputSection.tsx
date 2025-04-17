import { ChangeEvent } from 'react'

interface InputSectionProps {
  input: string
  onInputChange: (value: string) => void
  onGenerate: () => void
  password: string
  onPasswordChange: (value: string) => void
}

export const InputSection = ({
  input,
  onInputChange,
  onGenerate,
  password,
  onPasswordChange,
}: InputSectionProps) => {
  return (
    <section className="bg-[var(--color-brutal-white)] border-2 border-[var(--color-brutal-primary)] p-4 sm:p-6 shadow-[var(--shadow-brutal)] rounded-[var(--radius-brutal)]">
      <h2
        className="text-xl sm:text-2xl font-bold mb-2 text-[var(--color-brutal-primary)]"
        style={{ fontFamily: 'var(--font-brutal-heading)' }}
      >
        Input your text
      </h2>
      <input
        type="text"
        placeholder="Enter your text..."
        value={input}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          onInputChange(e.target.value)
        }
        className="w-full p-2 mb-4 border-2 border-[var(--color-brutal-primary)] bg-[var(--color-brutal-white)] text-[var(--color-brutal-primary)] text-sm rounded-[var(--radius-brutal)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brutal-accent)]"
      />
      <h2
        className="text-xl sm:text-2xl font-bold mb-2 text-[var(--color-brutal-primary)]"
        style={{ fontFamily: 'var(--font-brutal-heading)' }}
      >
        Input password for your QR
      </h2>
      <input
        type="password"
        placeholder="Enter your password..."
        value={password}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          onPasswordChange(e.target.value)
        }
        className="w-full p-2 mb-4 border-2 border-[var(--color-brutal-primary)] bg-[var(--color-brutal-white)] text-[var(--color-brutal-primary)] text-sm rounded-[var(--radius-brutal)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brutal-accent)]"
      />
      <button
        onClick={onGenerate}
        className="bg-[var(--color-brutal-primary)] text-[var(--color-brutal-white)] px-4 py-2 border-2 border-[var(--color-brutal-primary)] shadow-[var(--shadow-brutal)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[var(--shadow-brutal-active)] transition-all ease-[var(--ease-snappy)] hover:[var(--scale-hover)] font-bold text-sm sm:text-base cursor-pointer hover:bg-[var(--color-brutal-accent)] hover:text-[var(--color-brutal-primary)] rounded-[var(--radius-brutal)]"
      >
        Generate QR
      </button>
    </section>
  )
}
