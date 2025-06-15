import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'

export default function ErrorPage() {
  const navigate = useNavigate()
  return (
    <main className='min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center px-4 py-8 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8'>
        <div>
          {/* <img className='mx-auto h-12 w-auto' src='/placeholder.svg' alt='Cloudflare' /> */}
          <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-gray-100'>
            Oops! Something went wrong.
          </h2>
          <p className='mt-2 text-center text-sm text-gray-600 dark:text-gray-400'>
            We've encountered a server error (500). Our team has been notified and is working to resolve the issue.
          </p>
        </div>
        <div className='mt-6 grid grid-cols-1 gap-2'>
          <Button
            type='button'
            className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            onClick={() => navigate('/')}
          >
            Go to Homepage
          </Button>
          <Button
            type='button'
            className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
          >
            Contact Support
          </Button>
        </div>
        {/* <div className='mt-6 text-center'>
          <ServerIcon className='h-24 w-24 mx-auto text-gray-400 dark:text-gray-500' />
          <p className='mt-2 text-sm text-gray-600 dark:ˀtext-gray-400'>
            While we're fixing the issue, you can try clearing your browser cache or try again later.
          </p>
        </div> */}
      </div>
    </main>
  )
}

// function ServerIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns='http://www.w3.org/2000/svg'
//       width='24'
//       height='24'
//       viewBox='0 0 24 24'
//       fill='none'
//       stroke='currentColor'
//       strokeWidth='2'
//       strokeLinecap='round'
//       strokeLinejoin='round'
//     >
//       <rect width='20' height='8' x='2' y='2' rx='2' ry='2' />
//       <rect width='20' height='8' x='2' y='14' rx='2' ry='2' />
//       <line x1='6' x2='6.01' y1='6' y2='6' />
//       <line x1='6' x2='6.01' y1='18' y2='18' />
//     </svg>
//   )
// }
