import React, { Component } from 'react';
import { Button, Input, Form } from 'antd';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { componentTypes } from '../components/component-types';
import { DeleteComponent, EditComponent, IComponent } from '../state/components';
import './ComponentEditor.scss';


// Cast for TS issue :(
// https://github.com/ant-design/ant-design/issues/15700
const AntButton: any = Button;

interface ComponentEditorProps {
  component: IComponent;
  onRemove: (id: string) => void;
  onComponentEdit: (id: string, edits: any) => void,
}

class ComponentEditor extends Component<ComponentEditorProps> {
  render() {
    const { component, onRemove, onComponentEdit } = this.props;
    const details = componentTypes.find((c) => c.type === component.type);

    if (!details) {
      return null;
    }

    const attr = component.attributes || details.attributes || {};

    return (
      <div className="ComponentEditor">
        <h4>Edit {details.name} Component</h4>
        <p>
          <i>{component.id}</i>
        </p>

        {Object.keys(attr).map((key) => (
            <Form.Item key={key} label={key} >
              <Input
                  placeholder={key}
                  value={attr![key] || ''}
                  onChange={(e) => onComponentEdit(component.id, { ...attr, [key]: e.target.value })}
              />
            </Form.Item>
        ))}

        <AntButton type="danger" onClick={() => onRemove(component.id)}>Delete</AntButton>
      </div>
    );
  }
}

export default connect(
    null,
    (dispatch: Dispatch) => ({
      onRemove: (id: string) => dispatch(DeleteComponent(id)),
      onComponentEdit: (id: string, edits: any) => dispatch(EditComponent(id, edits)),
    })
)(ComponentEditor);