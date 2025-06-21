import { forwardRef, useCallback, useEffect, useState } from 'react'
import { NumericFormat, NumericFormatProps } from 'react-number-format'
import { Input } from '../../input'
import { cn } from '@/lib/utils'

export interface NumberInputProps extends Omit<NumericFormatProps, 'value' | 'onValueChange'> {
  stepper?: number
  thousandSeparator?: string
  placeholder?: string
  defaultValue?: number
  min?: number
  max?: number
  value?: number // Controlled value
  suffix?: string
  prefix?: string
  fixedDecimalScale?: boolean
  decimalScale?: number
  onValueChange?: (value: number | undefined) => void
  isDisabled?: boolean
  isRight?: boolean
  isShowController?: boolean
  className?: string
}

const CustomInputNumber = forwardRef<HTMLInputElement, NumberInputProps>(
  (
    {
      stepper,
      thousandSeparator = ',',
      placeholder,
      defaultValue,
      min = -Infinity,
      max = Infinity,
      onValueChange,
      fixedDecimalScale = false,
      decimalScale = 8,
      suffix,
      prefix,
      value: controlledValue,
      isDisabled,
      isRight = true,
      isShowController = true,
      className,
      ...props
    },
    ref = null
  ) => {
    ref = ref ?? { current: null }

    const [value, setValue] = useState<number | undefined>(controlledValue ?? defaultValue)

    const prefixWithSpace = prefix ? `${prefix} ` : undefined
    const suffixWithSpace = suffix ? ` ${suffix}` : undefined

    const handleIncrement = useCallback(() => {
      setValue((prev) => (prev === undefined ? (stepper ?? 1) : Math.min(Number(prev) + (stepper ?? 1), max)))
    }, [stepper, max])

    const handleDecrement = useCallback(() => {
      setValue((prev) => (prev === undefined ? -(stepper ?? 1) : Math.max(Number(prev) - (stepper ?? 1), min)))
    }, [stepper, min])

    useEffect(() => {
      if (controlledValue !== undefined) {
        setValue(controlledValue)
      }
    }, [controlledValue])

    const handleChange = (values: { floatValue: number | undefined }) => {
      const newValue = values.floatValue === undefined ? undefined : values.floatValue
      if (onValueChange) {
        onValueChange(newValue)
      }
      if (props.onChange) {
        const syntheticEvent = {
          target: {
            value: newValue !== undefined ? String(newValue) : '',
            name: props.name
          }
        } as React.ChangeEvent<HTMLInputElement>

        props.onChange(syntheticEvent)
      }
    }

    return (
      <div className={cn('flex items-center border border-border rounded-md text-xs', className)}>
        {isShowController && (
          <button
            type='button'
            onClick={handleDecrement}
            className='px-3 py-1 placeholder:text-xs placeholder:text-muted-foreground/50 transition-colors border-r border-border'
            aria-label='Decrement button'
          >
            -
          </button>
        )}
        <NumericFormat
          value={value}
          onValueChange={handleChange}
          thousandSeparator={thousandSeparator}
          decimalScale={decimalScale}
          fixedDecimalScale={fixedDecimalScale}
          allowNegative={min < 0}
          valueIsNumericString
          // onBlur={handleBlur}
          // max={1}
          // min={0}
          // prefix={prefixWithSpace}
          // suffix={suffixWithSpace}
          customInput={Input}
          placeholder={placeholder}
          className={`h-8 py-2  [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none relative placeholder-align-right text-center  outline-none focus-visible:outline-none focus-visible:ring-0 placeholder:text-xs placeholder:text-muted-foreground/50 `}
          getInputRef={ref}
          disabled={isDisabled}
          style={{
            fontSize: '0.75rem',
            outline: 'none',
            border: 'none',
            backgroundColor: 'transparent'
          }}
          // onChange={props.onChange}
          // {...props}
        />
        {isShowController && (
          <button
            type='button'
            onClick={handleIncrement}
            className='px-3 py-1 placeholder:text-xs placeholder:text-muted-foreground/50 transition-colors border-l border-border'
            aria-label='Decrement button'
          >
            +
          </button>
        )}
        {suffix && <span className='px-2 text-zinc-500 dark:text-zinc-400 select-none text-xs'>{suffix}</span>}
      </div>
    )
  }
)

export { CustomInputNumber }
