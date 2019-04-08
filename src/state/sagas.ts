import { all, debounce, select } from 'redux-saga/effects';
import { AppState } from '../state/types';


const key = 'retool';
export const localStore = {
  get() {
    const res = localStorage.getItem(key);
    return res ? JSON.parse(res) : {};
  },
  set(s: AppState) {
    localStorage.setItem(key, JSON.stringify(s))
  }
};


function* persistData() {
  yield debounce(1000, '*', function*() {
    const state = yield select();
    localStore.set(state);
  });
}

export function* sagas() {
  yield all([
      persistData(),
  ]);
}