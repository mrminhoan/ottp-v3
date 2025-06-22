import { createPortal } from 'react-dom'

interface IProps {
  isLoading: boolean
  children: React.ReactNode
}

export const LoadingOverlay = ({ isLoading = false, children }: IProps) => {
  const overlay = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gray-200/50 backdrop-blur-sm dark:bg-gray-900/50">
      <div className="w-28 h-28 border-8 border-gray-300 border-t-[#93dc12] rounded-full animate-spin flex items-center justify-center">
        <img src="/images/logo.png" alt="loading" className="w-8 h-8" />
      </div>
    </div>
  )

  return (
    <>
      {isLoading && typeof window !== 'undefined'
        ? createPortal(overlay, document.body)
        : null}
      {children}
    </>
  )
}
