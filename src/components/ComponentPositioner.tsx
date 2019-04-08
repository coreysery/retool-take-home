import React, { Component } from 'react';
import Draggable from 'react-draggable';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Button from '../components/Button';
import DataTable from '../components/DataTable';
import Dropdown from '../components/Dropdown';
import { ComponentType } from './component-types';
import TextInput from '../components/TextInput';
import { IComponent, MoveComponent, SelectComponent } from '../state/components';
import { Coordinate, Dimensions } from '../types';

interface ComponentFactoryProps {
  blockSize: {
    width: number;
    height: number;
  },
  component: IComponent;
  selected: boolean;

  onMove: (id: string, coor: Coordinate) => void;
  onSelect: (id: string) => void;
}

function ComponentFactory({ component }: { component: IComponent }) {
  switch (component.type) {
    case ComponentType.TEXT:
      return <TextInput component={component} />;
    case ComponentType.BUTTON:
      return <Button component={component} />;
    case ComponentType.DROPDOWN:
      return <Dropdown component={component} />;
    case ComponentType.TABLE:
      return <DataTable component={component} />;

    default:
      return null;
  }
}

class ComponentPositioner extends Component<ComponentFactoryProps> {

  onStop = (e: any, data: any) => {
    const { component, blockSize, onMove } = this.props;
    const { width, height } = blockSize;
    const { coordinates, dimensions } = component;

    const x = coordinates.x + Math.round(data.x / width);
    const y = coordinates.y + Math.round(data.y / height);

    onMove(component.id, { x, y });
  }

  onHandleClick = (e: any) => {
    if (e.currentTarget === e.target) {
      this.props.onSelect(this.props.component.id);
    }
  }

  render() {
    const { component, selected } = this.props;
    const { coordinates, dimensions } = component;

    return (
        <div
            style={{
              gridColumn: `${coordinates.x + 1} / span ${dimensions.width}`,
              gridRow: `${coordinates.y + 1} / span ${dimensions.height}`,
            }}
            className={'ComponentPositioner ' + (selected ? 'selected' : '')}
        >
          <Draggable
              handle=".handle"
              bounds=".grid"
              disabled={!selected}
              position={{ x: 0, y: 0 }}
              onStop={this.onStop}
          >
            <div>
              <div className="handle" onClick={this.onHandleClick}>
                <div className="no-handle">
                  <ComponentFactory component={component} />
                </div>
              </div>
            </div>
          </Draggable>
        </div>
    );
  }
}

export default connect(
    null,
    (dispatch: Dispatch) => ({
      onMove: (id: string, coor: Coordinate) => dispatch(MoveComponent(id, coor)),
      onSelect: (id: string) => dispatch(SelectComponent(id)),
    })
)(ComponentPositioner);
