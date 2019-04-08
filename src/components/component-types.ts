export enum ComponentType {
  TEXT = 'text',
  BUTTON = 'button',
  TABLE = 'table',
  DROPDOWN = 'dropdown',
}

export interface IComponentDetails {
  type: ComponentType,
  name: string;
  description: string;
  icon: string;

  defaultWidth: number,
  defaultHeight: number,
  attributes: {
    [key: string]: any;
  }
}

export const componentTypes: IComponentDetails[] = [
  {
    type: ComponentType.TEXT,
    name: 'Text',
    description: 'Enter some text!',
    icon: 'edit',

    defaultWidth: 4,
    defaultHeight: 1,
    attributes: {
      value: '',
      label: 'Some Text',
    },
  },
  {
    type: ComponentType.BUTTON,
    name: 'Button',
    description: 'Submit an action!',
    icon: 'select',

    defaultWidth: 3,
    defaultHeight: 1,
    attributes: {
      label: 'Some Text',
    },
  },
  {
    type: ComponentType.TABLE,
    name: 'Table',
    description: 'Display a collection of data',
    icon: 'table',

    defaultWidth: 12,
    defaultHeight: 5,
    attributes: {},
  },
  {
    type: ComponentType.DROPDOWN,
    name: 'Dropdown',
    description: 'Select from a set of options',
    icon: 'bars',
    defaultWidth: 3,
    defaultHeight: 1,
    attributes: {
      value: '1',
      options: '1,2,3',
    },
  },
];
