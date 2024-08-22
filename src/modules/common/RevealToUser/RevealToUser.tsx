import { useMutation } from '@tanstack/react-query'
import Block from '~/components/Block/Block'
import Button from '~/components/Button/Button'
import ScanIcon from '~/components/Icons/ScanIcon'
import Image from '~/components/Image/Image'
import Typography from '~/components/Typography/Typography'
import toast from '~/core/lib/toast'
import API from '~/core/services'
import { getSize } from '~/core/utils/responsive'
import useAuth from '~/hooks/useAuth'

interface RevealToUserProps {
  revealingToId: string
  revealingToName: string
  onSuccess: () => void
  onCancel: () => void
}

const RevealToUser: React.FC<RevealToUserProps> = (props) => {
  const { revealingToId, revealingToName, onCancel } = props

  const { currentUser } = useAuth()

  const { mutate: revealYourSelf } = useMutation({
    mutationFn: API.user.revealYourSelf,
    onSuccess(res) {
      toast.success('Profile Reveled', `Profile reveled to ${revealingToName}!`)
    },
    onError(error: any) {
      toast.error('Unable to reveal', `${error.message || 'Something went wrong!'}`)
    },
  })

  const handleReveal = () => {
    revealYourSelf({ reveal_to_user_id: revealingToId })
  }

  return (
    <Block align="center" pB="xl" pV="5xl">
      <Image circular uri={currentUser.displayImage} size={getSize(74)} />

      <Typography mT="xl" variation="paragraphSemiBold">
        {currentUser.displayName}
      </Typography>

      <Typography mV="xl" variation="paragraphSemiBold">
        Show your true colors
      </Typography>

      <Typography variation="descriptionLight">
        Feel the freedom to reveal yourself to everyone when you&apos;re comfortable. It&apos;s your
        choice, and your privacy is always respected.
      </Typography>

      <Typography pT="xl" mB="xl" variation="descriptionLight">
        If you choose to reveal yourself you&apos;ll be seen as Jane Doe only by {revealingToName}
      </Typography>

      <Button title="Cancel" onPress={onCancel} variation="secondary" />
      <Button
        mT="xl"
        icon={<ScanIcon fill="#fff" />}
        onPress={handleReveal}
        title={`Reveal Yourself to ${revealingToName}`}
      />
    </Block>
  )
}

export default RevealToUser
