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
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
