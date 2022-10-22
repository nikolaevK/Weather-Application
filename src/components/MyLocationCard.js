import React, { useState } from "react";
import CityWeatherData from "./CityWeatherData";

export default function MyLocationCard({ data }) {
  const [details, setDitails] = useState(false);
  function showDetails(e) {
    e.preventDefault();
    setDitails((prev) => !prev);
  }
  return (
    <>
      <div
        className="container text-light d-flex justify-content-between city-weather-icon"
        style={{
          borderRadius: "1rem",
          backgroundColor: "rgba(28, 156, 246, 1)",
          display: "block",
          textDecoration: "none",
          boxShadow: "26px 26px 87px #0f5382, -26px -26px 87px #29e5ff",
        }}
        onClick={showDetails}
      >
        <div className="p-2">
          <div
            style={{
              fontSize: "2rem",
              marginTop: "-7px",
              color: "rgba(255, 255, 255, 1)",
            }}
          >
            {data.name}
          </div>
          <div style={{ fontSize: "13px", color: "rgba(255, 255, 255, 0.7)" }}>
            {data.weather[0].main}
          </div>
        </div>

        <div
          className="card justify-content-center align-items-center"
          style={{
            width: "6rem",
            backgroundColor: "transparent",
            border: "none",
            paddingRight: "3rem",
          }}
        >
          <div className="card-title h1">
            {Math.round(data.main.temp)}&#176;
          </div>
          <div className="card-text" style={{ fontSize: "12px" }}>
            <span>H:</span>
            {Math.round(data.main.temp_max)}&#176;
            <span style={{ marginLeft: ".5rem" }}>L:</span>
            {Math.round(data.main.temp_min)}&#176;
          </div>
        </div>
      </div>
      {details && (
        <div className="container p-0 mb-5">
          <CityWeatherData data={data} />
        </div>
      )}
    </>
  );
}
