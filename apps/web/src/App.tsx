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
  const [items, setItems] = useState<{ id: string }[]>([])
  const [selectedItem, setSelectedItem] = useState<{
    id: string
  } | null>(null)
  const [password, setPassword] = useState('')
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false)
  const [revealedValue, setRevealedValue] = useState<{
    qrid: string
    qrvalue: string
  }>()

  const fetchItems = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_PROD_API_URL}/qr-codes`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      if (!response.ok) {
        throw new Error('Failed to fetch items')
      }
      const data = await response.json()
      setItems(data)
    } catch (error) {
      console.error('Error fetching items:', error)
    }
  }

  // Panggil saat mount
  useEffect(() => {
    fetchItems()
  }, [])

  const handleGenerate = async () => {
    if (input.trim() && password.trim()) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_PROD_API_URL}/qr-codes`,
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
      showToast('warn', 'Isi input dan password terlebih dahulu')
    }
  }

  const handleItemClick = (item: { id: string }) => {
    setSelectedItem(item)
    setShowPasswordPrompt(true)
  }
  const handlePasswordSubmit = async (password: string) => {
    if (!selectedItem) {
      showToast('error', 'Item tidak ditemukan')
      return
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_PROD_API_URL}/qr-codes/verify`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: selectedItem.id,
            password,
          }),
        },
      )
      const result = await res.json()

      if (res.ok && result.success) {
        setShowPasswordPrompt(false)
        setRevealedValue(result.res)
        showToast('success', 'Password is correct!')
      } else {
        showToast('error', result.error || 'Password is incorrect!')
      }
    } catch (err) {
      console.error('Error verifying password:', err)
      showToast('error', 'Terjadi kesalahan saat menghubungi server')
    }
  }

  const handlePasswordCancel = () => {
    setShowPasswordPrompt(false)
    setSelectedItem(null)
  }

  const handlePasswordDelete = async (password: string) => {
    if (!selectedItem) {
      showToast('error', 'Item tidak ditemukan')
      return
    }
    try {
      const res = await fetch(
        `${import.meta.env.VITE_PROD_API_URL}/qr-codes/verify`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: selectedItem.id,
            password,
          }),
        },
      )
      const result = await res.json()
      if (res.ok && result.success) {
        setShowPasswordPrompt(false)
        setSelectedItem(null)
        await fetchItems()
        showToast('success', 'QR berhasil dihapus!')
      } else {
        showToast('error', result.error || 'Password is incorrect!')
      }
    } catch (err) {
      console.error('Error deleting QR code:', err)
      showToast('error', 'Terjadi kesalahan saat menghubungi server')
    }
  }

  return (
    <div
      className="min-h-screen p-8 bg-[var(--color-brutal-white)]"
      style={{ fontFamily: 'var(--font-brutal-body)' }}
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
          onDelete={handlePasswordDelete}
        />
      )}

      {/* Modal */}
      {selectedItem && !showPasswordPrompt && revealedValue && (
        <QRModal value={revealedValue} onClose={() => setSelectedItem(null)} />
      )}
    </div>
  )
}
