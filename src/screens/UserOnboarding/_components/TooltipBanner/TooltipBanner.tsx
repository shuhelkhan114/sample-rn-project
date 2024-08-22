import { PropsWithChildren } from 'react'
import Block, { BlockProps } from '~/components/Block/Block'
import TriangleSVG from './TriangleSVG/TriangleSVG'

interface TooltipBannerProps extends PropsWithChildren, BlockProps {}

function TooltipBanner({ children, ...restProps }: TooltipBannerProps) {
  return (
    <Block pT="xl" {...restProps}>
      <Block pH="xl" pV="xl" bgColor="gray100" rounded="lg" {...restProps}>
        <Block absolute top={-12} left={2}>
          <TriangleSVG />
        </Block>
        {children}
      </Block>
    </Block>
  )
}

export default TooltipBanner
