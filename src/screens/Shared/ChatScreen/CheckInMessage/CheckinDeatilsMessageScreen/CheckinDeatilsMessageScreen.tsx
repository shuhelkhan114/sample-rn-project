import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useQuery } from '@tanstack/react-query'
import { useContext, useEffect, useState } from 'react'
import { ActivityIndicator } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Block from '~/components/Block/Block'
import ErrorText from '~/components/ErrorText/ErrorText'
import Typography from '~/components/Typography/Typography'
import { ConfigContext } from '~/context/ConfigContext'
import { moodOptions } from '~/core/config/options'
import API from '~/core/services'
import useAuth from '~/hooks/useAuth'

import { MainStackScreens, Screens } from '~/navigation/screens'
import { Addiction } from '~/typings/addiction'

type CheckinDetailsMessageScreenProps = NativeStackScreenProps<
  MainStackScreens,
  Screens.CheckinDetailsMessageScreen
>

export type CheckinDetailsMessageScreenParams = {
  id: string
}

const CheckinDetailsMessageScreen: React.FC<CheckinDetailsMessageScreenProps> = (props) => {
  const { route } = props
  const { id } = route.params
  const { config } = useContext(ConfigContext)
  const [lastCheckInAddiction, setLastCheckInAddiction] = useState<Addiction>()
  const { currentUser } = useAuth()

  const {
    isPending: fetchingCheckIns,
    error: fetchingCheckInsError,
    data: checkins,
  } = useQuery({
    queryKey: ['checkins', id],
    queryFn: async () => {
      if (currentUser.role === 'user') {
        return await API.user.getCheckins(id)
      } else {
        return await API.recoveryCoach.getCheckins(id)
      }
    },
  })

  useEffect(() => {
    if (config && checkins) {
      const lastCheckInAddiction = config.addictions.filter(
        (item) => item.id === checkins?.addiction_id
      )[0]
      setLastCheckInAddiction(lastCheckInAddiction)
    }
  }, [config, checkins])

  let content: React.ReactNode = null

  if (fetchingCheckIns) {
    content = <ActivityIndicator />
  } else if (fetchingCheckInsError) {
    content = <ErrorText error={fetchingCheckInsError} />
  } else if (checkins) {
    content = (
      <ScrollView>
        <Block pH="xxxl">
          {lastCheckInAddiction && (
            <Block flexDirection="column">
              <Typography variation="paragraphSemiBold" mB="xl">
                {lastCheckInAddiction.name}
              </Typography>
              {lastCheckInAddiction.name.toLocaleLowerCase() === 'anxiety & depression' ? (
                <Typography variation="paragraphRegular" mB="xl">
                  Have you experienced anxiety or depression since your last check in?
                </Typography>
              ) : (
                <Typography variation="paragraphRegular" mB="xl">
                  Have you experienced a relapse today or since your last checkin?
                </Typography>
              )}
              <Typography color="primary" variation="paragraphSemiBold">
                {checkins?.relapse ? 'Yes' : 'No'}
              </Typography>
            </Block>
          )}

          <Block mT="xxxl" flexDirection="column">
            <Typography variation="paragraphRegular" mT="sm">
              Were you honest with yourself today?
            </Typography>
            <Typography color="primary" variation="paragraphSemiBold">
              {checkins?.honest ? 'Yes' : 'No'}
            </Typography>
          </Block>

          {lastCheckInAddiction?.name.toLocaleLowerCase() !== 'anxiety & depression' && (
            <Block mT="xxxl" flexDirection="column">
              <Typography variation="paragraphRegular" mT="sm">
                Did you experience an urge today?
              </Typography>
              <Typography color="primary" variation="paragraphSemiBold">
                {checkins?.urge ? 'Yes' : 'No'}
              </Typography>
            </Block>
          )}

          <Block mT="xxxl" flexDirection="column">
            <Typography variation="paragraphRegular" mT="sm">
              How is your mood today?
            </Typography>
            <Typography color="primary" variation="paragraphSemiBold">
              {moodOptions.find((mood) => mood.value === checkins.mood)?.label || checkins.mood}
            </Typography>
          </Block>

          <Block mT="xxxl" flexDirection="column">
            <Typography variation="paragraphRegular" mT="sm">
              What is one thing you are thankful for today?{' '}
              <Typography color="gray500" variation="paragraphRegular">
                (optional)
              </Typography>
            </Typography>

            <Typography color="primary" variation="paragraphSemiBold">
              {checkins?.thankfull_notes}
            </Typography>
          </Block>

          <Block mT="xxxl" flexDirection="column">
            <Typography variation="paragraphRegular" mT="sm">
              Would you like to say anything to your addiction today?{' '}
              <Typography color="gray500" variation="paragraphRegular">
                (optional)
              </Typography>
            </Typography>
            <Typography color="primary" variation="paragraphSemiBold">
              {checkins?.addiction_notes}
            </Typography>
          </Block>

          <Block mV="xxxl" flexDirection="column">
            <Typography variation="paragraphRegular" mT="sm">
              Would you like to share anything else?{' '}
              <Typography color="gray500" variation="paragraphRegular">
                (optional)
              </Typography>
            </Typography>
            <Typography color="primary" variation="paragraphSemiBold">
              {checkins?.other_notes}
            </Typography>
          </Block>
        </Block>
      </ScrollView>
    )
  }

  return (
    <Block flex1 pB="9xl">
      <Typography pH="xxxl" pV="xxxl" variation="title5SemiBold">
        Check-In Details:
      </Typography>
      {content}
    </Block>
  )
}

export default CheckinDetailsMessageScreen
