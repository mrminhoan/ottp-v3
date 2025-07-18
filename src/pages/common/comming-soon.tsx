import { useState, useEffect } from 'react'

export default function ComingSoonPage() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })
  const [email, setEmail] = useState('')
  useEffect(() => {
    const launchDate = new Date('2024-12-31T00:00:00')
    const interval = setInterval(() => {
      const now = new Date().getTime()
      const distance = launchDate.getTime() - now
      if (distance < 0) {
        clearInterval(interval)
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        })
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24))
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((distance % (1000 * 60)) / 1000)
        setTimeLeft({ days, hours, minutes, seconds })
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [])
  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }
  const handleNotifyMe = (e) => {
    e.preventDefault()
    console.log('Notify me with email:', email)
  }
  return (
    <div className='flex flex-col items-center justify-center min-h-[50dvh] bg-background px-4 md:px-6'>
      <div className='max-w-xl text-center space-y-4'>
        <div className='mx-auto w-fit'>
          <img
            src='/images/logo.png'
            width={150}
            alt='Coming Soon'
            className='rounded-lg'
            style={{ aspectRatio: '400/300', objectFit: 'cover' }}
          />
        </div>
        <h1 className='text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl'>Coming Soon</h1>
        <p className='text-muted-foreground md:text-xl'>
          We're working hard to bring you something amazing. Stay tuned for our launch!
        </p>
      </div>
    </div>
  )
}
