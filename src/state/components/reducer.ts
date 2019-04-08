import { createSelector } from 'reselect';
import { componentTypes } from '../../components/component-types';
import { ComponentActionType, ComponentActionTypes, IComponent } from './actions';

export interface ComponentsState {
  selected: string | null;
  components: IComponent[];
}

const initialState = {
  selected: null,
  components: [],
};

export const selectComponentsState = (state: any): ComponentsState => state.components;
export const selectSelectedComponent = createSelector(
    selectComponentsState,
    (s: ComponentsState) => {
      return s.components.find((c) => c.id === s.selected);
    },
);

export function reducer(state: ComponentsState = initialState, action: ComponentActionType) {

  switch (action.type) {
    case ComponentActionTypes.ADD:
      const { type } = action.payload;
      const details = componentTypes.find((c) => c.type === type);
      if (!details) {
        return state;
      }

      const newComponent: IComponent = {
        id: `${type}${state.components.length}`,
        type: type,
        coordinates: {
          x: 0,
          y: 0,
        },
        dimensions: {
          width: details.defaultWidth,
          height: details.defaultHeight,
        },
        attributes: {...details.attributes},
      };
      return {
        ...state,
        components: [...state.components, newComponent],
        selected: newComponent.id,
      };

    case ComponentActionTypes.MOVE: {
      const { id, coordinates } = action.payload;
      const compIndex = state.components.findIndex((c) => c.id === id);
      const updatedComponents = [...state.components];
      updatedComponents.splice(compIndex, 1, { ...state.components[compIndex], coordinates });
      return { ...state, components: updatedComponents };
    }

    case ComponentActionTypes.EDIT: {
      const { id, attributes } = action.payload;
      const compIndex = state.components.findIndex((c) => c.id === id);
      const updatedComponents = [...state.components];
      updatedComponents.splice(compIndex, 1, { ...state.components[compIndex], attributes });
      return { ...state, components: updatedComponents };
    }

    case ComponentActionTypes.DELETE: {
      const { id } = action.payload;
      const compIndex = state.components.findIndex((c) => c.id === id);
      const updatedComponents = [...state.components];
      updatedComponents.splice(compIndex, 1);
      return { ...state, components: updatedComponents };
    }

    case ComponentActionTypes.SELECT:
      return { ...state, selected: action.payload.id };

    default:
      return state;
  }

}