import { createActions } from '../src';
import postApi from './api/postApi';

describe('Test Customer Api Action Creator', () => {
  test('Create postApi without clear action', () => {
    const result = createActions(postApi);

    expect(result).toMatchSnapshot();
    expect(Object.keys(result)).toMatchObject(Object.keys(postApi));

    Object.keys(result).forEach(k => {
      if (typeof result[k] !== 'function') return;
      expect(result[k].success.TYPE).toMatchSnapshot();
    });
  });

  test('Create Api without name', () => {
    const api = { ...postApi };
    api.name = '';
    expect(() => createActions(api)).toThrowError();
  });

  test('Create Api without option', () => {
    const api = { ...postApi };
    api.name = '';

    expect(createActions(api, { prefix: 'A' })).toMatchSnapshot();
  });
});
