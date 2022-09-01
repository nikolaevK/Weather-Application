import React, { useContext } from "react";
import { CityContext } from "./CityContext";

export default function MyLocationCard({ data }) {
  const { cityName } = useContext(CityContext);

  return cityName ? (
    <a
      className="container text-light d-flex justify-content-between"
      style={{
        width: "95%",
        height: "6rem",
        borderRadius: "1rem",
        backgroundColor: "rgba(28, 156, 246, 1)",
        display: "block",
        textDecoration: "none",
      }}
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
        }}
      >
        <div className="card-title h1">{Math.round(data.main.temp)}&#176;</div>
        <div className="card-text" style={{ fontSize: "12px" }}>
          <span>H:</span>
          {Math.round(data.main.temp_max)}&#176;
          <span style={{ marginLeft: ".5rem" }}>L:</span>
          {Math.round(data.main.temp_min)}&#176;
        </div>
      </div>
    </a>
  ) : null;
}
