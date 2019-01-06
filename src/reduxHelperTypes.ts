import { AnyAction, Dispatch, Reducer } from 'redux';
import { AxiosPromise, AxiosResponse } from 'axios';

export type DataGetterFunc = (state: any, action: any) => any;
export type MetaGetterFunc = (api: Function) => any;
export type DispatchableFunc<T> = (dispatch: Dispatch<AnyAction>) => Promise<T>;

export type NamedObj = { name: string };

export type RestAction<T = any> = (
  ...params: Array<any>
) => AxiosPromise<T> | Promise<T>;

export interface RestActionCollection extends NamedObj {
  [key: string]: string | RestAction | undefined;
}

export interface ReduxAction<T = any> extends AnyAction {
  (...params: Array<any>):
    | DispatchableFunc<T>
    | DispatchableFunc<AxiosResponse<T>>;
  success: (...params: Array<any>) => RestAction<T>;
  failure: (...params: Array<any>) => RestAction<T>;
  progress: (...params: Array<any>) => RestAction<T>;
  cancel: (...params: Array<any>) => RestAction<T>;
}

export type ReduxActionCollection<TActions extends RestActionCollection> = {
  [K in keyof TActions]: string | ReduxAction | undefined
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
}

export type IdSelectorFunc = (item: any) => any;

type ValueSelector = (
  prop: string,
  originalValue: any,
  latestValue: any
) => any;
type DataPropSelector = (data: any) => any;

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
