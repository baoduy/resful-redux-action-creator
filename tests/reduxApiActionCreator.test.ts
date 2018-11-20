import { createActions } from '../src';
import { CustomerApi } from '../src/api';

describe('Test Customer Api Action Creator', () => {
  test('Create CustomerApi without clear action', () => {
    const result = createActions(CustomerApi);

    expect(result).toMatchSnapshot();
    expect(Object.keys(result)).toMatchObject(Object.keys(CustomerApi));

    Object.keys(result).forEach(k => {
      if (typeof result[k] !== 'function') return;
      expect(result[k].success.TYPE).toMatchSnapshot();
    });
  });
});
