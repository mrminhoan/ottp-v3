'use client'

import { motion } from 'motion/react'
import { FunnelPlus } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/animate-ui/radix/dropdown-menu'
import { PROCESS_STATUS_TYPE } from '@/constants/common'
import { Separator } from '@/components/ui/separator'

const statusOptions = [
  { value: PROCESS_STATUS_TYPE.PENDING, label: 'Pending' },
  { value: PROCESS_STATUS_TYPE.COMPLETED, label: 'Completed' },
  { value: PROCESS_STATUS_TYPE.CANCEL, label: 'Canceled' }
]

interface IProps {
  status: PROCESS_STATUS_TYPE[]
  onChange: (statuses: PROCESS_STATUS_TYPE[]) => void
}

export const CustomStatusFilter = ({ status, onChange }: IProps) => {
  const isChecked = (key: PROCESS_STATUS_TYPE) => status.includes(key)

  const toggleChecked = (key: PROCESS_STATUS_TYPE) => (checked: boolean) => {
    if (checked) {
      onChange([...status, key])
    } else {
      onChange(status.filter((s) => s !== key))
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className='text-xs text-muted-foreground w-fit border border-dashed border-border rounded-md h-8 flex items-center justify-center px-3'>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className='flex items-center gap-2'>
            <div className='flex items-center gap-2 px-2'>
              <FunnelPlus className='w-3 h-3' />
              Status
            </div>
            {status.length > 0 && (
              <div className='flex items-center gap-2'>
                <Separator orientation='vertical' className='h-5 bg-muted-foreground' />
                <div className='flex items-center gap-2'>
                  {status.map((s) => (
                    <p
                      key={s}
                      className='bg-muted-foreground text-xs text-white px-2 rounded-md h-5 flex items-center justify-center capitalize'
                    >
                      {s}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </motion.button>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className='w-56'>
        <DropdownMenuLabel>Status</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {statusOptions.map((option) => (
          <DropdownMenuCheckboxItem
            key={option.value}
            checked={isChecked(option.value)}
            onCheckedChange={toggleChecked(option.value)}
          >
            {option.label}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
