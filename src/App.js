import logo from "./logo.svg";
import React, { useState } from "react";
import "./App.css";
function App() {
  const test = "echma";
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const search = async (evt) => {
    const apiKey = "c6b3f1e08fefcd739701ca5124ccfa52";
    let city = "London";
    await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${apiKey}`
    )
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
        setQuery("");
        console.log(result);
      });
  };
  return (
    <div className="App">
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}>
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => setQuery(e.target.value)}
          value={query}
        />{" "}
        <input type="submit" value="Submit" onClick={search} />
      </form>
      {typeof weather.main != "undefined" ? (
        <div>
          <p>
            {weather.name}, {weather.sys.country}
          </p>
          <p>{Math.round(weather.main.temp)}°C</p>
        </div>
      ) : (
        " "
      )}
    </div>
  );
}

export default App;
