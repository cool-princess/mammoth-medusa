import React from "react";
import IconProps from "../../../types/icon-type";

const Chart: React.FC<IconProps> = ({
  size = "40",
  color = "currentColor",
  ...attributes
}) => {
  return (
    <svg width="82" height="44" viewBox="0 0 82 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_7055_127116)">
      <rect x="0.567383" width="81" height="44" fill="white"/>
      <rect x="5.53711" y="33.9277" width="5.184" height="10.0723" fill="#DDDDDD"/>
      <rect x="13.9609" y="30.7471" width="5.184" height="13.253" fill="#DDDDDD"/>
      <rect x="22.3848" y="26.5061" width="5.184" height="17.494" fill="#DDDDDD"/>
      <rect x="30.8096" y="23.3254" width="5.184" height="20.6747" fill="#DDDDDD"/>
      <rect x="39.2334" y="19.0845" width="5.184" height="24.9157" fill="#DDDDDD"/>
      <rect x="47.6572" y="15.9036" width="5.184" height="28.0964" fill="#DDDDDD"/>
      <rect x="56.0811" y="12.7229" width="5.184" height="31.2771" fill="#DDDDDD"/>
      <rect x="64.5049" y="11.1326" width="5.184" height="32.8675" fill="#DDDDDD"/>
      <rect x="72.9287" y="5.30127" width="5.184" height="38.6988" fill="#DDDDDD"/>
      </g>
      <rect x="1.06738" y="0.5" width="80" height="43" stroke="#CCCCCC"/>
      <defs>
      <clipPath id="clip0_7055_127116">
      <rect x="0.567383" width="81" height="44" fill="white"/>
      </clipPath>
      </defs>
    </svg>


  );
};

export default Chart;
