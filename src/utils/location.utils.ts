import type { LocationIqResponse, SavedLocationInfo } from './weather.types.ts';
import { StoreKeys } from './constants.ts';

export function getSavedLocationForCoords(
  coords: GeolocationCoordinates
): LocationIqResponse | null {
  const savedLocationInfo = localStorage.getItem(StoreKeys.LOCATION);
  if (!savedLocationInfo) return null;
  const { location, coords: savedCoords } = JSON.parse(savedLocationInfo) as SavedLocationInfo;
  return isSimilarLocation(coords, savedCoords) ? location : null;
}

export function saveLocationForCoords(
  location: LocationIqResponse,
  geoCoords: GeolocationCoordinates
): void {
  const coords = { latitude: geoCoords.latitude, longitude: geoCoords.longitude };
  localStorage.setItem(StoreKeys.LOCATION, JSON.stringify({ location, coords }));
}

export type LatLonCoordinates = Pick<GeolocationCoordinates, 'latitude' | 'longitude'>;

/**
 * Returns true if the distance between the two locations is less than 5000 meters
 * @param coordsA Coordinates of location A
 * @param coordsB Coordinates of location B
 */
export function isSimilarLocation<T extends LatLonCoordinates>(coordsA: T, coordsB: T): boolean {
  const { latitude: latA, longitude: lonA } = coordsA;
  const { latitude: latB, longitude: lonB } = coordsB;
  return getMetersBetweenLocations(latA, lonA, latB, lonB) < 5000;
}

/**
 * Returns the distance in meters between two locations using the Haversine formula
 * https://en.wikipedia.org/wiki/Haversine_formula
 */
export function getMetersBetweenLocations(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6378.137; // Radius of earth in KM
  const dLat = (lat2 * Math.PI) / 180 - (lat1 * Math.PI) / 180;
  const dLon = (lon2 * Math.PI) / 180 - (lon1 * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d * 1000; // meters
}
