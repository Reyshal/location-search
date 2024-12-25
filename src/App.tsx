import type { Place } from "./api/Place";
import { useState } from "react";
import LocationSearch from "./components/LocationSearch";
import Map from "./components/Map";

function App() {
  const [place, setPlace] = useState<Place | null>(null);

  return (
    <div className="grid w-screen h-screen grid-cols-12">
      <div className="col-span-3 p-2">
        <LocationSearch onPlaceClick={(p) => setPlace(p)} />
      </div>
      <div className="col-span-9">
        <Map place={place} />
      </div>
    </div>
  );
}

export default App;
