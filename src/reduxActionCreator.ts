import { ActionOptions, ApiActions } from './reduxHelperTypes';

import createReduxTool from './reduxTool';

/** Api actions had been created by restful-action-creator*/
export const createActions = <TActions extends ApiActions>(
  apis: TActions,
  options: ActionOptions = {}
) => {
  const name = apis.name || options.prefix;
  if (!name) throw 'prefix and Api.name are empty.';

  const tool = createReduxTool(`${name.toUpperCase()}@`);
  const actions = { name: `${name}Actions` };

  //Add action from Api.
  Object.keys(apis).forEach(key => {
    const action = apis[key] as Function;
    if (typeof action !== 'function') return;

    actions[key] = tool.createAsyncAction(key.toUpperCase(), action);
  });

  return <TActions>actions;
};
