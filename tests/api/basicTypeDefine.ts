import { AxiosPromise } from 'axios';
import { RestActionCollection } from '../../src/reduxDefinition';

export interface DefaultApisType<T = any> extends RestActionCollection<T> {
  name: string;
  get: (filter?: any) => AxiosPromise<T>;
  /** Get item ny number */
  getBynumber: (number: number) => AxiosPromise<T>;
  /** Archive or Soft-Delete item */
  archive: (number: number) => AxiosPromise<T>;
  /** Delete item by number */
  delete: (data: T | number) => AxiosPromise<T>;
  /** Create new item */
  create: (data: T) => AxiosPromise<T>;
  /** Update item */
  update: (data: T) => AxiosPromise<T>;
  //Local Actions
  /** Clear all items from Redux store */
  clear: () => Promise<void>;
  /** Remove item from Redux store by number*/
  removeItem: (number: number) => Promise<T>;
  /** Set view details number to redux store which will be used by Details Screen */
  viewDetails: (number: number) => Promise<any>;
  /** Clear View Details Status */
  clearViewDetails: () => Promise<any>;
  /**  Set edit number to redux store which will be used by Edit Screen */
  editItem: (number: number) => Promise<any>;
  /** Clear View Details Status */
  clearEditItem: () => Promise<any>;
  /**  Create New item status redux store which will be used by Create New Screen */
  newItem: () => Promise<any>;
  /** Clear View Details Status */
  clearNewItem: () => Promise<any>;
  /**  Create New item status redux store which will be used by Delete Screen */
  deleteItem: (number: number) => Promise<any>;
  /** Clear Delete Status */
  clearDeleteItem: () => Promise<any>;
}
