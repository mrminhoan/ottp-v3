import {
  Sidebar,
  SidebarContent,
  SidebarRail,
  SidebarTrigger,
  useSidebar
} from '@/components/ui/sidebar'
import { TMenu } from '@/models/types'
import { RenderSidebar } from '../render-sidebar'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'

interface IProps {
  routes: Partial<TMenu>
  userInfo?: React.ReactNode
}

function SubSidebar(props: IProps) {
  const { routes, userInfo } = props
  const { open } = useSidebar()

  return (
    <Sidebar collapsible='icon' variant='inset'>
      <div className={`flex items-center mb-4 ${open ? 'justify-end' : 'justify-center'}`}>
        <SidebarTrigger />
      </div>

      <div className='relative overflow-hidden'>
        <AnimatePresence mode="wait">
          {open && (
            <motion.div
              key="user-info-content"
              initial={{
                opacity: 0,
                height: 0,
                scale: 0.95,
                y: -20
              }}
              animate={{
                opacity: 1,
                height: 'auto',
                scale: 1,
                y: 0
              }}
              exit={{
                opacity: 0,
                height: 0,
                scale: 0.95,
                y: -20
              }}
              transition={{
                duration: 0.4,
                ease: [0.4, 0.0, 0.2, 1],
                opacity: { duration: 0.3 },
                scale: { duration: 0.35 },
                height: { duration: 0.4 },
                y: { duration: 0.35 }
              }}
              style={{ willChange: 'transform, opacity, height' }}
            >
              {userInfo}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Separator className='my-4' />

      <SidebarContent className='px-2'>
        <RenderSidebar routes={routes.children} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}

export default SubSidebar
