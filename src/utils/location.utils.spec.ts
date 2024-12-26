import { describe, expect, it } from 'vitest';
import { isSimilarLocation } from './location.utils';

describe('Location Utils', () => {
  describe('isSimilarLocation', () => {
    it('should properly determine distances between locations', () => {
      const budapest6 = { lat: 47.5134983, lon: 19.0649846 };
      const budapest7 = { lat: 47.501443, lon: 19.075021 };
      expect(isSimilarLocation(budapest6, budapest7)).toBeTruthy();

      const vecses = { lat: 47.405926, lon: 19.258626 };
      expect(isSimilarLocation(budapest6, vecses)).toBeFalsy();

      const zsambok = { lat: 47.54264950960202, lon: 19.607144903616344 };
      const dany = { lat: 47.52277257966394, lon: 19.55684812300936 };
      expect(isSimilarLocation(dany, zsambok)).toBeTruthy();

      const nairobi = { lat: -1.2712870140731503, lon: 36.789373142136355 };
      const pavlohrad = { lat: 48.53929579758578, lon: 35.86726080333544 };
      expect(isSimilarLocation(nairobi, pavlohrad)).toBeFalsy();

      const someLocation1 = { lat: -13.11223, lon: 54.222334 };
      const someLocation2 = { lat: 13.11223, lon: -54.222334 };
      expect(isSimilarLocation(someLocation1, someLocation2)).toBeFalsy();

      const someLocation3 = { lat: -13.11223, lon: -54.222334 };
      const someLocation4 = { lat: 13.11223, lon: 54.222334 };
      expect(isSimilarLocation(someLocation3, someLocation4)).toBeFalsy();
    });
  });
});
