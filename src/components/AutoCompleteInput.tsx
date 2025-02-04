import React, { useState, useEffect } from "react";

const MAPBOX_ACCESS_TOKEN =
  "";

export interface Suggestion {
  id: string;
  place_name: string;
  center: [number, number];
}

interface AutocompleteInputProps {
  value: string;
  onSelect: (suggestion: Suggestion) => void;
  placeholder: string;
}

const AutocompleteInput: React.FC<AutocompleteInputProps> = ({
  value,
  onSelect,
  placeholder,
}) => {
  const [query, setQuery] = useState<string>(value);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

  useEffect(() => {
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      try {
        const res = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
            query
          )}.json?access_token=${MAPBOX_ACCESS_TOKEN}&autocomplete=true&limit=5`
        );
        const data = (await res.json()) as { features: Suggestion[] };
        setSuggestions(data.features);
      } catch (error) {
        console.error("Error fetching suggestions", error);
      }
    };

    const timeoutId = setTimeout(() => {
      fetchSuggestions();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query]);

  return (
    <div style={{ position: "relative" }}>
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setQuery(e.target.value)
        }
        className="form-control"
      />
      {suggestions.length > 0 && (
        <ul
          style={{
            position: "absolute",
            zIndex: 1000,
            background: "#fff",
            border: "1px solid #ddd",
            width: "100%",
            listStyle: "none",
            padding: 0,
            margin: 0,
            maxHeight: "150px",
            overflowY: "auto",
          }}
        >
          {suggestions.map((s) => (
            <li
              key={s.id}
              style={{ padding: "5px", cursor: "pointer" }}
              onClick={() => {
                setQuery(s.place_name);
                setSuggestions([]); 
                onSelect(s); 
              }}
            >
              {s.place_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutocompleteInput;
