import React from 'react'
import Block from '~/components/Block/Block'
import Typography from '~/components/Typography/Typography'

interface BuyRecoveryCoachCardProps {
  plan: {
    id: string
    cost?: string
    yearCost?: string
    monthCost?: string
    bestValue?: string
    description: string
  }
  selected: string
  onSelect: () => void
}

const BuyRecoveryCoachCard: React.FC<BuyRecoveryCoachCardProps> = (props) => {
  const { selected, onSelect, plan } = props
  const { yearCost, monthCost, bestValue, description, cost } = plan
  const color = plan.id === selected ? 'white' : 'headerGray'

  return (
    <Block onPress={onSelect} relative mT="xxl">
      {bestValue && (
        <Block
          pH="md"
          pV="sm"
          absolute
          right={0}
          top={-14}
          zIndex={10}
          rounded="xxxl"
          bgColor="positive">
          <Typography color="white" variation="smallRegular">
            {bestValue}
          </Typography>
        </Block>
      )}

      <Block
        pH="xl"
        pV="lg"
        align="center"
        rounded="xxxl"
        flexDirection="row"
        bgColor={plan.id === selected ? 'primary' : 'gray100'}>
        {/* Subscription Item Bullets */}
        <Block
          bW={selected === plan.id ? 8 : 1}
          width={24}
          height={24}
          rounded="6xl"
          align="center"
          justify="center"
          bC="gray900">
          {selected && (
            <Block
              width={12}
              height={12}
              bgColor={selected === plan.id ? 'white' : 'gray100'}
              rounded="6xl"
            />
          )}
        </Block>

        {/* Subscrition Details */}
        <Block mL="lg">
          <Block flexDirection="row" align="flex-end">
            {yearCost && (
              <Block flexDirection="row" align="flex-end">
                <Typography color={color} variation="title6SemiBold">
                  {yearCost}/Annual
                </Typography>
              </Block>
            )}
            {monthCost && (
              <Typography color={color} variation="title6SemiBold">
                {monthCost}/Monthly
              </Typography>
            )}
            {cost && (
              <Typography color={color} variation="title6SemiBold">
                {cost}/Lifetime
              </Typography>
            )}
          </Block>

          <Typography color={selected === plan.id ? 'white' : 'gray600'} variation="smallRegular">
            {description}
          </Typography>
        </Block>
      </Block>
    </Block>
  )
}

export default BuyRecoveryCoachCard
