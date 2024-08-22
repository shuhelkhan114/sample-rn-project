import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { ChevronLeft } from 'react-native-feather'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Block from '~/components/Block/Block'
import ScrollView from '~/components/ScrollView/ScrollView'
import Typography from '~/components/Typography/Typography'
import useAuth from '~/hooks/useAuth'
import useAppTheme from '~/hooks/useTheme'
import { MainStackScreens, Screens } from '~/navigation/screens'

type MyAddictionsScreenProps = NativeStackScreenProps<MainStackScreens, Screens.MyAddictionsScreen>

export type MyAddictionsScreenParams = undefined

const MyAddictionsScreen: React.FC<MyAddictionsScreenProps> = (props) => {
  const { navigation } = props

  const theme = useAppTheme()
  const { top } = useSafeAreaInsets()
  const { currentUser } = useAuth()

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
            My addictions
          </Typography>

          <Block opacity={0}>
            <ChevronLeft fontSize={24} color={theme.colors.white} />
          </Block>
        </Block>
      </Block>

      <ScrollView pH="xl">
        <Typography variation="paragraphRegular">Current</Typography>
        <Block mV="xl" height={1} width="100%" bgColor="gray200" />

        {currentUser.parent_addictions?.[0] ? (
          currentUser.parent_addictions.map((addiction, index) => {
            return (
              <Block key={addiction.id} mB="xl">
                <Typography mT="sm" color="gray500" variation="paragraphRegular">
                  {addiction.name}
                </Typography>
              </Block>
            )
          })
        ) : (
          <Typography>No addiction available</Typography>
        )}
      </ScrollView>
    </Block>
  )
}

export default MyAddictionsScreen
