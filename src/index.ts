/**
 * The method to create Reducer from Actions
 */
export { createReducer } from './reduxReducerCreator';

/**
 * The method to create Redux Actions from Api Actions crated by 'restful-action-creator'
 */
export { createActions } from './reduxActionCreator';

/**
 * The state helper methods. allow to merge Data from Payload to State.
 * This method design to work with 'welldone-software/redux-toolbelt'
 */
export { mergeData, removeItems } from './reduxStateHelper';
