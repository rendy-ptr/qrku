import { useEffect } from 'react'

interface ToastProps {
  type: 'success' | 'error' | 'warn'
  message: string
  onClose: () => void
}

export function BrutalToast({ type, message, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 2500)
    return () => clearTimeout(timer)
  }, [onClose])

  const baseStyle =
    'fixed bottom-6 right-6 px-4 py-3 border-2 shadow-[4px_4px_0_0_var(--color-brutal-black)] font-bold text-sm z-50 animate-bounce-in'

  const typeStyle = {
    success:
      'bg-[var(--color-brutal-green)] border-[var(--color-brutal-black)] text-black',
    error:
      'bg-[var(--color-brutal-red)] border-[var(--color-brutal-black)] text-white',
    warn: 'bg-[var(--color-brutal-orange)] border-[var(--color-brutal-black)] text-black',
  }

  return (
    <div
      className={`${baseStyle} ${typeStyle[type]}`}
      style={{
        fontFamily: 'var(--font-brutal)',
        borderRadius: 'var(--radius-brutal)',
      }}
    >
      {message}
    </div>
  )
}
