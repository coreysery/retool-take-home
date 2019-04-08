import React from 'react';
import { Button } from 'antd';
import { IComponent } from '../state/components';

// Cast for TS issue :(
// https://github.com/ant-design/ant-design/issues/15700
const AntButton: any = Button;

interface ButtonProps {
  component: IComponent;
}

export default function(props: ButtonProps) {
  const { attributes } = props.component;
  const label = attributes ? attributes.label : 'Submit';

  return (
      <div className="Component ButtonComponent">
        <AntButton type="primary" block>{label}</AntButton>
      </div>
  );
}
