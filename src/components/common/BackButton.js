import React from 'react';
import Svg, {Path} from 'react-native-svg';

function BackButton(props) {
  return (
    <Svg width={13} height={22} viewBox="0 0 13 22" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.33.986L.968 9.976a1.288 1.288 0 000 1.857l9.364 8.988a1.483 1.483 0 102.055-2.14l-7.843-7.529a.343.343 0 010-.497l7.843-7.53A1.485 1.485 0 0010.33.986z"
        fill="#fff"
      />
    </Svg>
  );
}

export default BackButton;
