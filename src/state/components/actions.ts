import { Coordinate, Dimensions } from '../../types';
import { ComponentType, IComponentDetails } from '../../components/component-types';

export enum ComponentActionTypes {
  ADD = '[Component] Add',
  MOVE = '[Component] Move',
  SELECT = '[Component] Select',
  EDIT = '[Component] Edit',
  DELETE = '[Component] Delete',
}

export interface IComponent {
  id: string;
  type: ComponentType;
  coordinates: {
    x: number;
    y: number;
  },
  dimensions: {
    width: number;
    height: number;
  }
  attributes?: {
    [key: string]: any
  }
}

interface IAddComponent {
  type: ComponentActionTypes.ADD,
  payload: { type: ComponentType },
}
export const AddComponent = (type: ComponentType): IAddComponent => ({
  type: ComponentActionTypes.ADD,
  payload: { type },
});

interface IMoveComponent {
  type: ComponentActionTypes.MOVE,
  payload: {
    id: string,
    coordinates: { x: number; y: number },
  },
}
export const MoveComponent = (id: string, coordinates: Coordinate): IMoveComponent => ({
  type: ComponentActionTypes.MOVE,
  payload: { id, coordinates },
});

interface ISelectComponent {
  type: ComponentActionTypes.SELECT,
  payload: { id: string | null },
}
export const SelectComponent = (id: string | null): ISelectComponent => ({
  type: ComponentActionTypes.SELECT,
  payload: { id },
});

interface IEditComponent {
  type: ComponentActionTypes.EDIT,
  payload: { id: string, attributes: any },
}
export const EditComponent = (id: string, attributes: any): IEditComponent => ({
  type: ComponentActionTypes.EDIT,
  payload: { id, attributes },
});

interface IDeleteComponent {
  type: ComponentActionTypes.DELETE,
  payload: { id: string | null },
}
export const DeleteComponent = (id: string): IDeleteComponent => ({
  type: ComponentActionTypes.DELETE,
  payload: { id },
});

export type ComponentActionType = IAddComponent
    | IMoveComponent
    | ISelectComponent
    | IEditComponent
    | IDeleteComponent;
