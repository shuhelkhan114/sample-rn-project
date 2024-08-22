import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { ChevronLeft } from 'react-native-feather'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Block from '~/components/Block/Block'
import Typography from '~/components/Typography/Typography'
import useAppTheme from '~/hooks/useTheme'

interface NavigationBarProps {
  title?: string
  arrow?: boolean
  center?: boolean
  description?: string
  button?: boolean
  disableButton?: boolean
  onPressButton?: () => void
  buttonTitle?: string | React.ReactNode
}

const NavigationBar: React.FC<NavigationBarProps> = (props) => {
  const {
    title,
    arrow = true,
    center,
    description,
    buttonTitle,
    disableButton,
    onPressButton,
  } = props

  const navigation = useNavigation()
  const theme = useAppTheme()
  const { top } = useSafeAreaInsets()

  return (
    <Block pH="xl" style={{ paddingTop: top }}>
      <Block flexDirection="row" align="center" pV="xl">
        {arrow ? (
          <Block mR="xl" absolute={center} left={0} zIndex={10} onPress={() => navigation.goBack()}>
            <ChevronLeft fontSize={24} color={theme.colors.gray900} />
          </Block>
        ) : null}
        <Block flex1>
          {title && (
            <Typography color="black" center={!!center} variation="title5SemiBold">
              {title}
            </Typography>
          )}
          {description && <Typography color="black">{description}</Typography>}
        </Block>
        {buttonTitle && (
          <Block
            pV="xl"
            right={0}
            zIndex={10}
            absolute={center}
            onPress={onPressButton}
            opacity={disableButton ? 0.5 : 1}>
            {typeof buttonTitle === 'string' ? (
              <Typography color="primary" variation="descriptionSemiBold">
                {buttonTitle}
              </Typography>
            ) : (
              buttonTitle
            )}
          </Block>
        )}
      </Block>
    </Block>
  )
}
export default NavigationBar
