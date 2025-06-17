import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Children, cloneElement, isValidElement } from 'react'
import { FieldValues, UseFormReturn } from 'react-hook-form'
import { cn } from '@/lib/utils'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useTranslation } from 'react-i18next'

type TControl = {
  methods: UseFormReturn<FieldValues>
  name?: string
  label?: string
  ref?: any
  disabled?: boolean
}

type TFormItemProps = {
  children: React.ReactElement
  className?: string
} & TControl

function CustomFormItem(props: TFormItemProps) {
  const { methods, name, label, children, ref: refItem, className } = props
  const { t } = useTranslation()

  if (!name) {
    return (
      <div className={cn('', className)}>
        {label && <label className='text-xs font-medium'>{label}</label>}
        <div>
          {Children.map(children, (child) =>
            isValidElement(child)
              ? cloneElement(child as React.ReactElement<any>, {
                  ref: refItem as any,
                  label,
                  disabled: child.props['disabled']
                })
              : child
          )}
        </div>
      </div>
    )
  }

  return (
    <FormField
      control={methods.control}
      name={name}
      render={({ field, fieldState }) => {
        return (
          <FormItem className={cn('', className)}>
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <FormLabel className={cn('text-xs font-medium', fieldState.error && 'text-destructive')}>
                    {label}
                  </FormLabel>
                </TooltipTrigger>
                {fieldState.error && (
                  <TooltipContent className='bg-destructive text-white'>
                    <p>{t(fieldState.error?.message ?? '')}</p>
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
            <FormControl>
              <>
                {Children.map(children, (child) =>
                  isValidElement(child)
                    ? cloneElement(child as React.ReactElement<any>, {
                        ...field,
                        onChange: (...event: any) => {
                          field.onChange?.(...event)
                          if (typeof child.props['onChange'] === 'function') {
                            child.props['onChange'](...event)
                          }
                        },
                        onValueChange: (...event: any) => {
                          field.onChange?.(...event)
                          if (typeof child.props['onValueChange'] === 'function') {
                            child.props['onValueChange'](...event)
                          }
                        },
                        ref: refItem as any,
                        label,
                        disabled: child.props['disabled']
                      })
                    : child
                )}
              </>
            </FormControl>
          </FormItem>
        )
      }}
    />
  )
}

export { CustomFormItem }
