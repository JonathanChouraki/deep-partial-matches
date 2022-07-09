import {
  all, compose, equals, mapObjIndexed, values, path, is, flatten, cond, map, identity, T, addIndex,
} from 'ramda';

const mapIndexed = addIndex(map);

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
      is(Array),
      compose(
        values,
        mapIndexed(
          (v, index) => mapObjectToMatch(objectToMatch, [...currentPath, key, index])(v),
        ),
      ),
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
