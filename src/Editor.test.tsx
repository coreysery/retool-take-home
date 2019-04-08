import React from 'react';
import { shallow } from 'enzyme';
import ComponentPositioner from './components/ComponentPositioner';
import { ComponentType, componentTypes } from './components/component-types';
import { IComponent } from './state/components';
import { Editor } from './Editor';

describe('Editor', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(
      <Editor
        selected={null}
        components={[]}
        onSelect={() => null}
      />
    );
    expect(wrapper).toBeTruthy();
  });

  it('should show all given components', async () => {
    const c: IComponent = {
      type: ComponentType.TEXT,
      id: '123',
      dimensions: { width: 1, height: 1 },
      coordinates: { x: 0, y: 0 },
    };
    const wrapper = shallow(
        <Editor
            selected={null}
            components={[c]}
            onSelect={() => null}
        />
    );
    expect(wrapper.find(ComponentPositioner)).toHaveLength(1);
  });

});

