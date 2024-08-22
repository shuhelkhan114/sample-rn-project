import Svg, { Path } from 'react-native-svg'

function CaretIcon(props: any) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      viewBox="0 0 19 17"
      fill="none"
      {...props}>
      <Path
        d="M7.762 1.29c.684-1.185 2.392-1.185 3.076 0l7.304 12.65c.683 1.184-.171 2.663-1.538 2.663H1.996c-1.367 0-2.221-1.48-1.538-2.663L7.762 1.29z"
        fill="#fff"
      />
    </Svg>
  )
}

export default CaretIcon
