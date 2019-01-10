import {
  DataItem,
  IdSelectorFunc,
  Item,
  MergeDataOptions,
  Spread
} from './reduxHelperTypes';
import {
  removeItemsById,
  updateItemsById,
  updateObjectProperties,
  upsertItemsById
} from 'redux-toolbelt-immutable-helpers';

import defaultIdSelector from 'redux-toolbelt-immutable-helpers/lib/defaultIdSelector';

/**
 * Insert or Update array from array based on idSelector,
 * @param original The original array
 * @param latest The latest array contains list items which will be update or insert to the original array.
 * @param idSelector default is item => item.id
 */
const upsertItems = <T extends Item, S extends Item>(
  original: Array<T>,
  latest: Array<S>,
  idSelector?: IdSelectorFunc
): Array<T> => {
  const final = upsertItemsById(original, latest, idSelector);
  return updateItemsById(final, latest, idSelector);
};

/**
 * Remove items from array based on Id field
 * @param original The original array
 * @param id the list of id or just an Id will be remove from original array.
 * @param idSelector default is item => item.id
 */
export const removeItems = <T extends Item>(
  original: Array<T> | undefined,
  id: Item | Array<Item>,
  idSelector?: IdSelectorFunc
) =>
  original
    ? removeItemsById(original, Array.isArray(id) ? id : [id], idSelector)
    : [];

/** The helper to mege data props from payload to redux state. The data props is defined by redix-toolbelt.
 * Array properties will be merge based on 'id' field. if don't have id file the provide the id selector.
 */
export const mergeData = <T extends Item, S extends Item>(
  original?: DataItem<T>,
  latest?: DataItem<S>,
  options: MergeDataOptions = { idSelector: defaultIdSelector }
): DataItem<Spread<T, S>> | undefined => {
  if (!latest) return <DataItem<Spread<T, S>>>original;
  if (!original) return <DataItem<Spread<T, S>>>latest;

  if (Array.isArray(original) && Array.isArray(latest))
    return <DataItem<Spread<T, S>>>(
      upsertItems(original, latest, options.idSelector)
    );

  let arrayObj = {};
  let propsTobeUpdate = new Array<string>();

  //Merge Array Based Id
  Object.keys(latest).forEach(k => {
    if (!Array.isArray(latest[k])) {
      propsTobeUpdate.push(k);
      return;
    }

    const lArray = latest[k];
    const oArray = original[k];

    arrayObj[k] = upsertItems(oArray, lArray, options.idSelector);
  });

  //update properties
  const lasteData = updateObjectProperties(
    original,
    propsTobeUpdate,
    (value: any, prop: string) => {
      if (!options.valueSelector) return latest[prop];
      return options.valueSelector(prop, value, latest[prop]);
    }
  );

  return updateObjectProperties(lasteData, arrayObj);
};
