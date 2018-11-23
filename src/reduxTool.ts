import { makeThunkAsyncActionCreator } from 'redux-toolbelt-thunk';
import makeAsyncReducer from 'redux-toolbelt/lib/makeAsyncReducer';
import makeActionCreator from 'redux-toolbelt/lib/makeActionCreator';
import makeReducer from 'redux-toolbelt/lib/makeReducer';
import composeReducers from 'redux-toolbelt/lib/composeReducers';

/** The action creator for both async and non async action */
export default (prefix: string) => ({
  /** Create Async action */
  createAsyncAction: makeThunkAsyncActionCreator.withDefaults({
    prefix
  }),
  /** Create non async action */
  createAction: makeActionCreator.withDefaults({
    prefix
  }),
  /** Create reducer for async actions */
  createAsyncReducer: makeAsyncReducer,
  /** Create reducer for non async actions */
  createReducer: makeReducer,
  /** Create combined reducers to single reducer */
  createComposeReducer: composeReducers
});
