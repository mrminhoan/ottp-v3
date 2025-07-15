import { Spinner } from '@/components/ui/spinner'
import { ShopModelResponse } from '@/models/class/shop/shop.model'
import { motion } from 'framer-motion'

interface IProps {
  data: ShopModelResponse
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0.03
    }
  }
}

const itemVariants = {
  hidden: {
    opacity: 0,
    x: -20,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1
  }
}

export const RenderUserInfo = (props: IProps) => {
  const { data } = props
  const labelClass = 'py-1 px-2 bg-[gray] text-white font-bold text-center text-xs'
  const valueClass = 'border border-border px-2 py-1 text-right text-xs font-bold'

  return (
    <>
      {!data ? (
        <Spinner />
      ) : (
        <motion.div
          className='grid grid-cols-[7rem_1fr] gap-2 w-full max-w-sm'
          variants={containerVariants}
          initial='hidden'
          animate='visible'
          transition={{
            duration: 0.18,
            ease: 'easeOut'
          }}
        >
          <motion.p className={labelClass} variants={itemVariants} transition={{ duration: 0.15, ease: 'easeOut' }}>
            Shop ID
          </motion.p>
          <motion.p className={valueClass} variants={itemVariants} transition={{ duration: 0.15, ease: 'easeOut' }}>
            {data?.username}
          </motion.p>

          <motion.p className={labelClass} variants={itemVariants} transition={{ duration: 0.15, ease: 'easeOut' }}>
            Shop Name
          </motion.p>
          <motion.p className={valueClass} variants={itemVariants} transition={{ duration: 0.15, ease: 'easeOut' }}>
            {data?.shop_name}
          </motion.p>
        </motion.div>
      )}
    </>
  )
}
