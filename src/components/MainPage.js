import React, { useContext, useEffect, useState } from "react";
import LocationSearch from "./LocationSearch";
import MyLocationCard from "./MyLocationCard";
import { CityContext } from "./CityContext";
import { AiOutlineCloseCircle } from "react-icons/ai";
export default function MainPage({ location }) {
  const { cityName } = useContext(CityContext);
  const [citiesData, setCitiesData] = useState(
    JSON.parse(localStorage.getItem("cityData")) || []
  );
  console.log("MainPage", citiesData);
  useEffect(() => {
    localStorage.setItem("cityData", JSON.stringify(citiesData));
  }, [citiesData]);

  useEffect(() => {
    setCitiesData([
      ...[...new Map(citiesData.map((arr) => [arr.id, arr])).values()],
      location,
    ]);
  }, [location]);

  function deleteCity(id) {
    const newArr = citiesData.filter((city) => city.id !== id);
    setCitiesData(newArr);
  }

  return (
    <section
      className="container-flued p-3 "
      style={{
        width: "100%",
        height: "100vh",
      }}
    >
      <LocationSearch />
      {/* // First create an array of arrays with unique value like arr.id, and
      original object Inside // Then create new Map object which takes out
      duplicates by comparing ids and creating object where key is an id and
      value an original object // Then we grab values from the object and
      convert to an array */}
      {[...new Map(citiesData.map((arr) => [arr.id, arr])).values()].map(
        (data) => (
          <div className="pb-4" key={data.id}>
            <div
              style={{
                position: "relative",
              }}
              className="container p-0"
            >
              <MyLocationCard data={data} />
              <div
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "0",
                }}
              >
                <AiOutlineCloseCircle
                  color="white"
                  className="align-items-center-delete-btn"
                  size="1.2rem"
                  onClick={() => deleteCity(data.id)}
                />
              </div>
            </div>
          </div>
        )
      )}
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
