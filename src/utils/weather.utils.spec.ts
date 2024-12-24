import { describe, it, expect } from 'vitest';
import {
  getPrecipitation,
  getPrecipitationLh,
  getWindScale,
  transformWeather,
} from './weather.utils';
import weatherJson from './weather.utils.test.json';
import { WeatherIcons } from './weather.types';
import type { Weather } from './weather.types';

describe('Weather Utils', () => {
  describe('getWindScale', () => {
    it('should provide a string for a wind speed value', () => {
      expect(getWindScale(0)).toBe('No wind');
      expect(getWindScale(0.32)).toBe('No wind');
      expect(getWindScale(1)).toBe('No wind');
      expect(getWindScale(-1)).toBe('No wind');
      expect(getWindScale(-123.312)).toBe('No wind');
      expect(getWindScale(undefined)).toBe('No wind');
      expect(getWindScale(1.01)).toBe('Light breeze');
      expect(getWindScale(2)).toBe('Light breeze');
      expect(getWindScale(4)).toBe('Light breeze');
      expect(getWindScale(4.22)).toBe('Light wind');
      expect(getWindScale(6.22)).toBe('Light wind');
      expect(getWindScale(9)).toBe('Light wind');
      expect(getWindScale(9.53)).toBe('Moderate wind');
      expect(getWindScale(13)).toBe('Moderate wind');
      expect(getWindScale(13.5)).toBe('Strong wind');
      expect(getWindScale(19)).toBe('Strong wind');
      expect(getWindScale(19.003)).toBe('Stormy wind');
      expect(getWindScale(22)).toBe('Stormy wind');
      expect(getWindScale(25)).toBe('Crazy wind');
      expect(getWindScale(1000)).toBe('Crazy wind');
    });
  });

  describe('getPrecipitation', () => {
    it('should provide a rounded mm value as string for rain', () => {
      expect(getPrecipitation({ rain: 0 })).toBe(undefined);
      expect(getPrecipitation({ rain: 0.3 })).toBe('<1mm');
      expect(getPrecipitation({ rain: 1 })).toBe('1mm');
      expect(getPrecipitation({ rain: 1.2 })).toBe('1mm');
      expect(getPrecipitation({ rain: 1.5 })).toBe('2mm');
      expect(getPrecipitation({ rain: 1.9 })).toBe('2mm');
      expect(getPrecipitation({ rain: 4 })).toBe('4mm');
    });
    it('should provide a rounded mm value as string for snow', () => {
      expect(getPrecipitation({ snow: 0 })).toBe(undefined);
      expect(getPrecipitation({ snow: 0.3 })).toBe('<1mm');
      expect(getPrecipitation({ snow: 1 })).toBe('1mm');
      expect(getPrecipitation({ snow: 1.2 })).toBe('1mm');
      expect(getPrecipitation({ snow: 1.5 })).toBe('2mm');
      expect(getPrecipitation({ snow: 1.9 })).toBe('2mm');
      expect(getPrecipitation({ snow: 4 })).toBe('4mm');
    });
  });

  describe('getPrecipitationLh', () => {
    it('should provide a rounded mm value as string for last hour rain', () => {
      expect(getPrecipitationLh({ rain: { '1h': 0 } })).toBe('0mm');
      expect(getPrecipitationLh({ rain: { '1h': 0.3 } })).toBe('<1mm');
      expect(getPrecipitationLh({ rain: { '1h': 1 } })).toBe('1mm');
      expect(getPrecipitationLh({ rain: { '1h': 1.2 } })).toBe('1mm');
      expect(getPrecipitationLh({ rain: { '1h': 1.5 } })).toBe('2mm');
      expect(getPrecipitationLh({ rain: { '1h': 1.9 } })).toBe('2mm');
      expect(getPrecipitationLh({ rain: { '1h': 4 } })).toBe('4mm');
    });
    it('should provide a rounded mm value as string for last hour snow', () => {
      expect(getPrecipitationLh({ snow: { '1h': 0 } })).toBe('0mm');
      expect(getPrecipitationLh({ snow: { '1h': 0.3 } })).toBe('<1mm');
      expect(getPrecipitationLh({ snow: { '1h': 1 } })).toBe('1mm');
      expect(getPrecipitationLh({ snow: { '1h': 1.2 } })).toBe('1mm');
      expect(getPrecipitationLh({ snow: { '1h': 1.5 } })).toBe('2mm');
      expect(getPrecipitationLh({ snow: { '1h': 1.9 } })).toBe('2mm');
      expect(getPrecipitationLh({ snow: { '1h': 4 } })).toBe('4mm');
    });
  });

  describe('transformWeather', () => {
    it('should properly transform the weather response to Weather object', () => {
      const weather: Weather = transformWeather(weatherJson);
      const { current, daily, hourly } = weather;
      expect(current.temperature).toBe(26);
      expect(current.description).toBe('Clear sky');
      expect(current.icon).toBe(WeatherIcons.CLEAR_DAY);
      expect(current.precipitation).toBe(undefined);
      expect(current.wind).toBe('Light wind');
      expect(current.alerts).toBeInstanceOf(Array);
      expect(current.alerts).toHaveLength(0);
      expect(daily).toBeInstanceOf(Array);
      expect(daily).toHaveLength(8);
      expect(daily[2].dayOfWeek).toBe('Tuesday');
      expect(daily[2].date).toBe('August 30.');
      expect(daily[2].wind).toBe('Light breeze');
      expect(daily[2].description).toBe('Scattered clouds');
      expect(daily[2].icon).toBe(WeatherIcons.PARTLY_CLOUDY_DAY);
      expect(daily[2].precipitation).toBe(undefined);
      expect(daily[2].tempMin).toBe(21);
      expect(daily[2].tempMax).toBe(29);
      expect(hourly).toBeInstanceOf(Array);
      expect(hourly).toHaveLength(24);
      expect(hourly[5].time).toMatch(new RegExp(/\d\d?[A|P]M/));
      expect(hourly[5].description).toBe('Overcast clouds');
      expect(hourly[5].wind).toBe('Light breeze');
      expect(hourly[5].precipitation).toBe(undefined);
      expect(hourly[5].temperature).toBe(21);
      expect(hourly[5].icon).toBe(WeatherIcons.CLOUDY);
    });
  });
});
