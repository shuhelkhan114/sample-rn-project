import { PropsWithChildren } from 'react'
import Block, { BlockProps } from '~/components/Block/Block'

interface WidgetCardProps extends PropsWithChildren, BlockProps {}

function WidgetCard({ children, ...restProps }: WidgetCardProps) {
  return (
    <Block flex1 rounded="lg" shadow="sm" pH="xl" pV="lg" bgColor="white" {...restProps}>
      {children}
    </Block>
  )
}

export default WidgetCard
