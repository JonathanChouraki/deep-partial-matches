import assert from 'assert';
import { describe, it } from 'mocha';
import deepPartialMatches from '../src/matches2';

describe('deep partial matches', () => {
  describe('simple object', () => {
    it('should partial matches simple object', () => {
      const obj1 = {
        a: '1',
      };

      const obj2 = {
        a: '1',
        b: '2',
      };

      const result = deepPartialMatches(obj2)(obj1);
      const expected = true;
      assert.equal(result, expected);
    });

    it('should partial matches simple object with two props', () => {
      const obj1 = {
        a: 1,
        b: '2',
      };

      const obj2 = {
        a: 1,
        b: '2',
      };

      const result = deepPartialMatches(obj2)(obj1);
      const expected = true;
      assert.equal(result, expected);
    });

    it('should not matches simple object when key are different', () => {
      const obj1 = {
        a: '1',
      };

      const obj2 = {
        b: '2',
      };

      const result = deepPartialMatches(obj2)(obj1);
      const expected = false;
      assert.equal(result, expected);
    });

    it('should not matches simple object when value are different', () => {
      const obj1 = {
        a: '1',
      };

      const obj2 = {
        a: 1,
      };

      const result = deepPartialMatches(obj2)(obj1);
      const expected = false;
      assert.equal(result, expected);
    });

    it('should not matches simple object when some prop are missing', () => {
      const obj1 = {
        a: '1',
        c: '1',
      };

      const obj2 = {
        b: '2',
      };

      const result = deepPartialMatches(obj2)(obj1);
      const expected = false;
      assert.equal(result, expected);
    });
  });

  describe('nested object', () => {
    it('should match nested object', () => {
      const obj1 = {
        a: '1',
        b: {
          c: '1',
        },
      };
      const obj2 = {
        a: '1',
        b: {
          c: '1',
        },
      };
      const result = deepPartialMatches(obj2)(obj1);
      const expected = true;
      assert.equal(result, expected);
    });

    it('should match triple nested object', () => {
      const obj1 = {
        a: '1',
        b: {
          c: '1',
          d: {
            e: '1',
          },
        },
      };
      const obj2 = {
        a: '1',
        b: {
          c: '1',
          d: {
            e: '1',
          },
        },
      };
      const result = deepPartialMatches(obj2)(obj1);
      const expected = true;
      assert.equal(result, expected);
    });

    it('should partial match nested object', () => {
      const obj1 = {
        a: '1',
        b: {
          c: '1',
        },
      };
      const obj2 = {
        a: '1',
        b: {
          c: '1',
          d: '1',
        },
      };
      const result = deepPartialMatches(obj2)(obj1);
      const expected = true;
      assert.equal(result, expected);
    });

    it('should not match when nested object are different', () => {
      const obj1 = {
        a: '1',
        b: {
          c: '1',
        },
      };
      const obj2 = {
        a: '1',
        b: {
          c: '2',
        },
      };
      const result = deepPartialMatches(obj2)(obj1);
      const expected = false;
      assert.equal(result, expected);
    });
  });

  describe('nest array', () => {
    it('should match nested array', () => {
      const obj1 = {
        a: '1',
        b: [1, 2],
      };
      const obj2 = {
        a: '1',
        b: [1, 2],
      };
      const result = deepPartialMatches(obj2)(obj1);
      const expected = true;
      assert.equal(result, expected);
    });

    it('should partial match nested array', () => {
      const obj1 = {
        a: '1',
        b: [1, 2],
      };
      const obj2 = {
        a: '1',
        b: [1, 2, 3],
      };
      const result = deepPartialMatches(obj2)(obj1);
      const expected = true;
      assert.equal(result, expected);
    });

    it('should not match when nested arra are different', () => {
      const obj1 = {
        a: '1',
        b: ['1', '2'],
      };
      const obj2 = {
        a: '1',
        b: ['1', 2],
      };
      const result = deepPartialMatches(obj2)(obj1);
      const expected = false;
      assert.equal(result, expected);
    });
  });
});
