import type { Place } from "../api/Place";
import { Fragment, useState } from "react";
import { search } from "../api/search";

interface LocationSearchProps {
  onPlaceClick: (place: Place) => void;
}

export default function LocationSearch({ onPlaceClick }: LocationSearchProps) {
  const [term, setTerm] = useState("");
  const [places, setPlaces] = useState<Place[]>([]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const results = await search(term);
    setPlaces(results);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label className="font-bold" htmlFor="term">
          Search
        </label>
        <input
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500"
          id="term"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
      </form>

      <h1 className="mt-6 font-bold">Found Locations</h1>
      <div className="grid grid-cols-[1fr_40px] gap-2 mt-2 items-center">
        {places.map((place) => {
          return (
            <Fragment key={place.id}>
              <p className="text-sm">{place.name}</p>
              <button
                className="px-1 py-1 text-xs font-bold text-white bg-blue-500 rounded"
                onClick={() => onPlaceClick(place)}
              >
                Go
              </button>
              <div className="w-full col-span-2 border-b"></div>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}
