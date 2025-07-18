import * as React from 'react'
import { useInView, type UseInViewOptions } from 'motion/react'
import { CopyButton } from '../buttons/copy'
import { cn } from '@/lib/utils'

type CodeEditorProps = Omit<React.ComponentProps<'div'>, 'onCopy'> & {
  children: string
  lang: string
  themes?: {
    light: string
    dark: string
  }
  duration?: number
  delay?: number
  header?: boolean
  dots?: boolean
  icon?: React.ReactNode
  cursor?: boolean
  inView?: boolean
  inViewMargin?: UseInViewOptions['margin']
  inViewOnce?: boolean
  copyButton?: boolean
  writing?: boolean
  title?: string
  onDone?: () => void
  onCopy?: (content: string) => void
}

function CodeEditor({
  children: code,
  lang,
  themes = {
    light: 'dark-plus',
    dark: 'dark-plus'
  },
  duration = 5,
  delay = 0,
  className,
  header = true,
  dots = true,
  icon,
  cursor = false,
  inView = false,
  inViewMargin = '0px',
  inViewOnce = true,
  copyButton = false,
  writing = true,
  title,
  onDone,
  onCopy,
  ...props
}: CodeEditorProps) {
  const editorRef = React.useRef<HTMLDivElement>(null)
  const [visibleCode, setVisibleCode] = React.useState('')
  const [highlightedCode, setHighlightedCode] = React.useState('')
  const [isDone, setIsDone] = React.useState(false)

  const inViewResult = useInView(editorRef, {
    once: inViewOnce,
    margin: inViewMargin
  })
  const isInView = !inView || inViewResult

  React.useEffect(() => {
    if (!visibleCode.length || !isInView) return

    const loadHighlightedCode = async () => {
      try {
        const { codeToHtml } = await import('shiki')

        const highlighted = await codeToHtml(visibleCode, {
          lang: lang === 'json' ? 'json' : lang,
          themes: {
            light: themes.light,
            dark: themes.dark
          },
          defaultColor: 'dark'
        })

        setHighlightedCode(highlighted)
      } catch (e) {
        console.error(`Language "${lang}" could not be loaded.`, e)
      }
    }

    loadHighlightedCode()
  }, [lang, themes, writing, isInView, duration, delay, visibleCode])

  React.useEffect(() => {
    if (!writing) {
      setVisibleCode(code)
      onDone?.()
      return
    }

    if (!code.length || !isInView) return

    const characters = Array.from(code)
    let index = 0
    const totalDuration = duration * 1000
    const interval = totalDuration / characters.length
    let intervalId: NodeJS.Timeout

    const timeout = setTimeout(() => {
      intervalId = setInterval(() => {
        if (index < characters.length) {
          setVisibleCode((prev) => {
            const currentIndex = index
            index += 1
            return prev + characters[currentIndex]
          })
          editorRef.current?.scrollTo({
            top: editorRef.current?.scrollHeight,
            behavior: 'smooth'
          })
        } else {
          clearInterval(intervalId)
          setIsDone(true)
          onDone?.()
        }
      }, interval)
    }, delay * 1000)

    return () => {
      clearTimeout(timeout)
      clearInterval(intervalId)
    }
  }, [code, duration, delay, isInView, writing, onDone])

  return (
    <div
      data-slot='code-editor'
      className={cn(
        'relative bg-black w-full h-[400px] border border-gray-800 overflow-hidden flex flex-col rounded-xl',
        className
      )}
      {...props}
    >
      {header ? (
        <div className='bg-black border-b border-gray-800 relative flex flex-row items-center justify-between gap-y-2 h-10 px-4'>
          {dots && (
            <div className='flex flex-row gap-x-2'>
              <div className='size-2 rounded-full bg-[red]'></div>
              <div className='size-2 rounded-full bg-[yellow]'></div>
              <div className='size-2 rounded-full bg-[green]'></div>
            </div>
          )}

          {title && (
            <div
              className={cn(
                'flex flex-row items-center gap-2',
                dots && 'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'
              )}
            >
              {icon ? (
                <div
                  className='text-gray-400 [&_svg]:size-3.5'
                  dangerouslySetInnerHTML={typeof icon === 'string' ? { __html: icon } : undefined}
                >
                  {typeof icon !== 'string' ? icon : null}
                </div>
              ) : null}
              <figcaption className='flex-1 truncate text-white text-[13px]'>{title}</figcaption>
            </div>
          )}

          {copyButton ? (
            <CopyButton
              content={code}
              size='sm'
              variant='ghost'
              className='-me-2  hover:bg-gray-800 text-white hover:text-white border border-border'
              onCopy={onCopy}
            />
          ) : null}
        </div>
      ) : (
        copyButton && (
          <CopyButton
            content={code}
            size='sm'
            variant='ghost'
            className='absolute right-2 top-2 z-[2]  hover:bg-gray-800 text-white hover:text-white border border-border'
            onCopy={onCopy}
          />
        )
      )}
      <div
        ref={editorRef}
        className='h-[calc(100%-2.75rem)] w-full text-sm p-4 font-mono relative overflow-auto flex-1 text-left'
      >
        <div
          className={cn(
            'text-left [&>pre]:text-left [&_code]:text-left [&>pre,_&_code]:!bg-transparent [&>pre,_&_code]:[background:transparent_!important] [&>pre,_&_code]:border-none [&_code]:!text-[13px] [&>pre]:text-white [&_code]:text-white',
            cursor &&
              !isDone &&
              "[&_.line:last-of-type::after]:content-['|'] [&_.line:last-of-type::after]:animate-pulse [&_.line:last-of-type::after]:inline-block [&_.line:last-of-type::after]:w-[1ch] [&_.line:last-of-type::after]:-translate-px [&_.line:last-of-type::after]:text-white"
          )}
          dangerouslySetInnerHTML={{ __html: highlightedCode }}
        />
      </div>
    </div>
  )
}

export { CodeEditor, type CodeEditorProps }
