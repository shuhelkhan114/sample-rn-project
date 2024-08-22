import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React from 'react'
import { ChevronLeft } from 'react-native-feather'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Block from '~/components/Block/Block'
import ScrollView from '~/components/ScrollView/ScrollView'
import Typography from '~/components/Typography/Typography'
import { moodOptions } from '~/core/config/options'
import useAppTheme from '~/hooks/useTheme'
import { MainStackScreens, Screens } from '~/navigation/screens'
import { CheckIn } from '~/typings/checkin'

const getYesNo = (value: boolean) => {
  return value ? 'Yes' : 'No'
}

type CheckInDetailScreenProps = NativeStackScreenProps<
  MainStackScreens,
  Screens.CheckInDetailScreen
>

export type CheckInDetailScreenParams = {
  checkIn: CheckIn
}

const CheckInDetailScreen: React.FC<CheckInDetailScreenProps> = (props) => {
  const { navigation, route } = props
  const { checkIn } = route.params

  const theme = useAppTheme()
  const { top } = useSafeAreaInsets()

  return (
    <Block flex1>
      <Block
        pV="xl"
        pH="xl"
        align="center"
        bgColor="white"
        flexDirection="row"
        justify="space-between"
        style={{ paddingTop: top }}>
        <Block flexDirection="row" align="center" justify="space-between" flex1>
          <Block onPress={navigation.goBack}>
            <ChevronLeft fontSize={24} color={theme.colors.gray900} />
          </Block>

          <Typography mL="md" variation="title6SemiBold">
            Check in details
          </Typography>
          <Block opacity={0}>
            <ChevronLeft fontSize={24} color={theme.colors.white} />
          </Block>
        </Block>
      </Block>

      <ScrollView pH="xl" mT="xl">
        <Block>
          <Block>
            <Typography color="gray700" variation="paragraphRegular">
              Were you honest with yourself today?
            </Typography>
            <Typography color="primary" mT="md" variation="paragraphSemiBold">
              {getYesNo(checkIn.honest)}
            </Typography>
          </Block>

          <Block mT="xxxl">
            <Typography color="gray700" variation="paragraphRegular">
              Have you experienced a relapse today or since your last checkin?
            </Typography>
            <Typography color="primary" mT="md" variation="paragraphSemiBold">
              {getYesNo(checkIn.relapse)}
            </Typography>
          </Block>

          {checkIn?.addition_name?.toLocaleLowerCase() !== 'anxiety & depression' && (
            <Block mT="xxxl">
              <Typography color="gray700" variation="paragraphRegular">
                Did you experience an urge today?
              </Typography>

              <Typography color="primary" mT="md" variation="paragraphSemiBold">
                {getYesNo(checkIn.urge)}
              </Typography>
            </Block>
          )}

          <Block mT="xxxl" align="flex-start">
            <Typography color="gray700" variation="paragraphRegular">
              How is your mood today?
            </Typography>
            <Block
              pH="lg"
              pV="sm"
              mT="md"
              mR="lg"
              bW={1}
              rounded="xl"
              bgColor="gray200"
              bC="gray200"
              flexDirection="row">
              <Typography variation="title3Light">
                {moodOptions.find((mood) => mood.value === checkIn.mood)?.label || checkIn.mood}
              </Typography>
            </Block>
          </Block>

          <Block mT="xxxl">
            <Typography color="gray700" variation="paragraphRegular">
              What is one thing you are thankful for today?{' '}
              <Typography color="gray500" variation="paragraphRegular">
                (optional)
              </Typography>
            </Typography>

            <Typography color="primary" mT="md" variation="paragraphSemiBold">
              {checkIn.thankfull_notes || 'N/A'}
            </Typography>
          </Block>

          <Block mT="xxxl">
            <Typography color="gray700" variation="paragraphRegular">
              Would you like to say anything to your addiction today?
              <Typography color="gray500" variation="paragraphRegular">
                (optional)
              </Typography>
            </Typography>

            <Typography color="primary" mT="md" variation="paragraphSemiBold">
              {checkIn.addiction_notes || 'N/A'}
            </Typography>
          </Block>

          <Block mT="xxxl">
            <Typography color="gray700" variation="paragraphRegular">
              Would you like to share anything else?
              <Typography color="gray500" variation="paragraphRegular">
                (optional)
              </Typography>
            </Typography>

            <Typography color="primary" mT="md" variation="paragraphSemiBold">
              {checkIn.addiction_notes || 'N/A'}
            </Typography>
          </Block>
        </Block>
      </ScrollView>
    </Block>
  )
}

export default CheckInDetailScreen
