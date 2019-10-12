import { Action, AnyAction, Dispatch, Reducer } from 'redux';
import { AxiosPromise, AxiosResponse } from 'axios';

import { AsyncActionCreator } from 'redux-toolbelt';

export type DataGetterFunc = (state: any, action: any) => any;
export type MetaGetterFunc = (api: Function) => any;

export type DispatchableFunc<T = any> = (
  dispatch: Dispatch<AnyAction>
) => Promise<T> | AxiosResponse<T>;

type RestActionWithParams<T = any> = (
  ...params: Array<any>
) => AxiosPromise<T> | Promise<T>;

type RestActionWithoutParams = () => AxiosPromise<void> | Promise<void>;

export type RestAction<T = any> =
  | RestActionWithParams<T>
  | RestActionWithoutParams;

export interface Item {
  id?: string | number;
  name?: string | number;
  [key: string]: any;
}

export type MetaDataItem<T = any> = { items?: Array<T>; [key: string]: any };
export type DataItem<T = any> = Array<T> | MetaDataItem<T>;

// Names of properties in T with types that include undefined
// type OptionalPropertyNames<T> = {
//   [K in keyof T]: undefined extends T[K] ? K : never
// }[keyof T];

// Common properties from L and R with undefined in R[K] replaced by type in L[K]
// type SpreadProperties<L, R, K extends keyof L & keyof R> = {
//   [P in K]: L[P] | Exclude<R[P], undefined>
// };

// type Props<T> = { [K in keyof T]: T[K] };

// export type Spread<L, R> = Props<
//   Pick<L, Exclude<keyof L, keyof R>> &
//     Pick<R, Exclude<keyof R, OptionalPropertyNames<R>>> &
//     Pick<R, Exclude<OptionalPropertyNames<R>, keyof L>> &
//     SpreadProperties<L, R, OptionalPropertyNames<R> & keyof L>
// >;

export interface RestActionCollection<T extends Action = any> {
  name: string | undefined;
  [key: string]: string | AsyncActionCreator<T> | undefined;
}

export interface ReduxAction<T = any> extends AnyAction {
  (...params: Array<any>): DispatchableFunc<T>;
  success: (...params: Array<any>) => RestAction<T>;
  failure: (...params: Array<any>) => RestAction<T>;
  progress: (...params: Array<any>) => RestAction<T>;
  cancel: (...params: Array<any>) => RestAction<T>;
}

export type ReduxActionCollection<
  TActions extends RestActionCollection<any>
> = { [K in keyof TActions]: AsyncActionCreator<any> } & {
  /** The original RestActionCollection */
  original: TActions;
};

export interface ReducerFunc<S = any, A extends ReduxAction = any>
  extends Reducer<S, A> {
  (state: S, action: A): S;
  reducers: Array<ReduxAction>;
  actionName: string;
}

export interface dataGetterOption {
  [key: string]: DataGetterFunc | false;
}

export type ReducerOptions = {
  name?: string;
  meta?: MetaGetterFunc;
  defaultData: any;
  shouldSpread?: boolean;
  /** Set of dataGetters for each actions {[action]:dataGetter,...}.
   If dataGetter for a action is not found the defaultDataGetter will be picked up */
  dataGetters?: dataGetterOption /** default DataGetter for actions */;
  defaultDataGetter?: DataGetterFunc;
  dataProp?: string;
  shouldDestroyData?: boolean;
  shouldDestroyDataOnError?: boolean;
  shouldSetError?: boolean;
  shouldSetData?: boolean;
};

export interface ActionOptions {
  prefix?: string;
  /** Ignore the extract parameter of redux belt {getState, dispatch, extraThunkArg}.
   * The last parameter will be drop before pass to asyncFunc
   */

  ignoreExtraParam?: boolean;
}

export type IdSelectorFunc = <T>(item: T) => any;

export type ValueSelector = <T>(
  prop: string,
  originalValue: T,
  latestValue: T
) => any;

export type DataPropSelector = <T>(data: T) => any;

export interface MergeDataOptions {
  /** value transformer allows to convert, format and apply the calculation for final value from original value and latest value which can be identified via prop name.
   * this will be used for updateObjectProperties execution
   */
  valueSelector?: ValueSelector;
  /** Provide the Id selector if array doesn't have id field.
   * this use be used for upsertItemsById execution.
   */
  idSelector?: IdSelectorFunc;
}

export interface MergeStateOptions extends MergeDataOptions {
  /** provide a Data prop selector and transform for action.playload.data */
  actionDataPropSelector?: DataPropSelector;
}
