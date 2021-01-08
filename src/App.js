import React, { useState } from "react";
import "./styles.css";

const api = {
  key: "4b5f6f59f5fd3724c30241bd855c1baf",
  base: "https://api.openweathermap.org/data/2.5/"
};

export default function App() {
  const [query, setq] = useState("");
  const [weather, setw] = useState({});

  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID={api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setw(result);
          setq("");
          console.log(result);
        });
    }
  };

  let d = new Date();
  let date = String(d);
  date = date.slice(3, 15);
  //let day= d.getDay();
  return (
    <div className={
      (typeof weather.main!== "undefined")
       ? (weather.main.temp > 16) 
          ? 'app warm' 
          : 'app'
       : 'app'}>

      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="search here"
            onChange={(e) => setq(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
{(typeof weather.main !== "undefined") ? (

<div>
        <div className="location-box">
          <div className="location">{weather.name},{weather.sys.country}</div>
          <div className="date"> {date}</div>
          <div className="weather-box">
            <div className="temp">
              {Math.round(weather.main.temp)}
               C</div>
            <div className="weather">{weather.weather[0].main}</div>
          </div>
        </div>
     </div>   
) : ( '')}
      </main>
    </div>
  );
}

