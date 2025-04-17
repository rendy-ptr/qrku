import { useState } from 'react'

interface PasswordPromptProps {
  onSubmit: (password: string) => void
  onCancel: () => void
  onDelete: (password: string) => void
}

export function PasswordPrompt({
  onSubmit,
  onCancel,
  onDelete,
}: PasswordPromptProps) {
  const [password, setPassword] = useState('')

  const handleSubmit = () => {
    onSubmit(password)
    setPassword('')
  }

  const handleDelete = () => {
    onDelete(password)
    setPassword('')
  }

  return (
    <div className="fixed inset-0 bg-[var(--color-brutal-grain)] flex items-center justify-center z-50 p-4">
      <div
        className="bg-[var(--color-brutal-white)] border-2 border-[var(--color-brutal-primary)] p-6 shadow-[var(--shadow-brutal)] w-full max-w-sm rounded-[var(--radius-brutal)]"
        style={{ fontFamily: 'var(--font-brutal)' }}
      >
        <h2 className="text-lg sm:text-xl font-bold mb-4 text-center text-[var(--color-brutal-primary)] uppercase">
          Enter Password
        </h2>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-2 mb-4 border-2 border-[var(--color-brutal-primary)] bg-[var(--color-brutal-white)] text-[var(--color-brutal-primary)] text-sm rounded-[var(--radius-brutal)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brutal-accent)]"
        />
        <div className="flex flex-row justify-center gap-1.5 px-2 w-full max-w-full">
          <button
            onClick={handleSubmit}
            className="bg-[var(--color-brutal-primary)] text-[var(--color-brutal-white)] px-3 py-1.5 border-2 border-[var(--color-brutal-primary)] shadow-[var(--shadow-brutal)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[var(--shadow-brutal-active)] transition-all ease-[var(--ease-snappy)] font-bold text-xs sm:text-sm cursor-pointer hover:bg-[var(--color-brutal-accent)] hover:text-[var(--color-brutal-primary)] min-w-[70px] sm:min-w-[90px] whitespace-nowrap rounded-[var(--radius-brutal)]"
          >
            Submit
          </button>
          <button
            onClick={onCancel}
            className="bg-[var(--color-brutal-white)] text-[var(--color-brutal-primary)] px-3 py-1.5 border-2 border-[var(--color-brutal-primary)] shadow-[var(--shadow-brutal)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[var(--shadow-brutal-active)] transition-all ease-[var(--ease-snappy)] font-bold text-xs sm:text-sm cursor-pointer hover:bg-[var(--color-brutal-accent)] hover:text-[var(--color-brutal-primary)] min-w-[70px] sm:min-w-[90px] whitespace-nowrap rounded-[var(--radius-brutal)]"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="bg-[var(--color-brutal-primary)] text-[var(--color-brutal-white)] px-3 py-1.5 border-2 border-[var(--color-brutal-primary)] shadow-[var(--shadow-brutal)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[var(--shadow-brutal-active)] transition-all ease-[var(--ease-snappy)] font-bold text-xs sm:text-sm cursor-pointer hover:bg-[var(--color-brutal-accent)] hover:text-[var(--color-brutal-primary)] min-w-[70px] sm:min-w-[90px] whitespace-nowrap rounded-[var(--radius-brutal)]"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}
