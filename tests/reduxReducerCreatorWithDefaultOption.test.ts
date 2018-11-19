import { createActions, createReducer } from '../../src/reduxHelpers';
import { CustomerApi } from '../../src/api';
import getDefaultOption from '../../src/actions/DefaultConfigs/DefaultReducerConfig';

describe('Test Reducer Creator with Default Option and defaultState', () => {
  const defaultState = { data: { items: [{ id: 1, name: 'Steven' }] } };

  const actions = createActions(CustomerApi);
  const option = getDefaultOption(actions);
  const reducer = createReducer(actions, option);

  test('Get All', () => {
    const rs = reducer(
      defaultState,
      actions.get.success({
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
      actions.getById.success({ id: 3, name: 'Bao' })
    );

    expect(rs.data.items.length).toBe(2);
    expect(rs).toMatchSnapshot();
  });

  test('Clear', () => {
    const rs = reducer(defaultState, actions.clear.success());

    expect(rs.data.items.length).toBe(0);
    expect(rs).toMatchSnapshot();
  });

  test('Remove By Id', () => {
    const rs = reducer(defaultState, actions.removeItem.success({ id: 1 }));

    expect(rs.data.items.length).toBe(0);
    expect(rs).toMatchSnapshot();
  });
});

describe('Test Reducer Creator with Default Option and empty State', () => {
  const defaultState = {};

  const actions = createActions(CustomerApi);
  const option = getDefaultOption(actions);
  const reducer = createReducer(actions, option);

  test('Get All', () => {
    const rs = reducer(
      defaultState,
      actions.get.success({
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
      actions.getById.success({ id: 3, name: 'Bao' })
    );

    expect(rs.data.items.length).toBe(1);
    expect(rs).toMatchSnapshot();
  });

  test('Clear', () => {
    const rs = reducer(defaultState, actions.clear.success());

    expect(rs.data.items.length).toBe(0);
    expect(rs).toMatchSnapshot();
  });

  test('Remove By Id', () => {
    const rs = reducer(defaultState, actions.removeItem.success({ id: 1 }));

    expect(rs.data.items.length).toBe(0);
    expect(rs).toMatchSnapshot();
  });
});
