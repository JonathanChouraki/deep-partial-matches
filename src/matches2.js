import {
  all, compose, equals, mapObjIndexed, values, path, is, flatten, cond, map, identity, T, tap,
} from 'ramda';

const recursivelyFlatten = (value) => cond([
  [is(Array), compose(map(recursivelyFlatten), flatten)],
  [T, identity],
])(value);

const mapObjectToMatch = (objectToMatch, currentPath = []) => mapObjIndexed(
  (value, key) => cond([
    [
      is(Object),
      compose(values, mapObjectToMatch(objectToMatch, [...currentPath, key])),
    ],
    [
      T,
      () => compose(
        equals(value),
        path([...currentPath, key]),
      )(objectToMatch),
    ],
  ])(value),
);

const deepPartialMatches = (objectToMatch) => compose(
  all(equals(true)),
  recursivelyFlatten,
  values,
  mapObjectToMatch(objectToMatch),
);

export default deepPartialMatches;
