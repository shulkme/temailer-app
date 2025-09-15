'use client';
import { RiAddLine, RiSubtractLine } from '@remixicon/react';
import {
  InputNumber as AntdInputNumber,
  Button,
  ButtonProps,
  InputNumberProps,
} from 'antd';
import React, { useEffect, useState } from 'react';

const InputNumber: React.FC<
  InputNumberProps & {
    controlProps?: ButtonProps;
  }
> = ({ controlProps, ...props }) => {
  const {
    id,
    value: propValue,
    max = Infinity,
    min = -Infinity,
    step = 1,
    onChange,
    defaultValue,
    ...rest
  } = props;

  const [value, setValue] = useState<number>(
    typeof defaultValue === 'number' ? defaultValue : 0,
  );

  // 更新输入框的值
  const handleChange: InputNumberProps['onChange'] = (newValue) => {
    if (typeof newValue === 'number') {
      setValue(newValue);
    }
    onChange?.(newValue); // 外部传入的 onChange
  };

  // 增加1的操作，确保不超过 max
  const handleIncrement = () => {
    if (
      typeof step === 'number' &&
      typeof max === 'number' &&
      value + step <= max
    ) {
      handleChange(value + step);
    }
  };

  // 减少1的操作，确保不低于 min
  const handleDecrement = () => {
    if (
      typeof step === 'number' &&
      typeof min === 'number' &&
      value - step >= min
    ) {
      handleChange(value - step);
    }
  };

  useEffect(() => {
    if (typeof propValue === 'number') {
      setValue(propValue);
    }
  }, [propValue]);

  return (
    <div className="flex items-center gap-2">
      <Button
        className="leading-none"
        shape="circle"
        size={props.size}
        icon={<RiSubtractLine size="1.5em" />}
        onClick={handleDecrement}
        {...controlProps}
      />
      <AntdInputNumber
        {...rest}
        className="[&_.ant-input-number-input]:text-center"
        id={id}
        value={value}
        min={min}
        max={max}
        step={step}
        controls={false}
        onChange={handleChange}
      />
      <Button
        className="leading-none"
        shape="circle"
        size={props.size}
        icon={<RiAddLine size="1.5em" />}
        onClick={handleIncrement}
        {...controlProps}
      />
    </div>
  );
};

export default InputNumber;
