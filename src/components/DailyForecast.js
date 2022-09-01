import React from "react";
import { ProgressBar } from "react-bootstrap";
import { format } from "date-fns";

export default function DailyForecast({ data }) {
  const { timestamp, dayTemp, icon, minTemp, maxTemp } = data;
  const today = new Date();

  return (
    <div
      className="row row-col-12 text-light align-items-center gx-5"
      style={{
        borderBottom: "1px solid rgba(255, 255, 255, 0.4)",
        width: "95%",
      }}
    >
      <div className="col-2">
        {format(today, "P") === format(timestamp, "P")
          ? "Today"
          : format(timestamp, "eeee").slice(0, 3)}
      </div>
      <span className="col-2">
        <img src={`http://openweathermap.org/img/wn/${icon}.png`} alt="image" />
      </span>
      <div className="col-2">{minTemp}&deg;</div>
      <div className="col-4 p-0">
        <ProgressBar
          variant="warning"
          min={minTemp}
          max={maxTemp}
          now={dayTemp}
        />
      </div>
      <div className="col-2">{maxTemp}&deg;</div>
    </div>
  );
}
