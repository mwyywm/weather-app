import React from "react";

const kelvinToCelsius = (kelvin) => {
  return kelvin - 273.15;
};

const WeatherBox = ({ weather }) => {
  return (
    <div className="weatherdiv">
      <div className="topdiv">
        <p>{`${weather.name}, ${weather.sys.country}`}</p>
      </div>
      <div className="bottomdiv">
        <p>Today</p>
        <p>{`${Math.round(kelvinToCelsius(weather.main.temp))}°C`} </p>
        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt={weather.weather[0].description}
        />
      </div>
    </div>
  );
};

export default WeatherBox;
