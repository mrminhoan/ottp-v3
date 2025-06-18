import { NumericFormat, NumericFormatProps } from 'react-number-format'

const CustomFormatNumber = ({ value, suffix = '', ...props }: NumericFormatProps) => {
  const formattedValue = !value ? 0 : value
  return (
    <NumericFormat
      value={formattedValue}
      displayType='text'
      thousandSeparator
      suffix={`${suffix}`}
      decimalScale={props.decimalScale || 0}
      {...props}
    />
  )
}

const CustomFormatMoneyTether = ({ value, ...props }: NumericFormatProps) => {
  const formattedValue = !value ? 0 : value
  return <NumericFormat value={formattedValue} displayType='text' thousandSeparator suffix='T' decimalScale={0} />
}

export { CustomFormatNumber, CustomFormatMoneyTether }
