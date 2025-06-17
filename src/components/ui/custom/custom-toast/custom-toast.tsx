import { toast, type ExternalToast } from 'sonner'

type CustomToastProps = {
  title?: (() => React.ReactNode) | React.ReactNode
  description?: (() => React.ReactNode) | React.ReactNode
  options?: ExternalToast
  onClose?: () => void
} & Partial<ExternalToast>

const DEFAULT_TOAST_OPTIONS: ExternalToast = {
  duration: 3000,
  closeButton: true,
  dismissible: true,
  richColors: true,
  position: 'top-right'
}

export class CustomToastClass {
  private mergeOptions(props: CustomToastProps) {
    const { options, onClose, description, title, icon, ...rest } = props
    // console.log('🚀 ~ CustomToast ~ props:', props)
    const action = {
      label: 'View',
      actionButtonStyle: {
        backgroundColor: 'black',
        color: '#fff',
        padding: '10px 20px'
      }
    }
    return {
      ...DEFAULT_TOAST_OPTIONS,
      ...options,
      ...action,
      description: typeof description === 'function' ? description() : description,
      title: typeof title === 'function' ? title() : title,
      onDismiss: (toastData) => {
        options?.onDismiss?.(toastData)
        onClose?.()
      },
      ...rest
    }
  }
  success(props: CustomToastProps) {
    toast.success(props.description, {
      ...this.mergeOptions(props),
      icon: '✅',
      // style: { background: '#dcfce7' }
      style: {
        background: 'linear-gradient(to right, #bbf7d0, #86efac)',
        color: '#065f46'
      }
    })
  }
  error(props: CustomToastProps) {
    toast.error(props.description, {
      ...this.mergeOptions(props),
      icon: '🔴',
      // style: { background: '#fee2e2' }
      style: {
        background: 'linear-gradient(to right, #fecaca, #f87171)',
        color: '#7f1d1d'
      }
    })
  }
  info(props: CustomToastProps) {
    toast.info(props.description, {
      ...this.mergeOptions(props),
      // style: { background: '#dbeafe' }
      style: {
        background: 'white',
        color: 'black',
        gap: '10px'
      },
      closeButton: false,
      icon: <img src={'/images/tether.svg'} alt='info' className='w-4 h-4' />
    })
  }
  warning(props: CustomToastProps) {
    toast.warning(props.description, {
      style: {
        background: 'linear-gradient(to right, #fef9c3, #fde68a)',
        color: '#92400e'
      },
      ...this.mergeOptions(props)
      // icon: '⚠️',
    })
  }
  loading(props: CustomToastProps) {
    toast.loading(props.description, {
      ...this.mergeOptions(props),

      style: {
        background: 'white',
        color: 'black'
      }
    })
  }

  custom(props: CustomToastProps & { id?: string | number; render: (id: string | number) => React.ReactElement }) {
    const id = toast.custom(
      (tId) => {
        return props.render(tId)
      },
      {
        ...DEFAULT_TOAST_OPTIONS,
        ...props.options,
        ...this.mergeOptions(props),
        id: props.id,
        onDismiss: (toastData) => {
          props.options?.onDismiss?.(toastData)
          props.onClose?.()
        }
      }
    )

    return id
  }
}

export const CustomToast = new CustomToastClass()
