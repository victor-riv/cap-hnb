// HeaderRideSearch.tsx
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../../API";
import AutocompleteInput from "../AutoCompleteInput";
import { useDispatch } from "react-redux";
import { setFromLocation, setToLocation } from "../../slices/locationSlice";

// Define a type for coordinates
export type Coordinates = [number, number] | null;

// Define the props interface to include updateMapPins
interface HeaderRideSearchProps {
  updateMapPins: (fromCoords: Coordinates, toCoords: Coordinates) => void;
}

const HeaderRideSearch: React.FC<HeaderRideSearchProps> = ({ updateMapPins }) => {
  console.log("HELLLLLLOOOOOOO");
  const [formData, setFormData] = useState<{
    goingFrom: { address: string; coords: Coordinates };
    goingTo: { address: string; coords: Coordinates };
  }>({
    goingFrom: { address: "", coords: null },
    goingTo: { address: "", coords: null },
  });

  const history = useHistory();
  const dispatch = useDispatch();

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    // Debug log to see current form data
    console.log("Form data at submit:", formData);
  
    // Check that both address fields are filled in
    if (!formData.goingFrom.address || !formData.goingTo.address) {
      toast.warn("Please fill in both address fields");
      return; // Stop further execution if condition is not met
    }
    
    // Check that valid coordinates have been selected for both addresses
    if (!formData.goingFrom.coords || !formData.goingTo.coords) {
      toast.warn("Please select valid addresses from the suggestions");
      return; // Stop further execution if condition is not met
    }
  
    // If both checks pass, update the map pins using the provided callback
    updateMapPins(formData.goingFrom.coords, formData.goingTo.coords);
  
    try {
      // const { data } = await API.get("publishride");
      console.log("tired it");
    } catch (err) {
      console.error(err);
    }
  };
  
  return (
    <section>
      <h2>Search for a Ride</h2>
      <form onSubmit={handleSearch}>
        <div className="mb-3">
          <AutocompleteInput
            placeholder="Going from..."
            value={formData.goingFrom.address}
            onSelect={(selected: any) => {
              // Update local state
              setFormData({
                ...formData,
                goingFrom: {
                  address: selected.place_name,
                  coords: selected.center,
                },
              });
              // Dispatch Redux action for from location
              dispatch(
                setFromLocation({
                  address: selected.place_name,
                  coords: selected.center,
                })
              );
            }}
          />
        </div>
        <div className="mb-3">
          <AutocompleteInput
            placeholder="Going to..."
            value={formData.goingTo.address}
            onSelect={(selected: any) => {
              // Update local state
              setFormData({
                ...formData,
                goingTo: {
                  address: selected.place_name,
                  coords: selected.center,
                },
              });
              // Dispatch Redux action for to location
              dispatch(
                setToLocation({
                  address: selected.place_name,
                  coords: selected.center,
                })
              );
            }}
          />
        </div>
        <div className="searchBtn">
          <button className="btn btn-outline-success search" type="submit">
            Search
          </button>
        </div>
      </form>
    </section>
  );
};

export default HeaderRideSearch;
