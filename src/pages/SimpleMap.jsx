import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "300px",
};

const center = {
  lat: 13.021822,
  lng: 80.140414,
};

export default function SimpleMap() {
  return (
    <LoadScript googleMapsApiKey="AIzaSyCvWZ0pFbrVd4Q8knhoJzhpqDQ4YpeCOVM">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={11}>
        <Marker position={{ lat: 13.021822, lng: 80.140414 }} />
      </GoogleMap>
    </LoadScript>
  );
}