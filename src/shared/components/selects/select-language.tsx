import { useTranslation } from 'react-i18next'
import { STORAGE_KEY } from '@/constants'
// import { CustomSelectV2 } from './custom-select-v2/custom-select-v2'
import { cn } from '@/lib/utils'
import { CustomSelect } from '@/components/ui/custom/custom-select/custom-select'

interface IProps {
  className?: string
  isShowLabel?: boolean
}

const flag: Record<string, string> = {
  en: 'https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/us.svg',
  ko: 'https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/kr.svg'
}

const languageLabels: Record<string, string> = {
  en: 'English',
  ko: '한국어'
}

function LanguageMenu(props: IProps) {
  const { isShowLabel = false, className } = props
  const langLocal = localStorage.getItem(STORAGE_KEY.I18_NEXT_LNG)
  const { i18n } = useTranslation()

  const setLang = (lang: string) => {
    i18n.changeLanguage(lang)
  }

  return (
    // <div className='relative'>
    <CustomSelect
      value={langLocal || 'en'}
      onValueChange={setLang}
      options={Object.keys(flag).map((key) => ({
        label: (
          <div className='flex items-center gap-2'>
            <img src={flag[key]} alt={key} className='w-6 h-6' />
            {isShowLabel && <span className='text-md'>{languageLabels[key]}</span>}
          </div>
        ),
        value: key
      }))}
      className={cn('flex items-center gap-2 bg-backgrounds w-full', className)}
      classNameContent={'min-w-[11rem]'}
      onChange={(e) => console.log(e)}
    />
    // </div>
  )
}

export default LanguageMenu
