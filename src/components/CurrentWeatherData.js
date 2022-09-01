import React from "react";
import { format } from "date-fns";
import ProgressBar from "react-bootstrap/ProgressBar";
import { WiSunset } from "react-icons/wi";
import { WiDaySunny } from "react-icons/wi";
import { BsWind } from "react-icons/bs";
import { WiHumidity } from "react-icons/wi";
import { MdOutlineVisibility } from "react-icons/md";
import { FaTemperatureHigh } from "react-icons/fa";
import "./wind.css";

export default function CurrentWeatherData({ data }) {
  const {
    currentTemp,
    currentTime,
    feelsLike,
    humidity,
    sunset,
    uvIndex,
    visibility,
    wind,
    windDirection,
    sunrise,
    sunrises,
    sunsets,
  } = data;

  return (
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
            <WiDaySunny
              style={{
                verticalAlign: "baseline",
                marginRight: "5px",
                fontSize: "1rem",
              }}
            />
            <span>UV INDEX</span>
          </div>
          <div className="card-text h3">{uvIndex}</div>
          <div className="mb-3 h3">
            {uvIndex >= 2 || uvIndex === 0
              ? "Low"
              : uvIndex >= 5
              ? "Moderate"
              : "High"}
          </div>
          <ProgressBar>
            <ProgressBar
              striped
              variant="success"
              now={35}
              key={1}
              label="1-2"
            />
            <ProgressBar variant="warning" now={35} key={2} label="3-5" />
            <ProgressBar
              striped
              variant="danger"
              now={35}
              key={3}
              label="6-7"
            />
          </ProgressBar>
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
            <WiSunset
              style={{ verticalAlign: "baseline", marginRight: "5px" }}
            />
            <span>
              {currentTime < sunrise
                ? "SUNRISE"
                : currentTime < sunset
                ? "SUNSET"
                : "SUNRISE"}
            </span>
          </div>
          <div className="card-text h2">
            {currentTime < sunrise
              ? format(sunrise, "p")
              : currentTime < sunset
              ? format(sunset, "p")
              : format(sunrises[0], "p")}
          </div>
        </div>
        <div
          className="card-footer"
          style={{
            borderTop: "1px solid rgba(255, 255, 255, 0.7)",
            color: "rgba(255, 255, 255, 0.7)",
            fontSize: ".8rem",
          }}
        >
          <span>
            {currentTime < sunrise
              ? "Sunset: "
              : currentTime < sunset
              ? "Sunrise: "
              : "Sunset: "}
          </span>
          {currentTime < sunrise
            ? format(sunset, "p")
            : currentTime < sunset
            ? format(sunrises[0], "p")
            : format(sunsets[0], "p")}
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
                  {convertWindDegrees(windDirection)}
                  <span className="compass-span">{wind} mph</span>
                </p>
              </div>
              <div
                className={`arrow ${convertWindDegrees(windDirection)}`}
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
          <div className="card-text h2">{humidity}%</div>
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
          <div className="card-text h2">{visibility}mi</div>
        </div>
        <div
          className="card-footer text-light mb-3"
          style={{
            border: "none",
            backgroundColor: "transparent",
            fontSize: ".8rem",
          }}
        >
          {visibility >= 5
            ? "It's clear right now."
            : visibility < 5 && visibility >= 2
            ? "Moderate visibility."
            : visibility < 2
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
          <div className="card-text h2">{feelsLike}&#176;</div>
        </div>
        <div
          className="card-footer text-light mb-3"
          style={{
            border: "none",
            backgroundColor: "transparent",
            fontSize: ".8rem",
          }}
        >
          {currentTemp + 1 >= feelsLike && feelsLike >= currentTemp - 1
            ? "Similar to the actual temperature."
            : feelsLike >= currentTemp + 2
            ? "Feels hotter than the actual temperature"
            : feelsLike <= currentTemp - 2
            ? "Feels cooler than the actual temperature"
            : ""}
        </div>
      </div>
    </div>
  );
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
