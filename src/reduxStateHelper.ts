import {
  DataItem,
  IdSelectorFunc,
  Item,
  MergeDataOptions
} from './reduxDefinition';
import {
  removeItemsById,
  updateObjectProperties,
  upsertItemsById
} from 'redux-toolbelt-immutable-helpers';

import updateItemsById from 'redux-toolbelt-immutable-helpers/lib/updateItemsById';

const defaultIdSelector = (item: Item) => item.id || item.name;

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
  const update: any = updateItemsById;
  const final = upsertItemsById(original, latest, idSelector);
  return update(final, latest, idSelector);
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

/** The helper to merge data props from payload to redux state. The data props is defined by redux-toolbelt.
 * Array properties will be merge based on 'id' field. if don't have id file the provide the id selector.
 */
export const mergeData = <T extends Item, S extends T>(
  original?: DataItem<T>,
  latest?: DataItem<S>,
  options: MergeDataOptions = { idSelector: defaultIdSelector }
) => {
  if (!latest) return original as any;
  if (!original) return latest as any;

  if (Array.isArray(original) && Array.isArray(latest))
    return upsertItems(original, latest, options.idSelector) as DataItem<S>;

  let arrayObj = {};
  let propsToBeUpdate = new Array<string>();

  //Merge Array Based Id
  Object.keys(latest).forEach(k => {
    if (!Array.isArray(latest[k])) {
      propsToBeUpdate.push(k);
      return;
    }

    const lArray = latest[k];
    const oArray = original[k];

    arrayObj[k] = upsertItems(oArray, lArray, options.idSelector);
  });

  //update properties
  const latestData = updateObjectProperties(
    original,
    propsToBeUpdate,
    (value: any, prop: string) => {
      if (!options.valueSelector) return latest[prop];
      return options.valueSelector(prop, value, latest[prop]);
    }
  );

  return { ...latestData, ...arrayObj };
};
