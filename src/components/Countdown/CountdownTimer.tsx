import React, { useEffect, useState } from 'react'
import Typography, { TypographyProps } from '~/components/Typography/Typography'

// TODO: MAKE A HOOK
interface CountdownTimerProps extends TypographyProps {
  initialTimeInMin: number
  onCountDownEnd: () => void
}

const CountdownTimer = (props: CountdownTimerProps) => {
  const { onCountDownEnd, initialTimeInMin, ...restProps } = props
  const initialTime = initialTimeInMin * 60
  const [time, setTime] = useState(initialTime)

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1
        } else {
          clearInterval(interval)
          onCountDownEnd()
          return 0
        }
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  // Format seconds to display as MM:SS
  const formatTime = (seconds: any) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`
  }

  return <Typography {...restProps}>{formatTime(time)}</Typography>
}

export default CountdownTimer
