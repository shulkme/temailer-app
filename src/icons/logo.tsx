import type { SVGProps } from 'react';

const Logo = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 1024 1024"
      {...props}
    >
      <polygon points="219.17 330.32 34.7 660.56 695.18 330.32 34.7 .08 219.17 330.32" fill='#1062ff'/>
      <polygon points="805.06 693.84 989.53 363.6 329.05 693.84 989.53 1024.08 805.06 693.84" fill='aqua'/>
    </svg>
  );
};

export default Logo;
