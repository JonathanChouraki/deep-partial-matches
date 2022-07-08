import assert from 'assert';
import { describe, it } from 'mocha';
import deepPartialMatches from '../src/matches';

describe('deep partial matches', () => {
  it('should partial matches', () => {
    const obj1 = {
      a: '1',
      b: '2',
      c: {
        1: 'a',
        2: {},
      },
      d: ['a', 'b', { a: '1' }],
      e: null,
    };

    const obj2 = {
      a: '1',
      b: '2',
      c: {
        1: 'a',
        2: {
          x: '1',
          y: '2',
        },
      },
      d: ['a', 'b', { a: '1' }, 'c'],
      e: null,
    };

    const result = deepPartialMatches(obj1)(obj2);
    const expected = true;
    assert.equal(result, expected);
  });
});
