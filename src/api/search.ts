import type { Place } from "./Place";

interface SearchResponse {
  features: {
    geometry: {
      coordinates: number[];
    };
    properties: {
      place_id: number;
      display_name: string;
    };
  }[];
}

export const search = async (term: string) => {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?q=${term}&format=geojson&addressdetails=1&layer=address&limit=5`
  );
  const data: SearchResponse = await res.json();

  const places: Place[] = data.features.map((f) => {
    return {
      id: f.properties.place_id,
      name: f.properties.display_name,
      longitude: f.geometry.coordinates[0],
      latitude: f.geometry.coordinates[1],
    };
  });

  return places;
};
