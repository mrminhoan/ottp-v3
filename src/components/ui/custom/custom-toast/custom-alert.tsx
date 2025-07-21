'use client'

import { CheckCircle2, XCircle, AlertTriangle, Info, PartyPopper } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Alert } from '../../alert'
import { CustomFormatMoneyTether, CustomFormatNumber } from '@/lib/lib-format-number'
import { SYMBOL_CURRENCY } from '@/constants/common'
import IcTether from '@/assets/icons/tether.svg'
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
        <div className='flex items-center gap-3'>
          <motion.div
            initial={{ scale: 0.5, opacity: 0, rotate: -20 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <div className={cn('rounded-full p-1', iconBgClass)}>
              <motion.span
                initial={{ opacity: 0, y: -10, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.05, type: 'spring', stiffness: 200, damping: 15 }}
              >
                {icon}
              </motion.span>
            </div>
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

interface dataNotiMessage {
  message: string
  tether: number
  amount: number
  username: string
  txn_hash: string
  expiry_time: string
}

export default function AlertNotiDeposit({ className, data }: { className?: string; data: dataNotiMessage }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn('w-full max-w-xl mx-auto', className)}
    >
      <Alert
        className={cn(
          'relative overflow-hidden',
          'bg-gradient-to-b from-primary/5 to-background',
          'border border-primary/20',
          'shadow-[0_1px_6px_0_rgba(114,227,173,0.08)]',
          'rounded-xl p-4',
          className
        )}
      >
        <div className='flex items-center gap-4'>
          <motion.div
            initial={{ rotate: -15, scale: 0.5 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 20
            }}
          >
            <div className='p-1 rounded-xl bg-success-gradient'>
              <img src={IcTether} alt='deposit' className='w-6 h-6' />
            </div>
          </motion.div>
          <div className='space-y-1'>
            <motion.h3
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className='font-medium text-primary-foreground'
            >
              Notification 🎉
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className='text-sm text-muted-foreground'
            >
              Deposit Notification
            </motion.p>
          </div>
        </div>
        {/* <div className='absolute inset-0 pointer-events-none'>
          <div className='absolute -left-2 -top-2 h-16 w-16 rounded-full bg-primary/20 blur-2xl opacity-30' />
          <div className='absolute top-2 right-8 h-12 w-12 rounded-full bg-success/20 blur-2xl opacity-30' />
          <div className='absolute -right-2 -bottom-2 h-16 w-16 rounded-full bg-primary/15 blur-2xl opacity-25' />
        </div>
        <div className='absolute top-4 right-4'>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 20,
              delay: 0.3
            }}
            className={cn(
              'text-[11px] font-medium',
              'px-2.5 py-0.5 rounded-full',
              'bg-primary/10',
              'text-primary-foreground',
              'ring-1 ring-primary/20'
            )}
          >
            Milestone
          </motion.div>
        </div> */}
      </Alert>
    </motion.div>
  )
}

// Hàm tạo message thông báo user thực hiện deposit
export function getDepositMessage({ username, tether, amount }: { username: string; tether: number; amount: number }) {
  return (
    <div className="leading-relaxed">
      <span>User </span>
      <span className="font-semibold text-primary">{username}</span>
      <span> has deposited </span>
      <span className="font-semibold text-emerald-600">
        <CustomFormatNumber value={amount} prefix={SYMBOL_CURRENCY.MAIN} />
      </span>
      <span> with </span>
      <span className="font-semibold text-orange-600">
        <CustomFormatNumber value={tether} prefix={SYMBOL_CURRENCY.TETHER} />
      </span>
      <span> tether</span>
    </div>
  )
}
