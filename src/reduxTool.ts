import composeReducers from 'redux-toolbelt/lib/composeReducers';
import makeAsyncReducer from 'redux-toolbelt/lib/makeAsyncReducer';
import { makeThunkAsyncActionCreator } from 'redux-toolbelt-thunk';

//import makeActionCreator from 'redux-toolbelt/lib/makeActionCreator';
//import makeReducer from 'redux-toolbelt/lib/makeReducer';
const argsMapper = (payload: any, meta: any) => ({ payload, meta });

/** The action creator for both async and non async action */
export default (prefix: string) => ({
  /** Create Async action */
  createAsyncAction: makeThunkAsyncActionCreator.withDefaults({
    prefix,
    argsMapper
  }),
  /** Create non async action */
  // createAction: makeActionCreator.withDefaults({
  //   prefix
  // }),
  /** Create reducer for async actions */
  createAsyncReducer: makeAsyncReducer,
  /** Create reducer for non async actions */
  //createReducer: makeReducer,
  /** Create combined reducers to single reducer */
  createComposeReducer: composeReducers
});
