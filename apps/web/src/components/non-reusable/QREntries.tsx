import { useEffect, useState } from 'react'

interface QREntriesProps {
  items: {
    id: string
  }[]
  onItemClick: (item: { id: string }) => void
}

export const QREntries = ({ items, onItemClick }: QREntriesProps) => {
  return (
    <section className="bg-[var(--color-brutal-white)] border-2 border-[var(--color-brutal-primary)] p-4 sm:p-6 shadow-[var(--shadow-brutal)] rounded-[var(--radius-brutal)]">
      <h2
        className="text-lg sm:text-xl font-bold mb-4 text-[var(--color-brutal-primary)]"
        style={{ fontFamily: 'var(--font-brutal-heading)' }}
      >
        Your QR Entries
      </h2>
      {items.length === 0 ? (
        <div
          className="text-[var(--color-brutal-primary)] font-semibold text-center"
          style={{ fontFamily: 'var(--font-brutal-body)' }}
        >
          No data available. Enter something to generate QR.
        </div>
      ) : (
        <ul className="space-y-2">
          {items.map((item) => (
            <li
              key={item.id}
              onClick={() => onItemClick(item)}
              className="cursor-pointer border-2 border-[var(--color-brutal-primary)] px-4 py-2 hover:bg-[var(--color-brutal-accent)] hover:text-[var(--color-brutal-primary)] shadow-[var(--shadow-brutal)] transition-all ease-[var(--ease-snappy)] hover:[var(--scale-hover)] rounded-[var(--radius-brutal)]"
              style={{ fontFamily: 'var(--font-brutal-body)' }}
            >
              QR - CODE - 🔒 ID#{item.id.slice(-4).toUpperCase()}
              <CountdownToMidnightWIB />
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

function CountdownToMidnightWIB() {
  const [timeLeft, setTimeLeft] = useState('')

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date()
      // Convert current time to WIB (UTC+7)
      const utcNow = now.getTime() + now.getTimezoneOffset() * 60000
      const wibNow = new Date(utcNow + 7 * 60 * 60 * 1000)

      const midnight = new Date(wibNow)
      midnight.setHours(23, 59, 59, 999)

      const diff = midnight.getTime() - wibNow.getTime()

      const hours = Math.floor(diff / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)

      setTimeLeft(`${hours}h ${minutes}m ${seconds}s`)
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <span className="ml-2 text-sm text-gray-500">– expired in {timeLeft}</span>
  )
}
