import { useState } from 'react'

// components
import { QRModal } from './components/non-reusable/QRModal'
import { Header } from './components/non-reusable/Header'
import { InputSection } from './components/non-reusable/InputSection'
import { QREntries } from './components/non-reusable/QREntries'
import { Footer } from './components/non-reusable/Footer'

export default function App() {
  const [input, setInput] = useState('')
  const [items, setItems] = useState<string[]>([])
  const [selectedItem, setSelectedItem] = useState<string | null>(null)

  const handleGenerate = () => {
    if (input.trim()) {
      setItems([input, ...items])
      setInput('')
    }
  }

  return (
    <div
      className="min-h-screen p-8 bg-[#f8f8f8]"
      style={{ fontFamily: 'var(--font-brutal)' }}
    >
      <Header />

      <main className="max-w-2xl mx-auto space-y-8">
        {/* Input */}
        <InputSection
          input={input}
          onInputChange={setInput}
          onGenerate={handleGenerate}
        />

        {/* Cards Section */}
        <QREntries items={items} onItemClick={setSelectedItem} />
      </main>
      <Footer />

      {/* Modal */}
      {selectedItem && (
        <QRModal value={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </div>
  )
}
