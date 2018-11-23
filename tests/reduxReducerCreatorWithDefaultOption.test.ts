import { createActions, createReducer } from '../src';

import postApi from './api/postApi';

describe('Test Reducer Creator with Default Option and defaultState', () => {
  const defaultState = { data: { items: [{ id: 1, name: 'Steven' }] } };

  const actions = createActions(postApi);
  const reducer = createReducer(actions, {
    defaultData: defaultState
  });

  test('Get All', () => {
    const rs = reducer(
      defaultState,
      (actions.get as any).success({
        name: 'Duy',
        items: [{ id: 1, name: 'Duy' }, { id: 2, name: 'Hoang' }]
      })
    );

    expect(rs.data.items.length).toBe(2);
    expect(rs).toMatchSnapshot();
  });

  test('Get By ID', () => {
    const rs = reducer(
      defaultState,
      (actions.getById as any).success({ items: [{ id: 3, name: 'Bao' }] })
    );

    expect(rs.data.items.length).toBe(2);
    expect(rs).toMatchSnapshot();
  });
});

describe('Test Reducer Creator with Default Option and empty State', () => {
  const defaultState = {};
  const actions = createActions(postApi);
  const reducer = createReducer(actions, {
    defaultData: defaultState
  });

  test('Get All', () => {
    const rs = reducer(
      defaultState,
      (actions.get as any).success({
        name: 'Duy',
        items: [{ id: 1, name: 'Duy' }, { id: 2, name: 'Hoang' }]
      })
    );

    expect(rs.data.items.length).toBe(2);
    expect(rs).toMatchSnapshot();
  });

  test('Get By ID', () => {
    const rs = reducer(
      defaultState,
      (actions.getById as any).success({ items: [{ id: 3, name: 'Bao' }] })
    );

    expect(rs.data.items.length).toBe(1);
    expect(rs).toMatchSnapshot();
  });
});
