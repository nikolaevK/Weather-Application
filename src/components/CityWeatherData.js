import React, { useContext } from "react";
import { CityContext } from "./CityContext";
import { BsWind } from "react-icons/bs";
import { WiHumidity } from "react-icons/wi";
import { MdOutlineVisibility } from "react-icons/md";
import { FaTemperatureHigh } from "react-icons/fa";
import "./wind.css";

export default function CityWeatherData({ data }) {
  const { cityName } = useContext(CityContext);

  return cityName ? (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "10px",
        justifyContent: "space-between",
        width: "100%",
        marginBottom: "4rem",
      }}
    >
      <div
        className="card"
        style={{
          width: "100%",
          height: "167px",
          borderRadius: "10px",
          backgroundColor: "rgba(28, 156, 246, 0.5)",
          border: "none",
        }}
      >
        <div className="card-body text-light">
          <div
            className="card-title"
            style={{ color: "rgba(255, 255, 255, 0.7)", fontSize: ".9rem" }}
          >
            <BsWind style={{ verticalAlign: "baseline", marginRight: "5px" }} />
            <span>WIND</span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "10px",
            }}
          >
            <div className="compass">
              <div className="direction">
                <p className="direction-text">
                  {convertWindDegrees(data.wind.deg)}
                  <span className="compass-span">{data.wind.speed} mph</span>
                </p>
              </div>
              <div
                className={`arrow ${convertWindDegrees(data.wind.deg)}`}
              ></div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="card"
        style={{
          width: "100%",
          height: "167px",
          borderRadius: "10px",
          backgroundColor: "rgba(28, 156, 246, 0.5)",
          border: "none",
        }}
      >
        <div className="card-body text-light">
          <div
            className="card-title"
            style={{ color: "rgba(255, 255, 255, 0.7)", fontSize: ".9rem" }}
          >
            <WiHumidity
              style={{
                verticalAlign: "baseline",
                marginRight: "5px",
                fontSize: "1.1rem",
              }}
            />
            <span>HUMIDITY</span>
          </div>
          <div className="card-text h2">{data.main.humidity}%</div>
        </div>
      </div>
      <div
        className="card"
        style={{
          width: "100%",
          height: "167px",
          borderRadius: "10px",
          backgroundColor: "rgba(28, 156, 246, 0.5)",
          border: "none",
        }}
      >
        <div className="card-body text-light">
          <div
            className="card-title"
            style={{ color: "rgba(255, 255, 255, 0.7)", fontSize: ".9rem" }}
          >
            <MdOutlineVisibility
              style={{
                marginRight: "5px",
                fontSize: "1.1rem",
              }}
            />
            <span>VISIBILITY</span>
          </div>
          <div className="card-text h2">{data.visibility / 1000}mi</div>
        </div>
        <div
          className="card-footer text-light mb-3"
          style={{
            border: "none",
            backgroundColor: "transparent",
            fontSize: ".8rem",
          }}
        >
          {data.visibility >= 5
            ? "It's clear right now."
            : data.visibility < 5 && data.visibility >= 2
            ? "Moderate visibility."
            : data.visibility < 2
            ? "Poor visibility, be careful."
            : ""}
        </div>
      </div>
      <div
        className="card"
        style={{
          width: "100%",
          height: "167px",
          borderRadius: "10px",
          backgroundColor: "rgba(28, 156, 246, 0.5)",
          border: "none",
        }}
      >
        <div className="card-body text-light">
          <div
            className="card-title"
            style={{ color: "rgba(255, 255, 255, 0.7)", fontSize: ".9rem" }}
          >
            <FaTemperatureHigh
              style={{
                marginRight: "5px",
                fontSize: "1rem",
              }}
            />
            <span>FEELS LIKE</span>
          </div>
          <div className="card-text h2">
            {Math.round(data.main.feels_like)}&#176;
          </div>
        </div>
        <div
          className="card-footer text-light mb-3"
          style={{
            border: "none",
            backgroundColor: "transparent",
            fontSize: ".8rem",
          }}
        >
          {Math.round(data.main.temp) + 1 >= Math.round(data.main.feels_like) &&
          Math.round(data.main.feels_like) >= Math.round(data.main.temp) - 1
            ? "Similar to the actual temperature."
            : Math.round(data.main.feels_like) >= Math.round(data.main.temp) + 2
            ? "Feels hotter than the actual temperature"
            : Math.round(data.main.feels_like) <= Math.round(data.main.temp) + 2
            ? "Feels cooler than the actual temperature"
            : ""}
        </div>
      </div>
    </div>
  ) : null;
}

function convertWindDegrees(windDirection) {
  const directions = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW",
  ];

  windDirection = (windDirection * 16) / 360;
  windDirection = Math.round(windDirection, 0);
  windDirection = (windDirection + 16) % 16;

  return directions[windDirection];
}
