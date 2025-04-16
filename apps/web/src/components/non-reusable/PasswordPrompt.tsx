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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className="bg-white border-4 border-[var(--color-brutal-black)] p-6 shadow-[8px_8px_0_0_var(--color-brutal-black)] w-80"
        style={{ fontFamily: 'var(--font-brutal)' }}
      >
        <h2 className="text-xl font-bold mb-4 text-center uppercase">
          Enter Password
        </h2>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full border-2 border-[var(--color-brutal-black)] bg-transparent p-2 mb-4 text-sm focus:outline-none"
        />
        <div className="flex flex-row justify-center gap-2 px-2 w-full max-w-full">
          <button
            onClick={handleSubmit}
            className="bg-[var(--color-brutal-black)] text-white px-2.5 py-1 border-2 border-[var(--color-brutal-black)] shadow-[3px_3px_0_0_var(--color-brutal-black)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0_0_var(--color-brutal-black)] transition-all font-bold text-[11px] sm:text-sm cursor-pointer hover:bg-[var(--color-brutal-yellow)] hover:text-[var(--color-brutal-black)] min-w-[60px] sm:min-w-[80px] whitespace-nowrap"
          >
            Submit
          </button>
          <button
            onClick={onCancel}
            className="bg-white text-[var(--color-brutal-black)] px-2.5 py-1 border-2 border-[var(--color-brutal-black)] shadow-[3px_3px_0_0_var(--color-brutal-black)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0_0_var(--color-brutal-black)] transition-all font-bold text-[11px] sm:text-sm cursor-pointer hover:bg-[var(--color-brutal-yellow)] hover:text-[var(--color-brutal-black)] min-w-[60px] sm:min-w-[80px] whitespace-nowrap"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="bg-[var(--color-brutal-black)] text-white px-2.5 py-1 border-2 border-[var(--color-brutal-black)] shadow-[3px_3px_0_0_var(--color-brutal-black)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0_0_var(--color-brutal-black)] transition-all font-bold text-[11px] sm:text-sm cursor-pointer hover:bg-[var(--color-brutal-yellow)] hover:text-[var(--color-brutal-black)] min-w-[60px] sm:min-w-[80px] whitespace-nowrap"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}
