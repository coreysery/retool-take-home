import React from 'react';
import { Select } from 'antd';
import { IComponent } from '../state/components';

const Option = Select.Option;

interface DropdownProps {
  component: IComponent;
}

function Dropdown(props: DropdownProps) {
  const { attributes } = props.component;
  if (!attributes) {
    return null;
  }

  const options = attributes.options.split(',');

  return (
      <div className="Component DropdownComponent">
        <Select defaultValue={attributes.value}>
          {options.map((o: any, i: number) => (
              <Option key={i} value={o}>{o}</Option>
          ))}
        </Select>
      </div>
  );
}

export default Dropdown;
