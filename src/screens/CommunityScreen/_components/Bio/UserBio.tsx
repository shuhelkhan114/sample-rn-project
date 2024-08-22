import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { StyleSheet } from 'react-native'
import Block from '~/components/Block/Block'
import Button from '~/components/Button/Button'
import ErrorText from '~/components/ErrorText/ErrorText'
import TextInput from '~/components/TextInput/TextInput'
import Typography from '~/components/Typography/Typography'
import toast from '~/core/lib/toast'
import API from '~/core/services'
import useAuth from '~/hooks/useAuth'

interface UserBioProps {
  onSubmit: () => void
}

const UserBio = (props: UserBioProps) => {
  const { onSubmit } = props
  const { refetchProfile } = useAuth()
  const [bio, setBio] = useState<string>('')

  const {
    isPending,
    error,
    mutate: updateProfile,
  } = useMutation({
    mutationFn: async (params: { bio: string }) => {
      const { bio } = params
      await API.user.updateProfile({
        user_bio: bio,
      })
    },
    onSuccess() {
      refetchProfile()
      onSubmit()
    },
    onError(error: any) {
      toast.error('Profile', `${error.message || 'Something went wrong'}`)
    },
  })

  const handleSubmit = () => {
    updateProfile({ bio })
  }

  return (
    <Block>
      <Typography variation="paragraphSemiBold" mB="xxl">
        Share your story
      </Typography>

      <Typography color="gray800" mB="lg" variation="paragraphLight">
        Update your bio so fellow members can connect and support you.
      </Typography>
      <Block mB="xxl">
        <TextInput
          multiline
          value={bio}
          placeholder="From NYC, Struggled with gambling addiction, losing over $1 million on sports betting and stock trading. Currently working in tech trying to reclaim control of my life. Excited to connect with you all."
          style={style.textbox}
          onChangeText={(text) => setBio(text)}
        />
      </Block>

      <ErrorText error={error} />
      <Button
        title="Update"
        loading={isPending}
        onPress={handleSubmit}
        disabled={!bio}
        variation={!bio ? 'secondary' : 'primary'}
      />
    </Block>
  )
}

const style = StyleSheet.create({
  textbox: {
    height: 90,
    fontSize: 20,
    fontWeight: '400',
    alignItems: 'flex-start',
  },
})

export default UserBio
