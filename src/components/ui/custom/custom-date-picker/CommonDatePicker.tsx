import {
  createCustomTheme,
  Datepicker as DatePicker,
  localeEn,
  localeJa,
  localeKo,
  localeTh,
  localeZh
} from '@mobiscroll/datepicker-react'
import './CommonDatePicker.css'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import './DatePickerCustomTheme.scss'

createCustomTheme('custom-theme', 'ios')
createCustomTheme('custom-theme-dark', 'ios')

const LOCALE = {
  ko: localeKo,
  en: localeEn,
  zh: localeZh,
  th: localeTh,
  ja: localeJa
}

const RootPicker = ({ size = 'medium', inputProps = {}, ...props }) => {
  const { t } = useTranslation()
  const { i18n } = useTranslation()

  return (
    <DatePicker
      // themeVariant={theme.mode}
      // theme='custom-theme'
      // timeFormat={DATE_TIME_FORMAT.TIME}
      inputStyle='outline'
      dateFormat={'DD-MM-YYYY'}
      timeFormat='HH:mm'
      timeWheels='HH:mm'
      locale={LOCALE['en']}
      placeholder={'Select Date'}
      inputProps={{
        ...inputProps,
        style: {
          minWidth: '19rem',
          fontSize: '0.875rem',
          height: '2rem',
          borderRadius: '5px',
          borderWidth: '1px',
          borderColor: 'var(--border)'
        }
      }}
      {...props}
    />
  )
}

const RangeDate = (props) => <RootPicker select={'range'} controls={['calendar']} {...props} />
const RangeDateTime = (props) => <RootPicker select={'range'} controls={['calendar', 'time']} {...props} />
const Date = (props) => <RootPicker select={'date'} controls={['calendar']} {...props} />
const DateTime = (props) => <RootPicker select={'date'} controls={['calendar', 'time']} {...props} />
const ExtendedRangeDateTime = (props) => <RootPicker select={'range'} controls={['time']} {...props} />

const CommonDatePicker = {
  RangeDate,
  RangeDateTime,
  Date,
  DateTime,
  ExtendedRangeDateTime
}

export default CommonDatePicker

RootPicker.propTypes = {
  size: PropTypes.oneOf(['small', 'medium']),
  inputProps: PropTypes.object
}
