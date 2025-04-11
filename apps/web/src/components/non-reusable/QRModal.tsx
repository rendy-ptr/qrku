import { QRCodeSVG } from 'qrcode.react'
import { useState } from 'react'

interface QRModalProps {
  value: string
  onClose: () => void
}

export const QRModal = ({ value, onClose }: QRModalProps) => {
  const [copied, setCopied] = useState(false)
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div
        className="bg-white border-4 border-[var(--color-brutal-black)] p-6 relative shadow-[12px_12px_0_0_var(--color-brutal-black)] max-w-md w-full"
        style={{ fontFamily: 'var(--font-brutal)', borderRadius: '0px' }}
      >
        <button
          onClick={onClose}
          className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-[var(--color-brutal-yellow)] border-4 border-[var(--color-brutal-black)] text-black font-bold px-4 py-2 shadow-[4px_4px_0_0_var(--color-brutal-black)] hover:bg-black hover:text-yellow-300 transition-all cursor-pointer"
        >
          ✕
        </button>
        <h2
          className="text-3xl font-bold uppercase mb-6 text-center"
          style={{ fontFamily: 'var(--font-brutallay)' }}
        >
          QR Detail
        </h2>
        <div className="flex justify-center mb-4">
          <QRCodeSVG
            value={value}
            size={180}
            fgColor="var(--color-brutal-black)"
            bgColor="transparent"
          />
        </div>
        <div className="border-t-4 border-[var(--color-brutal-black)] pt-4 mt-4">
          <div className="flex items-center justify-between gap-4 bg-white border-2 border-[var(--color-brutal-black)] p-3 shadow-[4px_4px_0_0_var(--color-brutal-black)]">
            <p
              className="text-sm break-all"
              style={{ fontFamily: 'var(--font-brutallay)' }}
            >
              {value}
            </p>
            <button
              onClick={() => {
                navigator.clipboard.writeText(value)
                setCopied(true)
                setTimeout(() => setCopied(false), 1500)
              }}
              disabled={copied}
              className={`px-3 py-1 text-xs font-bold border-2 transition-all
    ${
      copied
        ? 'bg-gray-400 text-white cursor-not-allowed'
        : 'bg-[var(--color-brutal-black)] text-white cursor-pointer hover:bg-[var(--color-brutal-yellow)] hover:text-black'
    }
    border-[var(--color-brutal-black)] shadow-[2px_2px_0_0_var(--color-brutal-black)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0_0_var(--color-brutal-black)]`}
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
