import { StyleSheet } from 'react-native'
import Block, { BlockProps } from '~/components/Block/Block'
import Typography from '~/components/Typography/Typography'
import RoundedStarSVG from './RoundedStarSVG'

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
        align="center"
        justify="center"
        bgColor="positive">
        <RoundedStarSVG />
      </Block>
      <Block flex1>
        <Typography color="gray700" variation="title6Light">
          We&apos;ll show G/A and Smart Meetings Near you
        </Typography>
      </Block>
    </Block>
  )
}

export default Callout
