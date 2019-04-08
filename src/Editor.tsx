import React, { Component, createRef, RefObject, SyntheticEvent } from 'react';
import { connect } from 'react-redux';
import { Empty } from 'antd';
import './Editor.scss';
import { Dispatch } from 'redux';
import { EDITOR_HEIGHT_BLOCK } from './constants';
import { AppState } from './state/types';
import { IComponent, SelectComponent, selectComponentsState } from './state/components';
import ComponentPositioner from './components/ComponentPositioner';

const DEFAULT_CONTAINER_WIDTH = 12;
const DEFAULT_CONTAINER_HEIGHT = 20;

interface EditorProps {
  components: IComponent[];
  selected: string | null;
  onSelect: (id: string | null) => void;
}

export class Editor extends Component<EditorProps> {

  state = {
    width: 0,
  };

  container: RefObject<any>;
  constructor(props: EditorProps) {
    super(props);
    this.container = createRef();
  }

  componentDidMount(): void {
    if (this.container.current) {
      this.setState({
        width: this.container.current.offsetWidth,
      });
    }
  }

  checkDeselect = (event: SyntheticEvent) => {
    // deselect item if user clicked away
    if (event.currentTarget === event.target) {
      this.props.onSelect(null);
    }
  }

  render() {
    const { components, selected } = this.props;
    const { width } = this.state;

    if (components.length === 0) {
      return (
        <div className="Editor" ref={this.container}>
          <Empty description="No components yet :(" />
        </div>
      );
    }

    return (
      <div className="Editor">

        <div className="grid grid-shadow" ref={this.container}>
          {Array(DEFAULT_CONTAINER_HEIGHT * DEFAULT_CONTAINER_WIDTH).fill(0).map((_, i) => (
              <div className="polka" key={i} />
          ))}
        </div>
        <div className="grid"  ref={this.container} onClick={this.checkDeselect}>
          {components.map((c) => (
              <ComponentPositioner
                  key={c.id}
                  component={c}
                  selected={selected === c.id}
                  blockSize={{ width: (width - 280) / DEFAULT_CONTAINER_WIDTH, height: EDITOR_HEIGHT_BLOCK }}
              />
          ))}

        </div>

      </div>
    );
  }
}

export default connect(
  (state: AppState) => selectComponentsState(state),
  (dispatch: Dispatch) => ({
    onSelect: (id: string | null) => dispatch(SelectComponent(id)),
  })
)(Editor);