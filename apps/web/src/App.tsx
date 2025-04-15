import { useState, useEffect } from 'react'
import { useBrutalToast } from './components/CustomToast/useBrutalToast'

// components
import { QRModal } from './components/non-reusable/QRModal'
import { Header } from './components/non-reusable/Header'
import { InputSection } from './components/non-reusable/InputSection'
import { QREntries } from './components/non-reusable/QREntries'
import { Footer } from './components/non-reusable/Footer'
import { PasswordPrompt } from './components/non-reusable/PasswordPrompt'

export default function App() {
  const { showToast } = useBrutalToast()
  const [input, setInput] = useState('')
  const [items, setItems] = useState<{ value: string; password: string }[]>([])
  const [selectedItem, setSelectedItem] = useState<{
    value: string
    password: string
  } | null>(null)
  const [password, setPassword] = useState('')
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false)

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/qr-codes`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        if (!response.ok) {
          throw new Error('Failed to fetch items')
        }
        const data = await response.json()
        setItems(data)
      } catch (error) {
        console.error('Error fetching items:', error)
      }
    }
    fetchItems()
  }, [])

  const handleGenerate = async () => {
    if (input.trim() && password.trim()) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/qr-codes`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ value: input, password }),
          },
        )
        if (!response.ok) {
          throw new Error(`Failed to save data: ${response.statusText}`)
        }
        const data = await response.json()
        setItems((prevItems) => [data, ...prevItems])
        showToast('success', 'QR berhasil disimpan!')
      } catch (error) {
        console.error('Fetch error:', error)
        showToast('error', 'Terjadi kesalahan saat menyimpan!')
      }
      setInput('')
      setPassword('')
    } else {
      console.log('Failed validation')
      showToast('warn', 'Isi input dan password terlebih dahulu')
    }
  }

  const handleItemClick = (item: { value: string; password: string }) => {
    setSelectedItem(item)
    setShowPasswordPrompt(true)
  }
  const handlePasswordSubmit = (password: string) => {
    if (selectedItem && password === selectedItem.password) {
      setShowPasswordPrompt(false)
      showToast('success', 'Password is correct!')
    } else {
      showToast('error', 'Password is incorrect!')
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
