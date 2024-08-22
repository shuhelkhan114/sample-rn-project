import { StyleSheet } from 'react-native'
import Toast, { ToastConfig } from 'react-native-toast-message'
import Block from '~/components/Block/Block'
import CircularCheckIcon from '~/components/Icons/CircularCheckIcon'
import CircularIIcon from '~/components/Icons/CircularIIcon'
import CircularXIcon from '~/components/Icons/CircularXIcon'
import Link from '~/components/Link/Link'
import Typography from '~/components/Typography/Typography'
import useAppTheme from '~/hooks/useTheme'

const styles = StyleSheet.create({
  container: {
    width: '90%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
})

const toastConfig: ToastConfig = {
  success: (props) => {
    const { text1, text2, props: additionalProps } = props
    const { actionText, actionOnPress } = additionalProps || {}
    const theme = useAppTheme()

    return (
      <Block
        flex1
        pH="xl"
        rounded="xl"
        align="center"
        bgColor="white"
        flexDirection="row"
        justify="space-between"
        style={styles.container}>
        <Block width={actionText ? '80%' : '100%'} flexDirection="row" align="center">
          <CircularCheckIcon fill={theme.colors.positive} />
          <Block mL="lg" pT="md" pB="lg">
            <Typography numberOfLines={1} color="gray800" variation="paragraphSemiBold">
              {text1}
            </Typography>
            <Typography
              lineHeight={0}
              color="gray600"
              numberOfLines={2}
              variation="descriptionRegular">
              {text2}
            </Typography>
          </Block>
        </Block>
        {actionText ? (
          <Link color="primary" variation="descriptionRegular" onPress={actionOnPress}>
            {actionText}
          </Link>
        ) : null}
      </Block>
    )
  },

  error: (props) => {
    const { text1, text2, props: additionalProps } = props
    const { actionText, actionOnPress } = additionalProps || {}
    const theme = useAppTheme()

    return (
      <Block
        pH="xl"
        rounded="xl"
        align="center"
        bgColor="white"
        flexDirection="row"
        justify="space-between"
        style={styles.container}>
        <Block flexDirection="row" align="center" flex1>
          <CircularXIcon fill={theme.colors.negative} />
          <Block mL="lg" pT="md" pB="lg">
            <Typography color="gray800" variation="paragraphSemiBold">
              {text1}
            </Typography>
            <Typography
              lineHeight={0}
              color="gray600"
              numberOfLines={2}
              variation="descriptionRegular">
              {text2}
            </Typography>
          </Block>
        </Block>
        <Block mL="xl">
          {actionText ? (
            <Link color="primary" variation="descriptionRegular" onPress={actionOnPress}>
              {actionText}
            </Link>
          ) : null}
        </Block>
      </Block>
    )
  },
  show: (props) => {
    const { text1, text2, props: additionalProps } = props
    const { actionText, actionOnPress } = additionalProps || {}
    const theme = useAppTheme()

    const handelActionOnPress = () => {
      actionOnPress?.()
      Toast.hide()
    }

    return (
      <Block
        flex1
        pH="xl"
        rounded="xl"
        align="center"
        bgColor="white"
        flexDirection="row"
        justify="space-between"
        style={styles.container}>
        <Block width="80%" flexDirection="row" align="center">
          <CircularIIcon fill={theme.colors.neutral} />
          <Block mL="lg" pT="md" pB="lg">
            <Typography color="gray800" variation="paragraphSemiBold">
              {text1}
            </Typography>
            <Typography lineHeight={0} color="gray600" variation="descriptionRegular">
              {text2}
            </Typography>
          </Block>
        </Block>
        {actionText ? (
          <Link color="primary" variation="descriptionRegular" onPress={actionOnPress}>
            {actionText}
          </Link>
        ) : (
          <Link color="primary" variation="descriptionRegular" onPress={handelActionOnPress}>
            Okay
          </Link>
        )}
      </Block>
    )
  },
}

export default toastConfig
