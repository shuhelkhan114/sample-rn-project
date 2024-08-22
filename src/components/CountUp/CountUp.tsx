import React, { useEffect, useRef, useState } from 'react'
import { Text } from 'react-native'
import * as Animatable from 'react-native-animatable'

interface CountUpProps {
  start: number
  end: number
  duration: number
}

const CountUp: React.FC<CountUpProps> = ({ start, end, duration }) => {
  const [count, setCount] = useState<number>(start)
  const animatableRef = useRef<any>(null)

  useEffect(() => {
    if (start < end) {
      const interval = setInterval(
        () => {
          if (count < end) {
            setCount((prevCount) => prevCount + 1)
          } else {
            clearInterval(interval)
          }
        },
        duration / (end - start)
      )

      return () => clearInterval(interval)
    }
  }, [count, start, end, duration])

  return (
    <Animatable.View
      ref={animatableRef}
      animation={{
        from: { translateY: 50 },
        to: { translateY: 0 },
      }}
      duration={1000}
      easing="ease-out"
      style={{ overflow: 'hidden' }}>
      <Text>{count}</Text>
    </Animatable.View>
  )
}

export default CountUp
