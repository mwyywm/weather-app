import React, { useState, useEffect } from "react";
import WeatherBox from "./components/WeatherBox";
import "./App.css";
import axios from "axios";
import { TextField } from "@material-ui/core";

function App(props) {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState({});

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${process.env.REACT_APP_API_KEY}`
      )
      .then((res) => {
        setWeather(res.data); // ???????????????????
        console.log("res.data:", res.data);
      })
      .catch((err) => {
        console.log("err:", err);
      });
  }, [city]);

  const handleInput = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`You submitted ${city}`);
    console.log("weather:", weather);
    console.log("apikey:", process.env.REACT_APP_API_KEY);
  };

  return (
    <div className="page">
      <div className="child">
        {weather.name ? (
          <WeatherBox weather={weather} />
        ) : (
          <p>Search for the city</p>
        )}
        <div className="formdiv">
          <form onSubmit={handleSubmit}>
            <input type="input" onInput={handleInput} value={city} />
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
