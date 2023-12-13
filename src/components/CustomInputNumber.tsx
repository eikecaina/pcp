import React, { useState } from 'react';
import { InputNumber, InputNumberProps } from 'antd';

interface CustomInputNumberProps extends InputNumberProps {
  min?: number;
  maxLength?: number;
}

const CustomInputNumber: React.FC<CustomInputNumberProps> = ({ min, maxLength, style, ...restProps }) => {

  const [inputValue, setInputValue] = useState<number | undefined>(undefined);

  const handleInputChange = (value: number | undefined) => {
    setInputValue(value);
  };

  const handleInputPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const keyCode = event.keyCode || event.which;

    const validInputRegex = /^[0-9\b]+$/;

    if (!validInputRegex.test(String.fromCharCode(keyCode)) && keyCode !== 8) {
      event.preventDefault();
    }
  };

  return (
    <InputNumber
      controls={false}
      value={inputValue}
      onChange={handleInputChange}
      onKeyPress={handleInputPress}
      min={min}
      maxLength={maxLength}
      style={style}
      {...restProps}
    />
  );
};


export default CustomInputNumber;


