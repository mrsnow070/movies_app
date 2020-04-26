import React from 'react';
import Svg, {Path} from 'react-native-svg';

function PlayIcon(props) {
  return (
    <Svg width={8} height={14} viewBox="0 0 8 14" fill="none" {...props}>
      <Path
        d="M.217 12.854V1.682c0-.89 1.077-1.337 1.707-.707L7.51 6.561a1 1 0 010 1.414l-5.586 5.586c-.63.63-1.707.184-1.707-.707z"
        fill="#fff"
      />
    </Svg>
  );
}

export default PlayIcon;
