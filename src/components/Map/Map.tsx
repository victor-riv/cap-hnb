import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

export type Coordinates = [number, number] | null;

interface MapboxExampleProps {
  fromCoords: Coordinates;
  toCoords: Coordinates;
}

mapboxgl.accessToken =
  "";

const MapboxExample: React.FC<MapboxExampleProps> = ({ fromCoords, toCoords }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const fromMarkerRef = useRef<mapboxgl.Marker | null>(null);
  const toMarkerRef = useRef<mapboxgl.Marker | null>(null);

  useEffect(() => {
    if (mapContainerRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: fromCoords || [-74.006, 40.7128],
        zoom: 12,
      });
    }

    return () => {
      mapRef.current?.remove();
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    if (fromMarkerRef.current) {
      fromMarkerRef.current.remove();
      fromMarkerRef.current = null;
    }
    if (toMarkerRef.current) {
      toMarkerRef.current.remove();
      toMarkerRef.current = null;
    }

    if (fromCoords) {
      map.setCenter(fromCoords);
      fromMarkerRef.current = new mapboxgl.Marker({ color: "green" })
        .setLngLat(fromCoords)
        .addTo(map);
    }

    if (toCoords) {
      toMarkerRef.current = new mapboxgl.Marker({ color: "red" })
        .setLngLat(toCoords)
        .addTo(map);
    }
  }, [fromCoords, toCoords]);

  useEffect(() => {
    if (!fromCoords || !toCoords) return;
    const map = mapRef.current;
    if (!map) return;

    const directionsUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${fromCoords.join(
      ","
    )};${toCoords.join(",")}?geometries=geojson&access_token=${mapboxgl.accessToken}`;

    fetch(directionsUrl)
      .then((res) => res.json())
      .then((data) => {
        if (!data.routes || data.routes.length === 0) return;
        const route = data.routes[0].geometry;

        const existingSource = map.getSource("route") as mapboxgl.GeoJSONSource | undefined;
        if (existingSource) {
          existingSource.setData({
            type: "Feature",
            properties: {},
            geometry: route,
          });
        } else {
          map.addSource("route", {
            type: "geojson",
            data: {
              type: "Feature",
              properties: {},
              geometry: route,
            },
          });

          map.addLayer({
            id: "route",
            type: "line",
            source: "route",
            layout: {
              "line-join": "round",
              "line-cap": "round",
            },
            paint: {
              "line-color": "#3887be",
              "line-width": 5,
              "line-opacity": 0.75,
            },
          });
        }
      })
      .catch((err) => console.error("Error fetching route:", err));
  }, [fromCoords, toCoords]);

  return <div ref={mapContainerRef} style={{ height: "400px", width: "100%" }} />;
};

export default MapboxExample;
