import React, { useContext } from "react";
import { CityContext } from "./CityContext";

export default function CurrentWeather({ location }) {
  const { main, weather } = location;
  const { cityName } = useContext(CityContext);

  return !cityName ? (
    <section
      className="container-flued p-5 pb-2 text-light"
      style={{
        width: "95%",
        position: "fixed",
        top: "0",
        overflow: "hidden",
        zIndex: "100",
        backgroundColor: "#19c3fb",
        marginLeft: "10px",
      }}
    >
      <h1 className="row justify-content-center">{location.name}</h1>
      <div
        className="row justify-content-center"
        style={{ fontSize: "5rem", paddingLeft: "1.8rem" }}
      >
        {Math.round(main?.temp)}&#176;
      </div>
      <div className="row justify-content-center ">{weather?.[0].main}</div>
      <div className="row row-cols-2 justify-content-center gx-0">
        <div className="d-flex justify-content-end pe-1">
          <span>H:</span>
          {Math.round(Math.max(main?.temp_max))}&#176;
        </div>
        <div className="d-flex justify-content-start">
          <span>L:</span>
          {Math.round(Math.min(main?.temp_min))}&#176;
        </div>
      </div>
    </section>
  ) : (
    <div className="container d-flex justify-content-center mt-5">
      <a href="" className="btn btn-dark" style={{ opacity: 0.8 }}>
        Load Location
      </a>
    </div>
  );
}
