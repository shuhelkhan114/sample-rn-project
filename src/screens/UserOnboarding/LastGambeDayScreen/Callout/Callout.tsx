import { useMemo } from 'react'
import { StyleSheet } from 'react-native'
import Block from '~/components/Block/Block'
import Typography from '~/components/Typography/Typography'
import BravoSVG from './BravoSVG/BravoSVG'

interface CalloutProps {
  days: number
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E0F3E0',
  },
})

function Callout({ days }: CalloutProps) {
  const text = useMemo(() => {
    if (days >= 0 && days < 7) {
      return 'Bravo on taking the first steps. Every day is a victory.'
    } else if (days >= 8 && days <= 30) {
      return "You're gaining strength every day. Keep the momentum going."
    } else if (days >= 31 && days <= 60) {
      return "Your resilience is inspiring. Stick with it, you're making great progress."
    } else if (days >= 61 && days <= 90) {
      return 'Remarkable effort!.Your commitment shines brightly'
    } else if (days >= 91 && days <= 180) {
      return 'Incredible. Your journey is a testament to your determination.'
    } else if (days >= 181 && days <= 365) {
      return 'Halfway to a year. Your transformation is truly admirable.'
    } else if (days >= 366) {
      return 'A full year of growth and healing. An extraordinary milestone.'
    }
  }, [days])

  return (
    <Block style={styles.container} pV="xl" pH="xxl" rounded="lg" flexDirection="row">
      <Block
        mR="xxl"
        width={52}
        height={52}
        rounded="6xl"
        bgColor="positive"
        justify="center"
        align="center">
        <BravoSVG />
      </Block>
      <Typography flex1 color="gray700" variation="title6Light">
        {text}
      </Typography>
    </Block>
  )
}

export default Callout
