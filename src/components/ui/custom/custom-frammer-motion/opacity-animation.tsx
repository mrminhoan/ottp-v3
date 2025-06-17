import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { FC, ReactNode } from 'react'

interface IProps {
  children: ReactNode
  keyMotion?: string | number
  duration?: number
  className?: string
}

export const OpacityAnimation: FC<IProps> = (props) => {
  const { keyMotion = 'none-key', children, duration = 0.3, className } = props
  return (
    <motion.div
      key={keyMotion}
      className={cn('', className)}
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -10, opacity: 0 }}
      transition={{ duration }}
    >
      {children}
    </motion.div>
  )
}
