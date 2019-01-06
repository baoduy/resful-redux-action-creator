import * as rest from '../lib';

test('test lib', () => {
  expect(rest.createActions).toBeDefined();
  expect(rest.createReducer).toBeDefined();
  expect(rest.mergeData).toBeDefined();
  expect(rest.removeItems).toBeDefined();
});
