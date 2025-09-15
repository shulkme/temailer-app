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
      <polygon
        points="455.6 286.39 342.79 512 114.99 56.4 340.6 56.4 455.6 286.39"
        fill="#b2d0f7"
      />
      <polygon
        points="798.39 56.4 342.79 967.6 0 282.01 112.8 56.4 114.99 56.4 342.79 512 570.59 56.4 798.39 56.4"
        fill="#1062ff"
      />
      <polygon
        points="1024 56.4 568.4 967.6 342.79 967.6 798.39 56.4 1024 56.4"
        fill="#b2d0f7"
      />
    </svg>
  );
};

export default Logo;
