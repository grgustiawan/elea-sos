import { useState, useEffect } from 'react'
import { AlertCircle, CheckCircle, Info, X, XCircle } from 'lucide-react'

type NotificationType = 'success' | 'info' | 'warning' | 'error'

interface NotificationProps {
  type: NotificationType
  message: string
  duration?: number
  onDismiss?: () => void
}

const iconMap = {
  success: CheckCircle,
  info: Info,
  warning: AlertCircle,
  error: XCircle,
}

const bgColorMap = {
  success: 'bg-teal-400',
  info: 'bg-sky-300',
  warning: 'bg-yellow-400',
  error: 'bg-rose-400',
}

export default function NotificationPopup({ type, message, duration, onDismiss }: NotificationProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      onDismiss?.()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onDismiss])

  if (!isVisible) return null

  const Icon = iconMap[type]

  return (
    <div className="fixed top-5 z-50 px-4 pb-4 w-full lg:w-[448px]">
      <div
        className={`rounded-lg shadow-lg ${bgColorMap[type]} transform transition-all duration-1000 ease-in-out ${
          isVisible ? 'translate-y-0 opacity-90' : 'translate-y-2 opacity-0'
        }`}
      >
        <div className="p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <Icon className="h-6 w-6 text-white" aria-hidden="true" />
            </div>
            <div className="ml-3 w-0 flex-1 pt-0.5">
              <p className="text-sm font-medium text-white">{message}</p>
            </div>
            <div className="ml-4 flex flex-shrink-0">
              <button
                type="button"
                className="inline-flex rounded-md text-white hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-white"
                onClick={() => {
                  setIsVisible(false)
                  onDismiss?.()
                }}
              >
                <span className="sr-only">Close</span>
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}