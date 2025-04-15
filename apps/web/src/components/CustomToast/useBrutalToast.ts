import { useContext } from 'react'
import { ToastContext } from './ToastProvider'

export const useBrutalToast = () => {
  const context = useContext(ToastContext)

  if (!context) {
    throw new Error('useBrutalToast must be used within a ToastProvider')
  }

  return context
}
