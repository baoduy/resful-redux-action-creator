import {
  ActionOptions,
  ReduxAction,
  ReduxActionCollection,
  RestActionCollection
} from './reduxDefinition';

import createReduxTool from './reduxTool';

/** Api actions had been created by restful-action-creator*/
export const createActions = <TActions extends RestActionCollection>(
  restActions: TActions,
  options: ActionOptions = {}
): ReduxActionCollection<TActions> => {
  const name = restActions.name || options.prefix;
  if (!name) throw 'prefix and Api.name are empty.';

  const tool = createReduxTool(`${name.toUpperCase()}@`);
  const actions = { name: `${name}Actions` };

  //Add action from Api.
  Object.keys(restActions).forEach(key => {
    const action = restActions[key];
    if (typeof action !== 'function') return;

    actions[key] = <ReduxAction<any>>(
      tool.createAsyncAction(key.toUpperCase(), action)
    );
  });

  return <ReduxActionCollection<TActions>>actions;
};
