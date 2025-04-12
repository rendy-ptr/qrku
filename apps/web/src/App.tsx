import { useState } from 'react'

// components
import { QRModal } from './components/non-reusable/QRModal'
import { Header } from './components/non-reusable/Header'
import { InputSection } from './components/non-reusable/InputSection'
import { QREntries } from './components/non-reusable/QREntries'
import { Footer } from './components/non-reusable/Footer'
import { PasswordPrompt } from './components/non-reusable/PasswordPrompt'

export default function App() {
  const [input, setInput] = useState('')
  const [items, setItems] = useState<{ value: string; password: string }[]>([])
  const [selectedItem, setSelectedItem] = useState<{
    value: string
    password: string
  } | null>(null)
  const [password, setPassword] = useState('')
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false)

  const handleGenerate = () => {
    if (input.trim()) {
      setItems([
        {
          value: input,
          password: password,
        },
        ...items,
      ])
      setInput('')
      setPassword('')
    }
  }

  const handleItemClick = (item: { value: string; password: string }) => {
    setSelectedItem(item)
    setShowPasswordPrompt(true)
  }
  const handlePasswordSubmit = (password: string) => {
    if (selectedItem && password === selectedItem.password) {
      setShowPasswordPrompt(false)
    } else {
      alert('Incorrect password')
    }
  }

  const handlePasswordCancel = () => {
    setShowPasswordPrompt(false)
    setSelectedItem(null)
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
          password={password}
          onPasswordChange={setPassword}
        />

        {/* Cards Section */}
        <QREntries items={items} onItemClick={handleItemClick} />
      </main>
      <Footer />
      {showPasswordPrompt && (
        <PasswordPrompt
          onSubmit={handlePasswordSubmit}
          onCancel={handlePasswordCancel}
        />
      )}

      {/* Modal */}
      {selectedItem && !showPasswordPrompt && (
        <QRModal
          value={selectedItem.value}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </div>
  )
}
