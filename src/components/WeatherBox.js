import React, { useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const kelvinToCelsius = (kelvin) => {
  return kelvin - 273.15;
};

const WeatherBox = ({ weather, isLoading, setIsLoading }) => {
  useEffect(() => {
    // set timeout 1 second to simulate loading
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
    return () => {
      // cleanup
    };
  }, [weather.name, setIsLoading]);
  return (
    <div className="weatherdiv">
      {weather.name && (
        <div className="">
          {isLoading ? (
            <>
              <ClipLoader size={90} color="black" />
            </>
          ) : (
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
        </div>
      )}
    </div>
  );
};

export default WeatherBox;
