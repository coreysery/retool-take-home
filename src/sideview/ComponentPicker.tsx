import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Icon, Card } from 'antd';
import { AddComponent } from '../state/components';
import { ComponentType, componentTypes, IComponentDetails } from '../components/component-types';
import './ComponentPicker.scss';

export function ComponentItem(props: { component: IComponentDetails }) {
  const { name, type, icon, description } = props.component;
  return (
    <Card size="small" className="ComponentItem">
      <Card.Meta
        avatar={
          <div className="ComponentItem-Icon">
            <Icon type={icon} />
          </div>
        }
        title={name}
        description={description}
      />
    </Card>
  );
}

interface ComponentPickerProps {
  onComponentSelect: (type: ComponentType) => void,
}

export function ComponentPicker(props: ComponentPickerProps) {
  return (
    <div className="ComponentPicker">
      <h4>Components</h4>

      <ul>
        {componentTypes.map((c) => (
          <li key={c.type} onClick={() => props.onComponentSelect(c.type)}>
            <ComponentItem component={c} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default connect(
    null,
    (dispatch: Dispatch) => ({
      onComponentSelect: (type: ComponentType) => dispatch(AddComponent(type)),
    })
)(ComponentPicker);