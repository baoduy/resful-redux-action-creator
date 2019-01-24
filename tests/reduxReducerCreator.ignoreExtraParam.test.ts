import { createActions, createReducer } from '../src';

import postApi from './api/postApi';

describe('Test Reducer Creator', () => {
  test('Test Create Redux Real Get All', async () => {
    const defaultDataGetter = (_s: any, { payload }: any) => payload;
    const dataGetter = (_s: any, { payload }: any) => payload;

    const actions = createActions(postApi, { ignoreExtraParam: true });
    const reducer = createReducer(actions, {
      defaultData: {},
      dataGetters: {
        [actions.get as any]: dataGetter
      },
      defaultDataGetter
    });

    if (typeof actions.get === 'function') {
      const result = await actions.get()(jest.fn());

      const rs = reducer({}, actions.get.success(result.data));
      expect(rs).toMatchSnapshot();
    }
  });

  test('Test Create Redux Real Reducer', async () => {
    const defaultDataGetter = (_s: any, { payload }: any) => payload;
    const dataGetter = (_s: any, { payload }: any) => payload;

    const actions = createActions(postApi, { ignoreExtraParam: true });
    const reducer = createReducer(actions, {
      defaultData: {},
      dataGetters: {
        [actions.get as any]: dataGetter
      },
      defaultDataGetter
    });

    if (typeof actions.getById === 'function') {
      const result = await actions.getById(10)(jest.fn());

      const rs = reducer({}, actions.getById.success(result.data));
      expect(rs).toMatchSnapshot();
    }
  });
});
