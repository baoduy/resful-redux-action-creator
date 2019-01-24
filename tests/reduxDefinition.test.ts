import { mergeData } from '../src/reduxStateHelper';

test('Spread Props of 2 objects', () => {
  const a = { id: 0, name: 1, items: [] };
  const b = { code: 0, fullName: 1, items: [] };

  const c = mergeData(a, b);

  expect(c).toBeDefined();
});
