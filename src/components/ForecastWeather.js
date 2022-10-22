import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import HourlyCard from "./HourlyCard";
import DailyForecast from "./DailyForecast";
import CurrentWeatherData from "./CurrentWeatherData";
import { CityContext } from "./CityContext";
import { FaRegCalendarAlt } from "react-icons/fa";
import { toast } from "react-hot-toast";

export default function ForecastWeather() {
  const API_KEY = "ae99b866026b5adc4730927bf41e7681";

  const [hourlyData, setHourlyData] = useState({});
  const [dailyData, setDailyData] = useState({});
  const [currentDay, setCurrentDay] = useState({});

  const { cityName } = useContext(CityContext);

  useEffect(() => {
    toast.loading("Loading Data");
    navigator.geolocation.getCurrentPosition(positionSuccess, positionError);

    function positionSuccess({ coords }) {
      data(coords.latitude, coords.longitude);
    }

    function positionError() {
      console.log("error");
    }

    function data(lat, lon) {
      axios
        .get("https://api.openweathermap.org/data/2.5/onecall", {
          params: {
            lat,
            lon,
            appid: API_KEY,
            units: "imperial",
            exclude: "minutely,alerts",
          },
        })
        .then(({ data }) => {
          parseHourlyWeather(data);
          parseDailyWeather(data);
          parseCurrentWeatherData(data);
          toast.dismiss();
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, []);

  if (hourlyData.length > 1 && dailyData.length > 1) {
    return (
      !cityName && (
        <>
          <div
            className="container hour-card-slider"
            style={{
              display: "flex",
              backgroundColor: "rgba(28, 156, 246, 0.5)",
              width: "90%",
              borderRadius: "8px",
              flexWrap: "nowrap",
              overflowX: "auto",
              padding: "10px",
              marginTop: "21rem",
            }}
          >
            {hourlyData.slice(0, 25).map((hour) => {
              return <HourlyCard data={hour} key={hour.timestamp} />;
            })}
          </div>
          <div
            className="container"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(28, 156, 246, 0.5)",
              width: "90%",
              borderRadius: "8px",
              padding: "5px",
              marginTop: "10px",
            }}
          >
            <span
              style={{
                borderBottom: "1px solid rgba(255, 255, 255, 0.4)",
                width: "95%",
                color: "rgba(255, 255, 255, 0.7)",
                fontSize: ".8rem",
                paddingLeft: "10px",
              }}
            >
              <FaRegCalendarAlt
                style={{ verticalAlign: "baseline", marginRight: "10px" }}
              />
              7-DAY FORECAST
            </span>
            {dailyData.map((day) => {
              return <DailyForecast data={day} key={day.timestamp} />;
            })}
          </div>
          <div
            className="container"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "transparent",
              width: "90%",
              borderRadius: "8px",
              padding: "0",
              marginTop: "10px",
            }}
          >
            <CurrentWeatherData data={currentDay} />
          </div>
        </>
      )
    );
  }

  function parseHourlyWeather({ hourly, current }) {
    const HOUR_IN_SECONDS = 3600;
    // Filter for hours that are only in the future and not in the past (ex. hour from now)
    setHourlyData(
      hourly
        .filter((hour) => hour.dt > current.dt - HOUR_IN_SECONDS)
        .map((hour) => {
          return {
            timestamp: new Date(hour.dt * 1000),
            icon: hour.weather[0].icon,
            temp: Math.round(hour.temp),
          };
        })
    );
  }

  function parseDailyWeather({ daily }) {
    setDailyData(
      daily.map((day) => {
        // Slices means from array [1] onward
        return {
          timestamp: new Date(day.dt * 1000),
          icon: day.weather[0].icon,
          minTemp: Math.round(Math.min(day.temp.min)),
          maxTemp: Math.round(Math.max(day.temp.max)),
          dayTemp: Math.round(day.temp.day),
        };
      })
    );
  }

  function parseCurrentWeatherData({ current, daily }) {
    const sunrises = daily.slice(1).map((day) => {
      return new Date(day.sunrise * 1000);
    });
    const sunsets = daily.slice(1).map((day) => {
      return new Date(day.sunset * 1000);
    });

    setCurrentDay({
      currentTemp: Math.round(current.temp),
      currentTime: new Date(current.dt * 1000),
      wind: Math.round(current.wind_speed),
      windDirection: current.wind_deg,
      humidity: current.humidity,
      feelsLike: Math.round(current.feels_like),
      sunset: new Date(current.sunset * 1000),
      sunrise: new Date(current.sunrise * 1000),
      uvIndex: Math.round(current.uvi),
      visibility: current.visibility / 1000,
      sunrises: sunrises,
      sunsets: sunsets,
    });
  }
}
