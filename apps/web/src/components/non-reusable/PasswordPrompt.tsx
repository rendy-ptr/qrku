import { useState } from 'react'

interface PasswordPromptProps {
  onSubmit: (password: string) => void
  onCancel: () => void
}

export function PasswordPrompt({ onSubmit, onCancel }: PasswordPromptProps) {
  const [password, setPassword] = useState('')

  const handleSubmit = () => {
    onSubmit(password)
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
        <div className="flex justify-between">
          <button
            onClick={handleSubmit}
            className="bg-[var(--color-brutal-black)] text-white px-4 py-2 border-2 border-[var(--color-brutal-black)] shadow-[4px_4px_0_0_var(--color-brutal-black)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_0_var(--color-brutal-black)] transition-all font-bold text-sm cursor-pointer hover:bg-[var(--color-brutal-yellow)] hover:text-[var(--color-brutal-black)]"
          >
            Submit
          </button>
          <button
            onClick={onCancel}
            className="bg-white text-[var(--color-brutal-black)] px-4 py-2 border-2 border-[var(--color-brutal-black)] shadow-[4px_4px_0_0_var(--color-brutal-black)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_0_var(--color-brutal-black)] transition-all font-bold text-sm cursor-pointer hover:bg-[var(--color-brutal-yellow)] hover:text-[var(--color-brutal-black)]"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
