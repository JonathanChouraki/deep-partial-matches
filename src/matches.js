import {
  not, isNil, equals, prop, flatten, filter, all, mapObjIndexed, has, values, propOr,
} from 'ramda';

const deepPartialMatches = (objA) => (objB) => {
  // check if keys in objA is present in objB
  let keyIsNotInObjB;
  mapObjIndexed((obja, keya) => {
    const hasKey = has(keya);
    const isNotInObjB = not(hasKey(objB));
    if (isNotInObjB) keyIsNotInObjB = true;
  }, objA);
  // if a value in ObjA is not in ObjB return false
  if (keyIsNotInObjB) return false;

  // if key/values in ObjA is equals to key/value in ObjB
  // build new object with keys check at true
  // and push values in a new array
  const valuesMatchingArray = values(mapObjIndexed((objb, keyb) => {
    if (typeof objb !== 'object') {
      const valueA = propOr(null, keyb, objA);
      if (not(isNil(valueA))) {
        return equals(valueA, objb);
      }
    }

    // if a value is an object or array, apply deepMatches recursively
    if (typeof objb === 'object') {
      const deepObject = prop(keyb, objA);
      return deepPartialMatches(deepObject)(objb);
    }
  }, objB));
  // flatten the array and remove undefined values
  // (who are push in the array when a value in ObjB is not in ObjA)
  const flattenValuesMatchingArray = flatten(valuesMatchingArray);
  const removeIsNilValue = filter((value) => not(isNil(value)), flattenValuesMatchingArray);

  // check if all values in the array are true or false
  return all(equals(true))(removeIsNilValue);
};

export default deepPartialMatches;
