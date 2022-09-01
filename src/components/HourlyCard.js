import React from "react";
import { format } from "date-fns";

export default function HourlyCard({ data }) {
  const { timestamp, icon, temp } = data;
  const currentHour = new Date();

  return (
    <div
      className="card text-white"
      style={{
        flex: "0 0 auto",
        width: "3rem",
        height: "6rem",
        backgroundColor: "transparent",
        border: "none",
        marginRight: "12px",
      }}
    >
      <span style={{ textAlign: "center", fontSize: "0.8rem" }}>
        {format(currentHour, "k") === format(timestamp, "k") &&
        format(currentHour, "PP") === format(timestamp, "PP")
          ? "Now"
          : format(timestamp, "ha")}
      </span>
      <img
        src={`http://openweathermap.org/img/wn/${icon}.png`}
        className="card-img"
        alt="..."
      />
      <span style={{ textAlign: "center" }}>{temp}&#176;</span>
    </div>
  );
}
