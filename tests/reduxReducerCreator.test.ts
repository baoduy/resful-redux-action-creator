import { createActions, createReducer } from '../src';
import postApi, { Post } from './api/postApi';

import { ReduxAction } from '../src/reduxDefinition';

describe('Test Reducer Creator', () => {
  test('Test Create Redux without dataGetter', () => {
    const dataGetter = jest.fn();

    const actions = createActions(postApi);

    const reducer = () =>
      createReducer(actions, {
        defaultData: {},
        dataGetters: {
          [actions.get as any]: dataGetter
        },
        defaultDataGetter: undefined
      });

    expect(reducer).toThrowError();
  });

  test('Test Create Redux Calling Func', () => {
    const defaultDataGetter = jest.fn();
    const dataGetter = jest.fn();

    const actions = createActions(postApi);
    const reducer = createReducer(actions, {
      defaultData: {},
      dataGetters: {
        [actions.get as any]: dataGetter
      },
      defaultDataGetter
    });

    expect(reducer).toMatchSnapshot();
    expect(reducer.reducers).toMatchSnapshot();
    expect(reducer.actionName).toBe(actions.name);

    Object.keys(actions).forEach(k => {
      const action = <ReduxAction<Post>>actions[k];
      if (typeof action !== 'function') return;

      const rs = reducer({}, action.success({ name: 'Duy' }));
      expect(rs).toBeDefined();
    });

    expect(defaultDataGetter).toHaveBeenCalled();
    expect(dataGetter).toHaveBeenCalledTimes(1);
  });

  test('Test Create Redux Real Reducer', () => {
    const defaultDataGetter = (_s: any, { payload }: any) => payload;
    const dataGetter = (_s: any, { payload }: any) => payload;

    const actions = createActions(postApi);
    const reducer = createReducer(actions, {
      defaultData: {},
      dataGetters: {
        [actions.get as any]: dataGetter
      },
      defaultDataGetter
    });

    Object.keys(actions).forEach(k => {
      const action = actions[k];
      if (typeof action !== 'function') return;

      const rs = reducer({}, action.success({ name: 'Duy' }));
      expect(rs).toMatchSnapshot();
    });
  });

  test('Test Create Redux with Ignored Reducer', () => {
    const defaultDataGetter = (s, { payload }) => payload;

    const actions = createActions(postApi);
    const reducer = createReducer(actions, {
      defaultData: {},
      dataGetters: {
        [actions.get as any]: false
      },
      defaultDataGetter
    });

    Object.keys(actions).forEach(k => {
      const action = actions[k];
      if (typeof action !== 'function') return;

      const rs = reducer({}, action.success({ name: 'Duy' }));
      expect(rs).toMatchSnapshot();
    });
  });
});
