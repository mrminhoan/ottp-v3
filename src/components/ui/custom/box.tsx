interface IProps {
  title?: string
  children: React.ReactNode
}

export default function Box(props: IProps) {
  const { children, title } = props
  return (
    <div className='bg-surface rounded-md p-4 shadow-2xl'>
      <p>{title}</p>
      {children}
    </div>
  )
}
