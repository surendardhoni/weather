import React, { useState } from "react";
import axios from "axios";
import clearsky from "../assets/clearsky.jpg";
import cloudy from "../assets/cloudy.jpg";
import rain from "../assets/rainy.jpg";
import sun from "../assets/sun.jpg";
import mist from "../assets/mist.jpg";
import thunder from "../assets/thunder.jpg";

function City() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");
  const [temperature, setTemperature] = useState("");
  const types = ["City", "Latitude"];

  function celsius(change) {
    let celsius_value = (parseFloat(change) - 273.15).toFixed(2);
    setTemperature(celsius_value + "℃");
  }
  function fahren(change) {
    let celsius_value = parseFloat(
      1.8 * (parseFloat(change) - 273.15) + 32
    ).toFixed(2);
    setTemperature(celsius_value + "℉");
  }
  function kelvin(change) {
    let celsius_value = change;
    setTemperature(celsius_value + "K");
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=f7faf169c296333a5e46c865f7987a27`;

  const searchLocation = async (event) => {
    if (event.key === "Enter") {
      try {
        const res = await axios.get(url);
        setData(res.data);
        setTemperature(res.data.main.temp + "K");
        setError("No Error");
        console.log(res.data);
      } catch (err) {
        setError("City Not Found");
        setData(error);
        setData("");
        console.log(err);
      }
    }
  };

  function FormatDecider(event) {
    if (event.target._wrapperState.initialValue == "celcius") {
      celsius(data.main && data.main.temp);
    }
    if (event.target._wrapperState.initialValue == "fahren") {
      fahren(data.main && data.main.temp);
    }
    if (event.target._wrapperState.initialValue == "kelvin") {
      kelvin(data.main && data.main.temp);
    }
    console.log(event.target._wrapperState.initialValue);
  }


  let climate = data.weather && data.weather[0].main;
  return (
    <div
      className="app"
      id="app"
      style={{
        backgroundImage: `url(${
          climate === "Clear"
            ? clearsky
            : climate === "Clouds"
            ? cloudy
            : climate === "Rain"
            ? rain
            : climate === "Mist"
            ? mist
            : climate === "Thunderstorm"
            ? thunder
            : sun
        })`,
      }}
    >
 
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          type="text"
          onKeyPress={searchLocation}
          placeholder="Enter Location"
        />
      </div>
   
       
      <div className="box">
        <p className="decoration-red-900">Please Select Anyone</p>
        <input
          id="celcius"
          name="temp"
          type="radio"
          value="celcius"
          onChange={FormatDecider}
          C
        />
        <label id="celcius" className="cel">
          Celsius
        </label>
        <input
          id="fahren"
          name="temp"
          type="radio"
          value="fahren"
          onChange={FormatDecider}
          F
        />
        <label id="fahren" className="fahren">
          Fahrenheit
        </label>
        <input
          id="kelvin"
          name="temp"
          type="radio"
          value="kelvin"
          className="kelvin"
          checked={temperature.includes("K")}
          onChange={FormatDecider}
          K
        />
        <label id="kelvin" className="">
          Kelvin
        </label>
      </div>
      {data ? (
        <div className="container">
          <div className="top">
            <div className="location">
              <p className="citycolor">
                {data.name} {data.sys && data.sys.country}
              </p>
            </div>
            <div className="temp">
              {data.main ? <h1 id="temp">{temperature}</h1> : null}
            </div>
            <div className="desc">
              {data.weather ? <p>{data.weather[0].description}</p> : null}
            </div>
            <div className="description" id="desc">
              {data.weather ? <p>{data.weather[0].main}</p> : null}
            </div>
          </div>
          <div className="middle">
            <div className="lat">
              {data.coord ? <p>Latitude : {data.coord.lat}</p> : null}
            </div>
            <div className="lon">
              {data.coord ? <p>Longitude : {data.coord.lon}</p> : null}
            </div>
          </div>
          <div className="bottom">
            <div className="feels">
              {data.main ? (
                <p className="bold">{data.main.feels_like}℉</p>
              ) : null}
              <p>Feels Like </p>
            </div>
            <div className="humidity">
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.main ? <p className="bold">{data.wind.speed}MPH</p> : null}
              <p>Wind Speed</p>
            </div>
          </div>
        </div>
      ) : (
        <p id="all" className="center">
          {error}
        </p>
      )}
    </div>
  );
}

export default City;
