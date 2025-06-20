import { cn } from '@/lib/utils'
import { Check, Copy } from 'lucide-react'
import { useState } from 'react'

interface Btn06Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  textToCopy: string
  successDuration?: number
  classNameContent?: string
}

export default function CustomButtonCopy({
  className,
  classNameContent,
  textToCopy = '',
  successDuration = 1000,
  children,
  ...props
}: Btn06Props) {
  const [isCopied, setIsCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(textToCopy)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), successDuration)
    } catch (err) {
      console.error('Failed to copy text:', err)
    }
  }

  return (
    <div className='flex items-center gap-2 justify-center cursor-pointer text-xs' onClick={handleCopy}>
      <span className={cn('max-w-[10rem] truncate', classNameContent)}>{children}</span>

      <div className={cn('transition-transform duration-200', isCopied && 'scale-105')}>
        {isCopied ? (
          <Check className=' ' size={15} />
        ) : (
          <>
            <Copy className={cn(' transition-transform duration-200', 'group-hover:scale-110')} size={15} />
          </>
        )}
      </div>
    </div>
  )
}
