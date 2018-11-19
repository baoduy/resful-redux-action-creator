import { createActions, createReducer } from '../../src/reduxHelpers';
import { CustomerApi } from '../../src/api';

describe('Test Reducer Creator', () => {
  test('Test Create Redux without dataGetter', () => {
    const dataGetter = jest.fn();

    const actions = createActions(CustomerApi);

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

    const actions = createActions(CustomerApi);
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
      const action = actions[k];
      if (typeof action !== 'function') return;

      const rs = reducer({}, action.success({ name: 'Duy' }));
      // expect(rs).toMatchSnapshot();
    });

    expect(defaultDataGetter).toHaveBeenCalled();
    expect(dataGetter).toHaveBeenCalledTimes(1);
  });

  test('Test Create Redux Real Reducer', () => {
    const defaultDataGetter = (s, { payload }) => payload;
    const dataGetter = (s, { payload }) => payload;

    const actions = createActions(CustomerApi);
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
});
