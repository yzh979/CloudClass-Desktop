import { useState } from 'react';

type RadioType = '0' | '1';

type RadioGroupProps = {
  name: string;
  onChange: (value: '0' | '1') => void;
};

export default ({ name, onChange }: RadioGroupProps) => {
  const [radioValue, setRadioValue] = useState('0');

  const userTypes = [
    { label: '所有人员', value: '0' },
    {
      label: '禁言人员',
      value: '1',
    },
  ];

  return (
    <div className="flex">
      {userTypes.map(({ label, value }) => (
        <label
          className="flex items-center mr-4"
          style={{
            marginRight: 8,
            alignItems: 'center',
          }}
          key={value}>
          <input
            style={{
              marginRight: 6,
            }}
            className="mr-1"
            type="radio"
            value={value}
            name={name}
            onChange={() => {
              if (value !== radioValue) {
                setRadioValue(value);
                onChange(value as RadioType);
              }
            }}
            checked={radioValue === value}
          />{' '}
          {label}
        </label>
      ))}
    </div>
  );
};
