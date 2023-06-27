import "client";
import React from "react";
import { Map } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

type Props = {};

function TruckMap({}: Props) {
  return (
    <Map
      initialViewState={{
        longitude: -122.4,
        latitude: 37.8,
        zoom: 14,
      }}
      style={{ width: 600, height: 400 }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_KEY}
    />
  );
}

export default TruckMap;
