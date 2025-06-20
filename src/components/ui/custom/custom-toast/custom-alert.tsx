'use client'

import { CheckCircle2, XCircle, AlertTriangle, Info } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

type AlertProps = {
  title?: string
  message: string
  icon?: React.ReactNode
  className?: string
}

function AlertBase({
  title,
  message,
  icon,
  className,
  bgClass,
  borderClass,
  textClass,
  iconBgClass,
  gradientColor = 'white/20'
}: AlertProps & {
  bgClass: string
  borderClass: string
  textClass: string
  iconBgClass: string
  gradientColor?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn('w-full max-w-sm mx-auto rounded-lg', className)}
    >
      <div className={cn('relative border p-4 shadow-sm', bgClass, borderClass)}>
        <div className='flex items-start gap-3'>
          <motion.div
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <div className={cn('rounded-full p-1', iconBgClass)}>{icon}</div>
          </motion.div>

          <div className='flex flex-col gap-0.5'>
            {title && (
              <motion.p
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 }}
                className={cn('text-xs font-medium text-muted-foreground')}
              >
                {title}
              </motion.p>
            )}
            <motion.p
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className={cn('text-sm font-semibold leading-tight', textClass)}
            >
              {message}
            </motion.p>
          </div>
        </div>

        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{ duration: 1, delay: 0.2 }}
          className={cn(
            'absolute inset-0 z-10 pointer-events-none bg-gradient-to-r from-transparent',
            `via-${gradientColor} to-transparent`
          )}
        />
      </div>
    </motion.div>
  )
}

// ✅ SUCCESS
export function AlertSuccess({ title, message }: { title?: string; message: string }) {
  return (
    <AlertBase
      title={title}
      message={message}
      bgClass='bg-success-gradient'
      borderClass='border-none'
      textClass='text-[#047857]'
      icon={<CheckCircle2 className='h-4 w-4 text-[#166534]' />}
      iconBgClass='bg-[#6ee7b7]'
      gradientColor='green-100/20'
    />
  )
}

// ❌ ERROR
export function AlertError({ title, message }: { title?: string; message: string }) {
  return (
    <AlertBase
      title={title}
      message={message}
      bgClass='bg-error-gradient'
      borderClass='border-red-200/30 dark:border-red-800/30'
      textClass='text-[#991b1b]'
      icon={<XCircle className='h-4 w-4 text-[#991b1b]' />}
      iconBgClass='bg-[#fca5a5]'
      gradientColor='red-100/20'
    />
  )
}

// ⚠️ WARNING
export function AlertWarning({ title, message }: { title?: string; message: string }) {
  return (
    <AlertBase
      title={title}
      message={message}
      bgClass='bg-warning-gradient'
      borderClass='border-yellow-200/30 dark:border-yellow-800/30'
      textClass='text-[#92400e]'
      icon={<AlertTriangle className='h-4 w-4 text-[#92400e]' />}
      iconBgClass='bg-[#fcd34d]'
      gradientColor='yellow-100/20'
    />
  )
}

// ℹ️ INFO
export function AlertInfo({ title, message }: { title?: string; message: string }) {
  return (
    <AlertBase
      title={title}
      message={message}
      bgClass='bg-info-gradient'
      borderClass='border-blue-200/30 dark:border-blue-800/30'
      textClass='text-[#1e40af]'
      icon={<Info className='h-4 w-4 text-[#1e40af]' />}
      iconBgClass='bg-[#93c5fd]'
      gradientColor='blue-100/20'
    />
  )
}
