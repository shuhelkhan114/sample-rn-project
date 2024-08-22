import React, { useMemo } from 'react'
import { StyleSheet, type ImageSourcePropType, type ImageStyle } from 'react-native'
import FastImage, { FastImageProps } from 'react-native-fast-image'

import { getSize } from '~/core/utils/responsive'
import Block, { type BlockProps } from '../Block/Block'

interface ImageProps extends BlockProps {
  size?: number
  width?: number
  height?: number
  circular?: boolean
  source?: ImageSourcePropType
  uri?: string
  resizeMode?: FastImageProps['resizeMode']
  imageStyle?: ImageStyle
}

const Image: React.FC<ImageProps> = (props) => {
  const { size, width, height, circular, source, uri, resizeMode, imageStyle, ...restProps } = props

  const styles = useMemo(
    () =>
      StyleSheet.create({
        default: {
          ...(size && { width: getSize(size), height: getSize(size) }),
          ...(width && { width: getSize(width) }),
          ...(height && { height: getSize(height) }),
          ...(circular && { borderRadius: size }),
          ...imageStyle,
        },
      }),
    [circular, size, width, height, imageStyle]
  )

  return (
    <Block {...restProps}>
      <FastImage
        defaultSource={require('~/assets/fallback.png')}
        // @ts-expect-error
        source={uri ? { uri } : source}
        resizeMode={resizeMode}
        // @ts-ignore
        style={styles.default}
      />
    </Block>
  )
}

export default Image
