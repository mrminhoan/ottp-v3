import { ReactNode } from 'react'

interface IProps {
  children: ReactNode
}

function SidebarWrapper(props: IProps) {
  const { children } = props

  return (
    <div className='[--header-height:calc(theme(spacing.14))]'>
      <div className='flex flex-col'>{children}</div>
    </div>
  )
}

export default SidebarWrapper
