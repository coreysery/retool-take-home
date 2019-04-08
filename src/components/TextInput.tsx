import React, { Component } from 'react';
import { Input } from 'antd';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { EditComponent, IComponent } from '../state/components';

interface TextInputProps {
  component: IComponent;
  onComponentEdit: (id: string, edits: any) => void;
}

class TextInput extends Component<TextInputProps> {
  render() {
    const { onComponentEdit, component } = this.props;
    if (!component.attributes) {
      return null;
    }
    const { value, label } = component.attributes;

    return (
      <div className="Component TextInputComponent">
        <Input
            placeholder={label}
            value={value}
            onChange={(e) => onComponentEdit(this.props.component.id, { ...component.attributes, value: e.target.value })}
        />
      </div>
    );
  }
}

export default connect(
    null,
    (dispatch: Dispatch) => ({
      onComponentEdit: (id: string, edits: any) => dispatch(EditComponent(id, edits)),
    })
)(TextInput);
