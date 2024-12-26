import { StoreKeys } from './constants.ts';
import type { Coords, LocationIqReverseResponse, SavedLocationInfo } from './location.types.ts';

export function getSavedLocationForCoords(coords: Coords): LocationIqReverseResponse | null {
  const savedLocationInfo = localStorage.getItem(StoreKeys.LOCATION);
  if (!savedLocationInfo) return null;
  const { location, coords: savedCoords } = JSON.parse(savedLocationInfo) as SavedLocationInfo;
  return isSimilarLocation(coords, savedCoords) ? location : null;
}

export function saveLocationForCoords(
  location: LocationIqReverseResponse,
  geoCoords: Coords
): void {
  const coords = { lat: geoCoords.lat, lon: geoCoords.lon };
  localStorage.setItem(StoreKeys.LOCATION, JSON.stringify({ location, coords }));
}

/**
 * Returns true if the distance between the two locations is less than 5000 meters
 * @param coordsA Coordinates of location A
 * @param coordsB Coordinates of location B
 */
export function isSimilarLocation(coordsA: Coords, coordsB: Coords): boolean {
  const { lat: latA, lon: lonA } = coordsA;
  const { lat: latB, lon: lonB } = coordsB;
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
