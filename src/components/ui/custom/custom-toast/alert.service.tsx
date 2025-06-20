// lib/alertService.ts
import { toast } from 'sonner'
import { AlertInfo, AlertError, AlertSuccess, AlertWarning } from './custom-alert'

export const alertService = {
  success: ({ message, title }: { message: string; title?: string }) =>
    toast.custom((t) => (
      <div onClick={() => toast.dismiss(t)} className='cursor-pointer'>
        <AlertSuccess message={message} title={title} />
      </div>
    )),

  error: ({ message, title }: { message: string; title?: string }) =>
    toast.custom((t) => (
      <div onClick={() => toast.dismiss(t)} className='cursor-pointer'>
        <AlertError message={message || 'Request failed'} title={title} />
      </div>
    )),

  info: ({ message, title }: { message: string; title?: string }) =>
    toast.custom((t) => (
      <div onClick={() => toast.dismiss(t)} className='cursor-pointer'>
        <AlertInfo message={message} title={title} />
      </div>
    )),

  warning: ({ message, title }: { message: string; title?: string }) =>
    toast.custom((t) => (
      <div onClick={() => toast.dismiss(t)} className='cursor-pointer'>
        <AlertWarning message={message} title={title} />
      </div>
    ))
}
