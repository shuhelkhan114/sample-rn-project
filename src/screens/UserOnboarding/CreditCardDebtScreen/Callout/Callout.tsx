import { StyleSheet } from 'react-native'
import Block, { BlockProps } from '~/components/Block/Block'
import Typography from '~/components/Typography/Typography'
import { roundToNearest } from '~/core/utils/common'
import { usdFormatter } from '~/core/utils/currency'
import RoundedStarSVG from './RoundedStarSVG'

interface CalloutProps extends BlockProps {
  amount: number
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E0F3E0',
  },
})

function Callout({ amount, ...restProps }: CalloutProps) {
  return (
    <Block pV="xl" pH="xxl" rounded="lg" style={styles.container} {...restProps}>
      <Block flexDirection="row">
        <Block
          mR="xxl"
          width={52}
          height={52}
          rounded="6xl"
          align="center"
          justify="center"
          bgColor="positive">
          <RoundedStarSVG />
        </Block>
        <Block flex1>
          <Typography color="gray700" variation="title6Light">
            You may qualify to save up to{' '}
            <Typography color="primary" variation="title6SemiBold">
              {usdFormatter.format(roundToNearest(amount * 0.3, 10))} -{' '}
              {usdFormatter.format(roundToNearest(amount * 0.4, 10))}
            </Typography>{' '}
            working with our debt relief team
          </Typography>
        </Block>
      </Block>
      <Typography color="gray700" variation="smallLight">
        Our Financial Recovery Team will reach out today.
      </Typography>
    </Block>
  )
}

export default Callout
