import {
  upsertItemsById,
  updateItemsById,
  updateObjectProperties,
  removeItemsById
} from 'redux-toolbelt-immutable-helpers';
import { MergeDataOptions, IdSelectorFunc } from './reduxHelperTypes';

export interface Item {
  id: string | number;
}

/**
 * Insert or Update array from array based on idSelector,
 * @param original The original array
 * @param latest The latest array contains list items which will be update or insert to the original array.
 * @param idSelector default is item => item.id
 */
const upsertItems = <T extends Item>(
  original: Array<T>,
  latest: Array<T>,
  idSelector?: IdSelectorFunc
): Array<T> => {
  const final = upsertItemsById(original, latest, idSelector);
  return updateItemsById(final, latest, idSelector);
};

/** The helper to mege data props from payload to redux state. The data props is defined by redix-toolbelt.
 * Array properties will be merge based on 'id' field. if don't have id file the provide the id selector.
 */
export const mergeData = (
  original: any,
  latest: any,
  options: MergeDataOptions = { idSelector: i => i.id }
) => {
  if (!latest) return original;
  if (!original) return latest;

  if (Array.isArray(latest) || Array.isArray(original))
    return upsertItems(original, latest, options.idSelector);

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

/**
 * Remove items from array based on Id field
 * @param original The original array
 * @param id the list of id or just an Id will be remove from original array.
 * @param idSelector default is item => item.id
 */
export const removeItems = <T extends Item>(
  original: Array<T>,
  id: Item | Array<Item>,
  idSelector?: IdSelectorFunc
) =>
  original
    ? removeItemsById(original, Array.isArray(id) ? id : [id], idSelector)
    : [];

// export const mergeState = (
//   state: any,
//   action: any,
//   options: MergeStateOptions = {}
// ) => {
//   const { data, ...others } = action.payload;

//   const newData = mergeData(
//     state.data,
//     options.actionDataPropSelector
//       ? options.actionDataPropSelector(data)
//       : data,
//     options
//   );
//   const newState = updateObjectProperties(state, others);
//   newState.data = newData;
//   return newState;
// };
