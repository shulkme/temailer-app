import { cn } from '@/utils/classname';
import { Button, ButtonProps } from 'antd';
import React from 'react';

const PrimaryButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        type="primary"
        className={cn(
          'leading-none overflow-hidden not-disabled:border-none not-disabled:hover:opacity-80 not-disabled:after:glint not-disabled:after:animate-glint',
          className,
        )}
        {...props}
      />
    );
  },
);

PrimaryButton.displayName = 'PrimaryButton';

export default PrimaryButton;
