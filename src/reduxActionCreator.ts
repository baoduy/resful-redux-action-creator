import {
  ActionOptions,
  ReduxActionCollection,
  RestActionCollection
} from './reduxDefinition';

import createReduxTool from './reduxTool';

const ignoreExtraParam = <TAsyncFunc extends Function>(
  asyncFunc: TAsyncFunc
) => (...args: Array<any>) => {
  if (args.length > 0) args[args.length - 1] = undefined;
  return asyncFunc(...args);
};
/** Api actions had been created by restful-action-creator*/
export const createActions = <TActions extends RestActionCollection>(
  restActions: TActions,
  options: ActionOptions = {}
): ReduxActionCollection<TActions> => {
  const name = restActions.name || options.prefix;
  if (!name) throw 'prefix and Api.name are empty.';

  const tool = createReduxTool(`${name.toUpperCase()}@`);
  const actions = { original: restActions };

  //Add action from Api.
  Object.keys(restActions).forEach(key => {
    const action = restActions[key];
    if (typeof action !== 'function') return;

    actions[key] = tool.createAsyncAction(
      key.toUpperCase(),
      options.ignoreExtraParam ? ignoreExtraParam(action) : action,
      {}
    );
  });

  return <ReduxActionCollection<TActions>>actions;
};
