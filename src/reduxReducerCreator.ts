import {
  DataGetterFunc,
  ReducerOptions,
  ReduxActionCollection,
  RestActionCollection
} from './reduxDefinition';

import { Reducer } from 'redux';
import createReduxTool from './reduxTool';
import { mergeData } from './reduxStateHelper';

const ignoreDataGetter: DataGetterFunc = s => s;

const defaultOptions: ReducerOptions = {
  defaultData: {},
  shouldSetError: false,
  shouldSetData: true,
  shouldDestroyData: false,
  shouldDestroyDataOnError: false,
  defaultDataGetter: (s, a) => mergeData(s.data, a.payload.data || a.payload)
};

export const createReducer = <TActions extends RestActionCollection>(
  actions: ReduxActionCollection<TActions>,
  options: ReducerOptions = defaultOptions
) => {
  options = Object.assign({}, defaultOptions, options);
  const name = actions.original.name || options.name;
  if (!name) throw 'name of ReduxActionCollection<TActions> is required';

  const tool = createReduxTool(name);

  const reducers = new Array<Reducer>();

  Object.keys(actions).forEach(key => {
    const ac = actions[key];
    if (typeof ac !== 'function') return;

    let dataGetter: DataGetterFunc | undefined = undefined;

    if (options.dataGetters) {
      //If an Action in dataGettes is false => don't update the Redux store value.
      //The Reducer just return the store back.
      if (options.dataGetters[ac as any] === false)
        dataGetter = ignoreDataGetter;
      //Get the Reducer from dataGetters
      else dataGetter = options.dataGetters[ac as any] as DataGetterFunc;
    }

    //If there is no Reducer found in dataGetters the use defaultDataGetter
    if (!dataGetter) dataGetter = options.defaultDataGetter;

    //There is no Reducer found for action.
    if (!dataGetter)
      throw `There is no dataGetter found for ${key} in ${actions.name}`;

    const reducer = tool.createAsyncReducer(ac, {
      ...options,
      dataGetter: dataGetter
    });

    //Add reducer to collection
    reducers.push(reducer);
  });

  const composeReducer = tool.createComposeReducer(...reducers);
  //(composeReducer as any).actionName = actions.name;
  //(composeReducer as any).reducers = reducers;

  return composeReducer;
};
