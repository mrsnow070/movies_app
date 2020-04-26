import React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg width={42} height={81} viewBox="0 0 42 81" fill="none" {...props}>
      <Path
        d="M1.428 27.787v25.71c0 3.71 4.466 5.589 7.118 2.994L21.4 43.909a4.188 4.188 0 00.063-5.924L8.61 24.857c-2.626-2.682-7.181-.823-7.181 2.93z"
        fill="#fff"
      />
      <Path
        d="M.963 2.461c21.003 0 38.029 17.026 38.029 38.03 0 21.002-17.026 38.028-38.029 38.028"
        stroke="#fff"
        strokeWidth={4.188}
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default SvgComponent
