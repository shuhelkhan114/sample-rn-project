import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useMutation } from '@tanstack/react-query'
import React, { Fragment, useEffect } from 'react'
import { Linking } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Block from '~/components/Block/Block'
import Button from '~/components/Button/Button'
import VerifiedAccountIcon from '~/components/Icons/VerifiedAccountIcon'
import Image from '~/components/Image/Image'
import Link from '~/components/Link/Link'
import ScrollView from '~/components/ScrollView/ScrollView'
import Typography from '~/components/Typography/Typography'
import toast from '~/core/lib/toast'
import API from '~/core/services'
import { usdFormatter } from '~/core/utils/currency'
import useAuth from '~/hooks/useAuth'
import { useConfig } from '~/hooks/useConfig'
import useAppTheme from '~/hooks/useTheme'
import { MainStackScreens, Screens } from '~/navigation/screens'

type ReducedDebtFinalScreenProps = NativeStackScreenProps<
  MainStackScreens,
  Screens.ReducedDebtFinalScreen
>

export type ReducedDebtFinalScreenParams = undefined

function ReducedDebtFinalScreen(props: ReducedDebtFinalScreenProps) {
  const { navigation } = props

  const { top, bottom } = useSafeAreaInsets()
  const { state, refetchProfile } = useAuth()
  const { config } = useConfig()
  const theme = useAppTheme()

  const { mutate: updateProfile } = useMutation({
    mutationFn: API.user.updateProfile,
    onSuccess() {
      refetchProfile()
      navigation.navigate(Screens.ReducedDebtFinalScreen)
    },
    onError() {
      toast.error('Error', 'Failed to update form, please try again!')
    },
  })

  useEffect(() => {
    updateProfile({ debt_onboarding_done: true })
  }, [])

  const financialManager = config?.financial_manager

  let content: React.ReactNode = null

  if (financialManager) {
    content = (
      <Fragment>
        <Block flexDirection="row" mT="xl" justify="space-between">
          <Block rounded="lg" shadow="sm" bgColor="white" flex1 mR="md">
            <Block relative>
              <Image
                height={160}
                source={require('~/assets/randall.png')}
                imageStyle={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
              />
              <Block absolute bottom={8} left={8} flexDirection="row" align="center">
                <VerifiedAccountIcon fill={theme.colors.white} width={16} height={16} />
                <Typography color="white" variation="smallRegular" pL="sm">
                  Verified
                </Typography>
              </Block>
            </Block>
            <Block pV="lg" pH="md">
              <Typography mR="auto" variation="paragraphBold" mB="sm">
                Daniel
              </Typography>
              <Typography color="gray700" variation="descriptionRegular">
                Financial Manager
              </Typography>
            </Block>
          </Block>

          <Block rounded="lg" shadow="sm" bgColor="white" flex1 mL="md">
            <Block relative>
              <Image
                height={160}
                source={require('~/assets/daniel.png')}
                imageStyle={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
              />
              <Block absolute bottom={8} left={8} flexDirection="row" align="center">
                <VerifiedAccountIcon fill={theme.colors.white} width={16} height={16} />
                <Typography color="white" variation="smallRegular" pL="sm">
                  Verified
                </Typography>
              </Block>
            </Block>
            <Block pV="lg" pH="md">
              <Typography mR="auto" variation="paragraphBold" mB="sm">
                Randall
              </Typography>
              <Typography color="gray700" variation="descriptionRegular">
                Financial Manager
              </Typography>
            </Block>
          </Block>
        </Block>

        {/* <Block>
          <Typography mT="xxxl" variation="descriptionSemiBold">
            About {financialManager.name}
          </Typography>
          <Typography variation="descriptionRegular" mT="md">
            {financialManager.about}
          </Typography>
          <Typography variation="descriptionRegular" mT="md">
            Josh will reach out to your within 24 hours.
          </Typography>
        </Block> */}
        <Block>
          <Typography mT="xxxl" variation="paragraphSemiBold">
            We&apos;ll be calling you by the end of today!
          </Typography>
          <Typography variation="paragraphLight" mT="md">
            We help client understanding their current difficulties and developing effective
            strategies and solutions.
          </Typography>
        </Block>
      </Fragment>
    )
  } else {
    content = (
      <Typography mT="xxxl">
        Thanks for filling in the details, Someone from Yume will reach out to you. If not please
        drop an email at{' '}
        <Link
          color="primary"
          variation="descriptionSemiBold"
          onPress={async () =>
            Linking.openURL(
              `mailto:rehan@yu-me.us?subject=Help me sort out my debt!&body=Please review my answers and review my details. I need help!. My username is '${state.user?.user_name}'`
            )
          }>
          rehan@yu-me.us
        </Link>
      </Typography>
    )
  }

  return (
    <Block flex1 pH="xl" style={{ paddingTop: top, paddingBottom: bottom }}>
      <ScrollView>
        <Block mT="xl" align="center">
          <Block
            width={92}
            height={92}
            align="center"
            justify="center"
            bgColor="gray100"
            style={{ borderRadius: 92 }}>
            <Image size={49} source={require('~/assets/success_party.png')} />
          </Block>

          <Typography center mT="md" color="gray800" variation="paragraphLight">
            We Believe We can help you save
          </Typography>
          <Typography mT="sm" mB="lg" variation="title4SemiBold">
            {usdFormatter.format((state.user?.debt?.totalDebtAmount || 0) * 0.4)} -{' '}
            {usdFormatter.format((state.user?.debt?.totalDebtAmount || 0) * 0.5)}
          </Typography>
        </Block>

        {content}
        <Button
          mT="xxxl"
          variation="tertiary"
          title="Go to home"
          onPress={() => navigation.navigate(Screens.HomeScreen)}
        />
      </ScrollView>
    </Block>
  )
}

export default ReducedDebtFinalScreen
