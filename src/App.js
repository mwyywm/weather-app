import React, { useState, useEffect } from "react";
import WeatherBox from "./components/WeatherBox";
import "./App.css";
import axios from "axios";

function App() {
  const [searchedCity, setSearchedCity] = useState("");
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState({});

  const [paragraph, setParagraph] = useState("Search for a city!");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // useEffect was called when the site was launched so I had to wrap it in a if statement.
    if (searchedCity.length > 1) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&APPID=${process.env.REACT_APP_API_KEY}`
        )
        .then((res) => {
          setWeather(res.data);
          setIsLoading(true);
          // console.log(`res.data: ${JSON.stringify(res.data)}`);
        })
        .catch((err) => {
          // console.log(`Error: ${err}`);
          setWeather("");
          setParagraph("That city could not be found. Try again!");
        });
    }
  }, [searchedCity]);

  const handleInput = (e) => {
    setCity(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // If the input is empty, we don't want to do anything
    // or if the city and searchedCity are the same
    if (
      city.length < 1 ||
      city.toLocaleUpperCase() === searchedCity.toLocaleUpperCase()
    ) {
      setParagraph("You must enter a city!");
      setCity("");
    } else {
      setSearchedCity(city);
      setCity("");
    }
  };

  return (
    <div className="page">
      <div className="child">
        {!weather.name && <p>{paragraph}</p>}
        {weather.name && (
          <WeatherBox
            weather={weather}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        )}
        <div className="formdiv">
          <form onSubmit={handleSubmit}>
            <input type="text" onInput={handleInput} value={city} />
            <button type="submit">
              <svg
                width="17"
                height="17"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.2959 20L11.4131 13.1164C8.35124 15.2931 4.13216 14.7607 1.70715 11.8916C-0.717861 9.02253 -0.539799 4.77397 2.11678 2.11786C4.77266 -0.539419 9.02188 -0.71824 11.8917 1.7065C14.7614 4.13124 15.2942 8.35047 13.1172 11.4124L20 18.296L18.2971 19.9988L18.2959 20ZM7.22558 2.40927C4.9418 2.40876 2.97149 4.01178 2.50756 6.24781C2.04363 8.48384 3.21358 10.7383 5.30909 11.6463C7.4046 12.5543 9.84971 11.8662 11.1641 9.99863C12.4784 8.13108 12.3007 5.59736 10.7386 3.93148L11.4673 4.65404L10.6459 3.83514L10.6315 3.82069C9.73035 2.91409 8.50386 2.40583 7.22558 2.40927Z"
                  fill="#2E3A59"
                />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
