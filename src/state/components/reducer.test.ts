import { ComponentType } from '../../components/component-types';
import { AddComponent, MoveComponent } from './actions';
import { reducer } from './reducer';


describe('Components reducer', () => {

  describe('ComponentActionTypes.ADD', () => {
    const initialState = {
      selected: null,
      components: [],
    };
    let state;

    beforeAll(() => {
      state = reducer(initialState, AddComponent(ComponentType.TEXT));
    });
    it('should add to components array', async () => {
      expect(state.components).toHaveLength(1);
    });
    it('should generate id', async () => {
      const c = state.components[0];
      expect(c.id).toBeTruthy();
    });
    it('should default coordinates', async () => {
      const c = state.components[0];
      expect(c.coordinates).toMatchObject({ x: 0, y: 0});
    });

  });

  describe('ComponentActionTypes.MOVE', () => {
    const initialState = {
      selected: null,
      components: [{
        id: '123',
        type: ComponentType.TEXT,
        coordinates: { x: 0, y: 0 },
        dimensions: { width: 1, height: 1 },
      }],
    };
    const newCoor = { x: 1, y: 1 };
    let state;

    beforeAll(() => {
      state = reducer(initialState, MoveComponent('123', newCoor));
    });
    it('should update component in array', async () => {
      expect(state.components[0].id).toBe('123');
      expect(state.components[0].coordinates).toMatchObject(newCoor);
    });
    it('should not change array length', async () => {
      expect(state.components).toHaveLength(1);
    });

  });

});