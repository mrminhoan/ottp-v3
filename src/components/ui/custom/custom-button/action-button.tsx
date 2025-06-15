import * as React from 'react'
import { Trash2, Search, Filter, XCircle, CheckCircle2 } from 'lucide-react'
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'
import { VariantProps } from 'class-variance-authority'
import { buttonVariants } from '../../button'
import { CustomButton } from './button'

type ActionType = 'search' | 'filter' | 'delete' | 'cancel' | 'approve'

interface ActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  action: ActionType
  variant?: VariantProps<typeof buttonVariants>['variant']
  size?: VariantProps<typeof buttonVariants>['size']
  loading?: boolean
  disabled?: boolean
}

const actionMap: Record<ActionType, { icon: React.ElementType; label: string }> = {
  search: { icon: Search, label: 'Search' },
  filter: { icon: Filter, label: 'Filter' },
  delete: { icon: Trash2, label: 'Delete' },
  cancel: { icon: XCircle, label: 'Cancel' },
  approve: { icon: CheckCircle2, label: 'Approve' }
}

const variantMap: Record<ActionType, VariantProps<typeof buttonVariants>['variant']> = {
  search: 'default',
  filter: 'secondary',
  delete: 'destructive',
  cancel: 'cancel',
  approve: 'success'
}

export const ActionButton = React.forwardRef<HTMLButtonElement, ActionButtonProps>(
  ({ action, variant, size = 'icon', loading, disabled, ...props }, ref) => {
    const { icon: Icon, label } = actionMap[action]
    const finalVariant = variant ?? variantMap[action]

    return (
      <TooltipProvider>
        <Tooltip delayDuration={200}>
          <TooltipTrigger asChild>
            <CustomButton
              ref={ref}
              variant={finalVariant}
              size={size}
              loading={loading}
              disabled={disabled}
              icon={Icon}
              {...props}
            />
          </TooltipTrigger>
          <TooltipContent>{label}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }
)

ActionButton.displayName = 'ActionButton'
