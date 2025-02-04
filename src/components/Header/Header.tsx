import React, { useState } from "react";
import HeaderRideSearch from "./HeaderRideSearch";
import MapboxExample from "../Map/Map";
import { Coordinates } from "../Map/Map";

const Header: React.FC = () => {
  const [fromCoords, setFromCoords] = useState<Coordinates>(null);
  const [toCoords, setToCoords] = useState<Coordinates>(null);

  const updateMapPins = (from: Coordinates, to: Coordinates): void => {
    setFromCoords(from);
    setToCoords(to);
  };

  return (
    <section>
      <div className="header">
        <div className="row d-flex flex-row flex-wrap justify-content-center align-items-center">
          <div className="col-12 col-md-6">
            <HeaderRideSearch updateMapPins={updateMapPins} />
          </div>
          <div className="col-12 col-md-6">
            <MapboxExample fromCoords={fromCoords} toCoords={toCoords} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
