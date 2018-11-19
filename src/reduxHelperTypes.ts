import { AxiosPromise, AxiosResponse } from 'axios';
import { AnyAction } from 'redux';

export type DataGetterFunc = (state: any, action: any) => any;
export type MetaGetterFunc = (api: Function) => any;
export type DispatchableFunc<T> = (dispatch: any) => Promise<T>;

export interface ApiFunc extends Function {
  success: Function;
  failure: Function;
  progress: Function;
  cancel: Function;
}

export type ApiActionType<T> =
  | AxiosPromise<Array<T>>
  | Promise<T>
  | AnyAction
  | DispatchableFunc<T>
  | DispatchableFunc<AxiosResponse<T>>;

/** API actions */
export interface ApiActions {
  name: string;
  [key: string]: Function | string | any;
}

export interface ReducerFunc extends Function {
  reducers: Array<Function>;
  actionName: string;
}

interface dataGetterOption {
  [key: string]: DataGetterFunc | false;
}

export type ReducerOptions = {
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
