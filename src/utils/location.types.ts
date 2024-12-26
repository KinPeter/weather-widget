export interface LocationIqReverseResponse {
  address: {
    village?: string;
    town?: string;
    city?: string;
    district?: string;
    region?: string;
    state?: string;
    country?: string;
  };
}

export interface Coords {
  lat: number;
  lon: number;
}

export type LocationIqSearchResponse = LocationIqReverseResponse & Coords;

export interface Location extends Coords {
  name: string;
}

export interface SavedLocationInfo {
  location: LocationIqReverseResponse;
  coords: Coords;
}
