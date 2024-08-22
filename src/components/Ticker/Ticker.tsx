// TODO: Add TypeScript types

import PropTypes from 'prop-types'
import { Component } from 'react'
import { Animated, Easing, StyleSheet, Text, View } from 'react-native'

const NumberTicker: any = ({ style, textSize = 35, textStyle, number, duration }: any) => {
  const mapToDigits = () => {
    return (number + '').split('').map((data, index) => {
      if (data === '.' || data === ',') {
        return (
          <Text key={data} style={[textStyle, { fontSize: textSize }]}>
            {data}
          </Text>
        )
      }
      return (
        <TextTicker
          key={index}
          textSize={textSize}
          textStyle={textStyle}
          // @ts-ignore
          targetNumber={parseFloat(data, 10)}
          duration={duration}
        />
      )
    })
  }

  return (
    <View style={style}>
      <View style={{ flexDirection: 'row' }}>{mapToDigits()}</View>
    </View>
  )
}

class TextTicker extends Component<any, any> {
  numberList: Array<{ id: number }>
  constructor(props: any) {
    super(props)
    this.state = {
      animatedValue: new Animated.Value(0),
      isAnimating: true,
      delay: 1000,
      number: 1,
    }

    this.numberList = this.calculateNumberList(props.targetNumber)
  }

  calculateNumberList(targetNumber: number) {
    const numberList = []
    if (targetNumber > 5) {
      for (let i = 0; i <= targetNumber; i++) {
        numberList.push({ id: i })
      }
    } else {
      for (let i = 9; i >= targetNumber; i--) {
        numberList.push({ id: i })
      }
    }
    return numberList
  }

  componentDidMount() {
    this.startAnimation()
  }

  componentDidUpdate(prevProps: any) {
    if (prevProps.targetNumber !== this.props.targetNumber) {
      this.numberList = this.calculateNumberList(this.props.targetNumber)
      this.startAnimation() // Restart animation if needed
    }
  }

  startAnimation = () => {
    const { animatedValue } = this.state
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: this.props.duration,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start(() => {
      // on finish..
    })
  }

  getInterpolatedVal = (val: any) => {
    return val.interpolate({
      inputRange: [0, 1],
      outputRange: [this.props.textSize * this.numberList.length, this.props.textSize * 0.2],
      extrapolate: 'clamp',
    })
  }

  renderNumbers = (styles: any) => {
    return this.numberList.map((data: any) => {
      return (
        <Text key={data.id} style={[this.props.textStyle, styles.text]}>
          {data.id}
        </Text>
      )
    })
  }

  render() {
    const { animatedValue } = this.state
    const styles = generateStyles(this.props.textSize)

    return (
      <View style={styles.container}>
        <Animated.View
          style={{
            transform: [
              {
                translateY: this.getInterpolatedVal(animatedValue),
              },
            ],
          }}>
          {this.renderNumbers(styles)}
        </Animated.View>
      </View>
    )
  }
}

// @ts-ignore
TextTicker.defaultProps = {
  duration: 3000,
  targetNumber: 7,
  movingDown: true,
  textSize: 35,
}

// @ts-ignore
TextTicker.propTypes = {
  duration: PropTypes.number,
  targetNumber: PropTypes.number,
  movingDown: PropTypes.bool,
  textSize: PropTypes.number,
  textStyle: PropTypes.any,
}

const generateStyles = (textSize: any) =>
  StyleSheet.create({
    container: {
      width: textSize * 0.62,
      height: textSize,
      overflow: 'hidden',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    text: {
      fontSize: textSize,
      lineHeight: textSize,
      // TODO: worst way to do it, please fix later, I'm in a super rush
      transform: [{ translateY: textSize === 28 ? 0 : -5 }],
    },
  })

export default NumberTicker
