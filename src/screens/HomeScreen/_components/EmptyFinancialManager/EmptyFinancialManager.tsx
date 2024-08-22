import { Linking } from 'react-native'
import Link from '~/components/Link/Link'
import Typography from '~/components/Typography/Typography'
import { appConfig } from '~/core/config/app'

interface EmptyFinancialManagerProps {
  username: string
}

const debtEmailSubject = 'Help me sort out my debt!'
const getDebtEmailBody = (username: string) =>
  `Please review my answers and review my details. I need help!. My username is '${username}'`

function EmptyFinancialManager({ username }: EmptyFinancialManagerProps) {
  function handleEmailPress() {
    // TODO: Add try catch
    Linking.openURL(
      `mailto:${appConfig.supportEmail}?subject=${debtEmailSubject}&body=${getDebtEmailBody(
        username
      )}`
    )
  }

  return (
    <Typography mT="xxxl">
      Thanks for filling in the details, Someone from Yume will reach out to you. If not please drop
      an email at{' '}
      <Link color="primary" variation="descriptionSemiBold" onPress={handleEmailPress}>
        {appConfig.supportEmail}
      </Link>
    </Typography>
  )
}

export default EmptyFinancialManager
