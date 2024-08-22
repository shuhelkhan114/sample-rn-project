import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useQuery } from '@tanstack/react-query'
import { ScrollView } from 'react-native-gesture-handler'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Block from '~/components/Block/Block'
import Button from '~/components/Button/Button'
import VerifiedAccountIcon from '~/components/Icons/VerifiedAccountIcon'
import Image from '~/components/Image/Image'
import NavigationBar from '~/components/NavigationBar/NavigationBar'
import Typography from '~/components/Typography/Typography'
import API from '~/core/services'
import useAuth from '~/hooks/useAuth'
import { AuthStackScreens } from '~/navigation/AuthStack'
import { Screens } from '~/navigation/screens'

type RecoveryCoachPublicViewScreenProps = NativeStackScreenProps<
  AuthStackScreens,
  Screens.RecoveryCoachPublicViewScreen
>

export type RecoveryCoachPublicViewScreenParams = undefined

const RecoveryCoachPublicViewScreen: React.FC<RecoveryCoachPublicViewScreenProps> = (props) => {
  const { bottom } = useSafeAreaInsets()

  const { refetchProfile } = useAuth()

  const { data } = useQuery({
    queryFn: API.recoveryCoach.fetchProfile,
    queryKey: ['recovery-coach/profile'],
  })

  const handleAgree = () => {
    refetchProfile()
  }

  return (
    <Block flex1 style={{ paddingBottom: bottom }}>
      <NavigationBar />

      <ScrollView>
        <Block mH="5xl">
          <Block>
            <Typography center variation="title5SemiBold">
              Public view
            </Typography>
            <Typography center mT="md" variation="descriptionRegular" color="gray700">
              Here&apos;s how your profile will appear to all patients following a recommendation.
            </Typography>
          </Block>

          <Block mV="xl" bW={1} bC="gray100" rounded="xl" bgColor="white" shadow="sm">
            <Block relative>
              <Block zIndex={10} absolute bottom={4} right={8} flexDirection="row" align="center">
                <VerifiedAccountIcon width={16} height={16} fill="#fff" />
                <Typography mL="sm" color="white" variation="smallRegular">
                  Verified
                </Typography>
              </Block>
              <Block justify="center" align="center">
                <Image width={200} height={200} uri={data?.user_image} />
              </Block>
            </Block>
            <Block pH="xxl" pB="xxl" pT="md">
              <Block>
                <Typography variation="paragraphSemiBold">{data?.name}</Typography>
              </Block>

              <Block>
                <Typography mR="sm" variation="descriptionRegular" flex1>
                  {data?.parent_addictions.map((addiction) => addiction.name).join(', ')}
                </Typography>
              </Block>
            </Block>
          </Block>
          {data?.bio && (
            <Block>
              <Typography variation="title5SemiBold">My Story 🍀</Typography>
              <Typography mT="xl" variation="descriptionRegular" color="gray700">
                {data?.bio}
              </Typography>
            </Block>
          )}
        </Block>
      </ScrollView>
      <Block mH="xl" mT="4xl">
        <Button title="Finish" onPress={handleAgree} />
      </Block>
    </Block>
  )
}

export default RecoveryCoachPublicViewScreen
