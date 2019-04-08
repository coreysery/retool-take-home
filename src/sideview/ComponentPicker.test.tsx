import React from 'react';
import { shallow } from 'enzyme';
import { componentTypes } from '../components/component-types';

import { ComponentPicker, ComponentItem } from './ComponentPicker';

describe('ComponentPicker', () => {

  it('should render', () => {
    const wrapper = shallow(<ComponentPicker />);
    expect(wrapper).toBeTruthy();
  });

  it('should show all available components', () => {
    const wrapper = shallow(<ComponentPicker />);
    expect(wrapper.find(ComponentItem)).toHaveLength(componentTypes.length);
  });

});
