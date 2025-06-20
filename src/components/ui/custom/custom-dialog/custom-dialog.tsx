import { createContext, useContext, ReactNode, useRef } from 'react'
import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/animate-ui/radix/dialog'
import { CustomButton } from '../custom-button/button'

type DialogOptions = {
  title: string
  description?: string
  content: ReactNode
  onConfirm?: () => void
  onCancel?: () => void
  confirmLabel?: string
  cancelLabel?: string
}

type DialogContextType = {
  open: (options: DialogOptions) => void
  close: () => void
  formRef?: React.RefObject<HTMLFormElement>
}

const DialogContext = createContext<DialogContextType | null>(null)

export const useGlobalDialog = () => {
  const context = useContext(DialogContext)
  if (!context) throw new Error('useGlobalDialog must be used within DialogProvider')
  return context
}

export const DialogProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false)
  const [options, setOptions] = useState<DialogOptions | null>(null)

  const handleOpen = (opts: DialogOptions) => {
    setOptions(opts)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setOptions(null)
  }

  const formRef = useRef<HTMLFormElement>(null)

  const handleConfirm = () => {
    if (formRef.current) {
      formRef.current.requestSubmit()
    } else {
      options?.onConfirm?.()
      handleClose()
    }
  }

  return (
    <DialogContext.Provider value={{ open: handleOpen, close: handleClose, formRef }}>
      {children}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className='w-[40rem] max-w-none '>
          <DialogHeader>
            <DialogTitle>{options?.title}</DialogTitle>
            {options?.description && <DialogDescription>{options.description}</DialogDescription>}
          </DialogHeader>

          <div className='pt-4'>{options?.content}</div>

          <DialogFooter>
            {options?.onCancel && (
              <CustomButton
                variant='outline'
                onClick={() => {
                  options.onCancel?.()
                  handleClose()
                }}
              >
                {options.cancelLabel ?? 'Cancel'}
              </CustomButton>
            )}
            {options?.onConfirm && (
              <CustomButton onClick={handleConfirm}>{options?.confirmLabel ?? 'Confirm'}</CustomButton>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DialogContext.Provider>
  )
}
