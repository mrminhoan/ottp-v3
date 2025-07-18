'use client'

import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { FunnelPlus, X } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/animate-ui/radix/dropdown-menu'
import { CustomInputNumber } from '@/components/ui/custom/custom-input/custom-input-number'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'

export interface MinMaxValue {
  min?: number
  max?: number
}

interface IProps {
  label: string
  placeholder?: string
  value: MinMaxValue
  onChange: (value: MinMaxValue) => void
  className?: string
  minPlaceholder?: string
  maxPlaceholder?: string
  prefix?: string
  suffix?: string
  decimalScale?: number
  showClearButton?: boolean
  disabled?: boolean
}

export const MinMaxFilter = ({
  label,
  placeholder = 'Select range',
  value,
  onChange,
  className = '',
  minPlaceholder = 'Min',
  maxPlaceholder = 'Max',
  prefix,
  suffix,
  decimalScale = 0,
  showClearButton = true,
  disabled = false
}: IProps) => {
  const [localMin, setLocalMin] = useState<number | undefined>(value.min)
  const [localMax, setLocalMax] = useState<number | undefined>(value.max)
  const [validationError, setValidationError] = useState<string>('')

  useEffect(() => {
    setLocalMin(value.min)
    setLocalMax(value.max)
  }, [value.min, value.max])

  const validateRange = (min?: number, max?: number) => {
    if (min !== undefined && max !== undefined && min > max) {
      return 'Min value cannot be greater than max value'
    }
    return ''
  }

  const handleMinChange = (newMin: number | undefined) => {
    setLocalMin(newMin)
    const error = validateRange(newMin, localMax)
    setValidationError(error)
    
    if (!error) {
      onChange({ min: newMin, max: localMax })
    }
  }

  const handleMaxChange = (newMax: number | undefined) => {
    setLocalMax(newMax)
    const error = validateRange(localMin, newMax)
    setValidationError(error)
    
    if (!error) {
      onChange({ min: localMin, max: newMax })
    }
  }

  const clearFilter = () => {
    setLocalMin(undefined)
    setLocalMax(undefined)
    setValidationError('')
    onChange({ min: undefined, max: undefined })
  }

  const hasValue = localMin !== undefined || localMax !== undefined

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: decimalScale,
      maximumFractionDigits: decimalScale
    }).format(value)
  }

  const getDisplayText = () => {
    if (!hasValue) return placeholder
    
    const minText = localMin !== undefined ? `${prefix || ''}${formatNumber(localMin)}${suffix || ''}` : ''
    const maxText = localMax !== undefined ? `${prefix || ''}${formatNumber(localMax)}${suffix || ''}` : ''
    
    if (localMin !== undefined && localMax !== undefined) {
      return `${minText} - ${maxText}`
    } else if (localMin !== undefined) {
      return `≥ ${minText}`
    } else if (localMax !== undefined) {
      return `≤ ${maxText}`
    }
    
    return placeholder
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild disabled={disabled}>
        <div
          className={`text-sm text-muted-foreground w-fit border border-dashed border-border rounded-md h-8 flex items-center justify-center px-3 ${
            disabled ? 'opacity-50 cursor-not-allowed' : ''
          } ${className}`}
        >
          <motion.button
            whileHover={!disabled ? { scale: 1.05 } : {}}
            whileTap={!disabled ? { scale: 0.95 } : {}}
            className='flex items-center gap-2'
            disabled={disabled}
          >
            <div className='flex items-center gap-2 px-2'>
              <FunnelPlus className='w-3 h-3' />
              {hasValue ? label : placeholder}
            </div>
            {hasValue && (
              <div className='flex items-center gap-2'>
                <Separator orientation='vertical' className='h-5 bg-muted-foreground' />
                <div className='flex items-center gap-1'>
                  <div className='bg-muted-foreground text-xs text-white px-2 rounded-md h-5 flex items-center justify-center gap-1'>
                    <span className='text-xs'>{getDisplayText()}</span>
                  </div>
                </div>
              </div>
            )}
          </motion.button>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className='w-64 p-4'>
        <DropdownMenuLabel className='px-0 pb-2'>{label}</DropdownMenuLabel>
        <DropdownMenuSeparator className='mb-4' />
        
        <div className='space-y-4'>
          <div className='grid grid-cols-2 gap-3'>
            <div>
              <label className='text-xs text-muted-foreground mb-1 block'>{minPlaceholder}</label>
              <CustomInputNumber
                value={localMin}
                onValueChange={handleMinChange}
                placeholder={minPlaceholder}
                prefix={prefix}
                suffix={suffix}
                decimalScale={decimalScale}
                isShowController={false}
                className='h-8'
                max={localMax}
              />
            </div>
            <div>
              <label className='text-xs text-muted-foreground mb-1 block'>{maxPlaceholder}</label>
              <CustomInputNumber
                value={localMax}
                onValueChange={handleMaxChange}
                placeholder={maxPlaceholder}
                prefix={prefix}
                suffix={suffix}
                decimalScale={decimalScale}
                isShowController={false}
                className='h-8'
                min={localMin}
              />
            </div>
          </div>

          {validationError && (
            <div className='text-xs text-red-500 mt-2'>
              {validationError}
            </div>
          )}

          <div className='flex gap-2 pt-2'>
            <Button
              size="sm"
              variant="outline"
              onClick={clearFilter}
              disabled={!hasValue}
              className='flex-1 h-7 text-xs'
            >
              Clear
            </Button>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 