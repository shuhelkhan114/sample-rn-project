import { useNavigation } from '@react-navigation/native'
import { format } from 'date-fns'
import { Fragment } from 'react'
import Block from '~/components/Block/Block'
import Typography from '~/components/Typography/Typography'
import { Screens } from '~/navigation/screens'

interface CheckInMessageProps {
  checkedInAt: number
  checkIns: Array<{
    id: string
    name: string
    soberFor: number
    addiction_id: string
  }>
}

const CheckInMessage: React.FC<CheckInMessageProps> = (props) => {
  const { checkedInAt, checkIns } = props
  // TODO: Type Update in Navigation
  const navigation = useNavigation<any>()

  const handlePress = () => {
    navigation.navigate(Screens.CheckinDetailsMessageScreen, { id: checkIns[0]?.id })
  }

  return (
    <Fragment>
      <Block pH="xxxl" pB="xl" onPress={handlePress}>
        <Block flexDirection="row" mT="md" align="center">
          <Block flex1 height={1} bgColor="gray200" />
          <Typography color="gray500" mH="xl" variation="smallLight">
            New Check in submitted:{' '}
            <Typography variation="smallRegular">
              {format(new Date(checkedInAt), 'KK:mm aa')}
            </Typography>
          </Typography>
          <Block flex1 height={1} bgColor="gray200" />
        </Block>
      </Block>
    </Fragment>
  )
}

export default CheckInMessage
