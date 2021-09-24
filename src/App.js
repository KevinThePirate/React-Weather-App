import logo from "./logo.svg";
import React, { useState } from "react";
import "./App.css";
function App() {
  const test = "echma";
  let weatherForStyle;
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({ test: 1 });
  const [classList, setClassList] = useState("App other-weather");
  const [imgSrc, setImgSrc] = useState("other");
  const search = async (evt) => {
    const apiKey = "c6b3f1e08fefcd739701ca5124ccfa52";
    await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${apiKey}`
    )
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
        setQuery("");
        console.log({ result });
        console.log({ weather });
        console.log({ evt });
        if (result.cod === "404") {
          console.log("break");
        } else {
          weatherForStyle = result.weather[0].description;
          console.log({ weatherForStyle }, 1);
          weatherStyle(result);
        }
      })
      .catch((error) => console.log({ error }));
  };
  const bigFunc = async () => {
    await search();
    //weatherStyle(weather);
  };
  function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }
  const weatherStyle = async (param) => {
    let string = "Hello, World";
    let substring = "Hello";
    if (string.includes(substring)) {
      console.log("container");
      console.log({ weatherForStyle }, 2);
    }
    console.log(typeof weatherForStyle);

    let test = "clouds";
    if (weatherForStyle.includes(test)) {
      console.log("Clouds");
    } else {
      console.log("No Clouds");
    }

    let desc = weatherForStyle;
    //console.log({ weather });
    //console.log({ param });
    /*if (typeof weather.main === "undefined") {
      setClassList("App other-weather");
      console.log(weather.main);
      console.log("undeff");
    } else {
      console.log("deffed");
      console.log({ test });
      //desc = weather.weather[0].description;
    }
    console.log({ desc });*/

    if (desc.includes("sun") || desc.includes("clear")) {
      setClassList("App sunny");
      setImgSrc("sun");
    } else if (desc.includes("rain") || desc.includes("drizzle")) {
      setClassList("App rain");
      setImgSrc("rain");
    } else if (desc.includes("clouds")) {
      setClassList("App cloudy");
      console.log("bing");
      setImgSrc("cloud");
    } else {
      setClassList("App other-weather");
      setImgSrc("other");
    }
    if (desc.includes("snow")) {
      setImgSrc("snow");
    } else if (desc.includes("wind")) {
      setImgSrc("wind");
    }
    console.log({ classList });
  };
  return (
    <div className={classList} id="app">
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        id="search-area">
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => setQuery(e.target.value)}
          value={query}
        />{" "}
        <input type="submit" value="Submit" onClick={bigFunc} />
      </form>
      {typeof weather.main != "undefined" ? (
        <div id="weather-area">
          <div id="image-area">
            <img src={`images/${imgSrc}.png`} />
          </div>
          <div id="info-area">
            <div id="wrapper">
              <div id="row-first">
                <h1>
                  {weather.name}, {weather.sys.country}
                </h1>
              </div>
              <div className="break"></div>
              <div id="row-second">
                <h2>{Math.round(weather.main.temp)}°C</h2>
              </div>
              <div className="break"></div>
              <div id="row-third">
                <p>{toTitleCase(weather.weather[0].description)}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        " "
      )}
    </div>
  );
}

export default App;
