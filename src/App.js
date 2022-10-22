import CurrentWeather from "./components/CurrentWeather";
import MainPage from "./components/MainPage";
import { Button } from "react-bootstrap";
import { GiHamburgerMenu } from "react-icons/gi";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import { CityContext } from "./components/CityContext";

const API_KEY = "ae99b866026b5adc4730927bf41e7681";

function App() {
  const [location, setLocation] = useState({});
  const [isShown, setIsShown] = useState(false);
  const [cityName, setCityName] = useState();
  const [blur, setBlur] = useState("blur");

  const handleClick = () => {
    setIsShown((current) => !current);
  };

  // useEffect(() => {
  //   toast.loading("Loading Data");
  // }, []);

  useEffect(() => {
    let city = cityName;
    if (city) {
      axios
        .get("https://api.openweathermap.org/data/2.5/weather", {
          params: {
            q: city,
            appid: API_KEY,
            units: "imperial",
            exclude: "minutely,alerts",
          },
        })
        .then((response) => {
          setLocation(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      navigator.geolocation.getCurrentPosition(positionSuccess, positionError);

      function positionSuccess({ coords }) {
        data(coords.latitude, coords.longitude);
      }

      function positionError(err) {
        switch (err.code) {
          case err.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.");
            break;
          case err.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
          case err.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
          default:
            alert("An unknown error occurred.");
        }
      }

      function data(lat, lon) {
        axios
          .get("https://api.openweathermap.org/data/2.5/weather", {
            params: {
              lat,
              lon,
              appid: API_KEY,
              units: "imperial",
              exclude: "minutely,alerts",
            },
          })
          .then((response) => {
            setLocation(response.data);
            // toast.dismiss();
            setBlur("");
          })
          .catch((e) => {
            console.log(e);
          });
      }
    }
  }, [cityName]);

  return (
    <>
      <Toaster />
      <div className={blur}>
        <CityContext.Provider value={{ cityName, setCityName }}>
          <div
            className="container-flued"
            style={{
              paddingBottom: "12rem",
            }}
          >
            {isShown && <MainPage location={location} />}
            {isShown === false && <CurrentWeather location={location} />}
            <div
              style={{
                position: "fixed",
                left: "0",
                bottom: "0",
                width: "100%",
                height: "3rem",
                backgroundColor: "rgba(28, 156, 246, .7)",
              }}
            >
              <Button
                variant="dark"
                size="sm"
                style={{
                  paddingLeft: "18px",
                  paddingRight: "18px",
                  marginLeft: "10px",
                  marginTop: "10px",
                  opacity: ".8",
                }}
                onClick={handleClick}
              >
                <GiHamburgerMenu
                  style={{
                    marginBottom: "2px",
                  }}
                />
              </Button>
            </div>
          </div>
        </CityContext.Provider>
      </div>
    </>
  );
}

export default App;
