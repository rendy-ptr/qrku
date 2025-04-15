import { useEffect, useState } from 'react'

interface QREntriesProps {
  items: {
    value: string
    password: string
  }[]
  onItemClick: (item: { value: string; password: string }) => void
}

export const QREntries = ({ items, onItemClick }: QREntriesProps) => {
  return (
    <section className="bg-white border-4 border-[var(--color-brutal-black)] p-6 shadow-[6px_6px_0_0_var(--color-brutal-black)]">
      <h2
        className="text-xl font-bold mb-4"
        style={{ fontFamily: 'var(--font-brutallay)' }}
      >
        Your QR Entries
      </h2>
      {items.length === 0 ? (
        <div
          className="text-gray-600 font-semibold text-center"
          style={{ fontFamily: 'var(--font-brutalpt)' }}
        >
          No data available. Enter something to generate QR.
        </div>
      ) : (
        <ul className="space-y-2">
          {items.map((item, index) => (
            <li
              key={index}
              onClick={() => onItemClick(item)}
              className="cursor-pointer border-2 border-[var(--color-brutal-black)] px-4 py-2 hover:bg-yellow-100 shadow-[3px_3px_0_0_var(--color-brutal-black)] transition-all"
              style={{ fontFamily: 'var(--font-brutalpt)' }}
            >
              {item.value}
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
