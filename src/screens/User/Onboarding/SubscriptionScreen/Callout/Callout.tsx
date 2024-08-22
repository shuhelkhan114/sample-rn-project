import { StyleSheet } from 'react-native'
import Block, { BlockProps } from '~/components/Block/Block'
import Typography from '~/components/Typography/Typography'
import CashSVG from '../CashSVG/CashSVG'

interface CalloutProps extends BlockProps {}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E0F3E0',
  },
})

function Callout(props: CalloutProps) {
  return (
    <Block style={styles.container} pV="xl" pH="xxl" rounded="lg" flexDirection="row" {...props}>
      <Block
        mR="xxl"
        width={52}
        height={52}
        rounded="6xl"
        bgColor="positive"
        justify="center"
        align="center">
        <CashSVG />
      </Block>
      <Block flex1>
        <Typography color="gray800" variation="title5SemiBold">
          Money Back Guarantee
        </Typography>
        <Typography color="gray700" variation="title6Light">
          If you feel like you are not progressing in 30 days, we&apos;ll give you a full refund.
        </Typography>
      </Block>
    </Block>
  )
}

export default Callout
