import React, { useContext } from "react";
import LocationSearch from "./LocationSearch";
import MyLocationCard from "./MyLocationCard";
import CityWeatherData from "./CityWeatherData";
import { CityContext } from "./CityContext";

export default function MainPage({ location }) {
  const { cityName } = useContext(CityContext);

  return (
    <section
      className="container-flued p-3"
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <LocationSearch />
      <MyLocationCard data={location} />
      <div
        className="container"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "transparent",
          width: "95%",
          borderRadius: "8px",
          padding: "0",
          marginTop: "10px",
        }}
      >
        <CityWeatherData data={location} />
      </div>
      {cityName ? (
        <div className="container d-flex justify-content-center">
          <a
            href="/"
            className="btn btn-dark"
            style={{ opacity: 0.8, color: "white" }}
          >
            Current Location
          </a>
        </div>
      ) : null}
    </section>
  );
}
