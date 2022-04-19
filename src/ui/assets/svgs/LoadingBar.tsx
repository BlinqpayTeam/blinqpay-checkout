import React from 'react';
const LoadingBar = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.0"
      width="107px"
      height="14px"
      viewBox="0 0 457 60"
      xmlSpace="preserve"
    >
      <rect x="0" y="0" width="100%" height="100%" fill="#FFFFFF" />
      <g>
        <circle fill="#6b58b6" cx="-31" cy="30" r="30" />
        <circle fill="#8879c4" cx="-97" cy="30" r="24" />
        <circle fill="#a599d3" cx="-163" cy="30" r="19" />
        <circle fill="#dfdbef" cx="-229.5" cy="30.5" r="13.5" />
        <circle fill="#eeebf6" cx="-295" cy="31" r="11" />
        <animateTransform
          attributeName="transform"
          type="translate"
          values="61 0;127 0;193 0;259 0;325 0;391 0;457 0;523 0;589 0;655 0;721 0;787 0;0 0;0 0;0 0;0 0;0 0;0 0;0 0;0 0;0 0;0 0;0 0;"
          calcMode="discrete"
          dur="1440ms"
          repeatCount="indefinite"
        />
      </g>
      <g>
        <circle fill="#6b58b6" cx="488" cy="30" r="30" />
        <circle fill="#8879c4" cx="554" cy="30" r="24" />
        <circle fill="#a599d3" cx="620" cy="30" r="19" />
        <circle fill="#dfdbef" cx="686.5" cy="30.5" r="13.5" />
        <circle fill="#eeebf6" cx="753" cy="31" r="11" />
        <animateTransform
          attributeName="transform"
          type="translate"
          values="0 0;0 0;0 0;0 0;0 0;0 0;0 0;0 0;0 0;0 0;0 0;-61 0;-127 0;-193 0;-259 0;-325 0;-391 0;-457 0;-523 0;-589 0;-655 0;-721 0;-787 0;"
          calcMode="discrete"
          dur="1440ms"
          repeatCount="indefinite"
        />
      </g>
    </svg>
  );
};

export default LoadingBar;
