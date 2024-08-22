import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React from 'react'
import Block from '~/components/Block/Block'
import NavigationBar from '~/components/NavigationBar/NavigationBar'
import ScrollView from '~/components/ScrollView/ScrollView'
import Typography from '~/components/Typography/Typography'
import useAuth from '~/hooks/useAuth'
import RecoveryCoachCard from '~/models/message/SingleRecoveryCoachCard'
import UserCard from '~/modules/Cards/UserCard'
import { MainStackScreens, Screens } from '~/navigation/screens'

type GetHelpScreenProps = NativeStackScreenProps<MainStackScreens, Screens.GetHelpScreen>

export type GetHelpScreenParams = undefined

const GetHelpScreen: React.FC<GetHelpScreenProps> = (props) => {
  const { state } = useAuth()

  const recoveryCoach = state.user?.recovery_coach

  return (
    <Block flex1>
      <NavigationBar title="SOS" />
      <ScrollView>
        <Block pH="xxxl" mT="xl">
          <Typography variation="paragraphSemiBold" mB="md">
            Talk to a verified recovery coach
          </Typography>
          <Typography color="gray700" variation="descriptionRegular" mB="md">
            Reach out to a verified recovery coach. They&apos;ve been there, ready to guide and
            support. You&apos;re not alone on this journey.
          </Typography>

          <Typography variation="paragraphSemiBold" mT="lg">
            Reached by you before
          </Typography>

          <RecoveryCoachCard
            id={recoveryCoach?.id as string}
            name={recoveryCoach?.name as string}
            image={recoveryCoach?.user_image as string}
            isOnline={false}
            soberness={recoveryCoach?.soberness as string}
            addictions={[
              ...new Set(
                (recoveryCoach?.addictions || [])?.map((addition) => addition.description)
              ),
            ]}
          />
        </Block>

        <Block pH="xxxl" pV="xl">
          <Typography variation="paragraphSemiBold">Post to Community</Typography>
          <Typography color="gray700" variation="paragraphRegular" mB="md">
            Reach out to the community.
          </Typography>
          <UserCard />
        </Block>
      </ScrollView>
    </Block>
  )
}

export default GetHelpScreen
