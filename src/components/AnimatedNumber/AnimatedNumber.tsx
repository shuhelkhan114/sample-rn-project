import { TextStyle } from 'react-native'
// @ts-ignore
import AnimateNumber from 'react-native-countup'
import { usdFormatter } from '~/core/utils/currency'

interface AnimatedNumberProps {
  value: number
  type: 'number' | 'currency'
  style?: TextStyle
}

function AnimatedNumber(props: AnimatedNumberProps) {
  const { value, type, ...restProps } = props

  return (
    <AnimateNumber
      value={value}
      steps={10}
      interval={30}
      timing="easeIn"
      formatter={(val: number) => {
        return type === 'number' ? val : usdFormatter.format(val)
      }}
      {...restProps}
    />
  )
}

export default AnimatedNumber
