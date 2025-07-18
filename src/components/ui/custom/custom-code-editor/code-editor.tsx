import React from 'react'
import { CodeEditor } from '@/components/animate-ui/components/code-editor'
import { cn } from '@/lib/utils'

// Helper function to format JSON data for display
const formatJsonForDisplay = (data: any): string => {
  if (typeof data === 'object' && data !== null) {
    return JSON.stringify(data, null, 2)
  }
  return String(data)
}

interface IProps {
  data: any
  title?: string
  showCodeEditor?: boolean
  showKeyValueList?: boolean
  className?: string
  codeEditorProps?: {
    className?: string
    height?: string
  }
}

// Component to display formatted JSON data
const CustomCodeEditor: React.FC<IProps> = ({
  data,
  title = 'JSON',
  showCodeEditor = true,
  showKeyValueList = true,
  className,
  codeEditorProps = {}
}) => {
  const formattedJson = formatJsonForDisplay(data)

  return (
    <div className={cn('space-y-4 w-full', className)}>
      {/* JSON Code Editor Display */}
      {showCodeEditor && (
        <CodeEditor
          lang='json'
          title={title}
          copyButton={true}
          writing={false}
          header={true}
          className={cn('w-full h-full min-h-[200px]', codeEditorProps.className)}
          style={codeEditorProps.height ? { height: codeEditorProps.height } : undefined}
        >
          {formattedJson}
        </CodeEditor>
      )}
    </div>
  )
}

export { CustomCodeEditor, formatJsonForDisplay }
