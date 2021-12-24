import React, { useRef, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const kelvinToCelsius = (kelvin) => {
  return kelvin - 273.15;
};

const WeatherBox = ({ weather, isLoading, setIsLoading }) => {
  return (
    <div className="weatherdiv">
      {weather.name && (
        <>
          <div className="topdiv">
            <p>{`${weather.name}, ${weather.sys.country}`}</p>
          </div>
          <div className="bottomdiv">
            <p>Today</p>
            <p>{`${Math.round(kelvinToCelsius(weather.main.temp))}°C`} </p>
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
              onLoad={() => setIsLoading(false)}
            />
          </div>
        </>
      )}
      {isLoading && (
        <>
          <div className="">
            <ClipLoader size={90} color="red" />
          </div>
        </>
      )}
    </div>
  );
};

export default WeatherBox;
