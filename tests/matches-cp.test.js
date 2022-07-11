import assert from 'assert';
import { describe, it } from 'mocha';
import deepPartialMatches from '../src/matches2';

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

    const result = deepPartialMatches(obj2)(obj1);
    const expected = true;
    assert.equal(result, expected);
  });
  it('MATCHING CASE - should partial matche two simple objects', () => {
    const objectA = {
      a: '1',
      b: '2',
      c: 45,
      d: null,
    };

    const objectB = {
      a: '1',
      b: '2',
      c: 45,
      d: null,
      e: true,
    };

    const result = deepPartialMatches(objectB)(objectA);
    const expected = true;
    assert.equal(result, expected);
  });

  it('UNMATCH CASE - should partial matche two simple objects with arrays', () => {
    const objectA = {
      a: '2',
      b: '2',
      c: 45,
      d: null,
    };

    const objectB = {
      a: '1',
      b: '2',
      c: 45,
      d: null,
      e: true,
    };

    const result = deepPartialMatches(objectB)(objectA);
    const expected = false;
    assert.equal(result, expected);
  });
  it('MATCHING CASE - should partial matche two nested objects with arrays', () => {
    const objectA = {
      a: '1',
      b: '2',
      c: {
        1: 'a',
        2: {},
      },
      d: ['a', 'b', { a: '1' }],
      e: ['a', 'b', { a: '1' }],
    };

    const objectB = {
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
      e: ['a', 'b', { a: '1' }, 'c'],
    };

    const result = deepPartialMatches(objectB)(objectA);
    const expected = true;
    assert.equal(result, expected);
  });

  it('UNMATCH CASE - should partial matche two nested objects with arrays', () => {
    const objectA = {
      a: '1',
      b: '2',
      c: {
        1: 'a',
        2: {},
      },
      d: ['a', 'b', { a: false }],
      e: ['a', 'b', { a: '1' }],
    };

    const objectB = {
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
      e: ['a', 'b', { a: '1' }, 'c'],
    };

    const result = deepPartialMatches(objectB)(objectA);
    const expected = false;
    assert.equal(result, expected);
  });
});
