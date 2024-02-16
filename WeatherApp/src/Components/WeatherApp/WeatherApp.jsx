import React, { useEffect, useState } from 'react';
import './WeatherApp.css';
import search_icon from '../Assets/search.png';
import clear_icon from '../Assets/clear.png';
import Clouds_icon from '../Assets/Clouds.png';
import drizzle_icon from '../Assets/drizzle.png';
import rain_icon from '../Assets/rain.png';
import snow_icon from '../Assets/snow.png';
import wind_icon from '../Assets/wind.png';
import humidity_icon from '../Assets/humidity.png';

function WeatherApp() {
  const [wdata, setWdata] = useState(null);
  const [city, setCity] = useState("Delhi");

  let api_key = "e859351a7e5bad4bf388840903e1e7b5";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`;

  const search = () => {
    const element = document.getElementsByClassName("cityInput");

    if (element[0].value === "") {
      return;
    }
    setCity(element[0].value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Weather data not found");
        }
        const data = await response.json();
        console.log(data)
        setWdata(data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };
    fetchData();
  }, [city, url]);

  let icon;
  if (wdata && wdata.weather) {
    const mainWeather = wdata.weather[0].main;
    if (mainWeather === "Clouds") {
      icon = Clouds_icon;
    } else if (mainWeather === "Drizzle") {
      icon = drizzle_icon;
    } else if (mainWeather === "Rain") {
      icon = rain_icon;
    } else if (mainWeather === "Snow") {
      icon = snow_icon;
    } else if (mainWeather === "Wind") {
      icon = wind_icon;
    } else {
      icon = clear_icon; 
    }
  }

  return (
    <div className='container'>
      <div className='top-bar'>
        <input type="text" className='cityInput' placeholder='Enter City' />
        <div className='search-icon' onClick={search}>
          <img src={search_icon} alt="search-icon" />
        </div>
      </div>
      <div className='weather-image'>
          <img src={icon} alt="icon" />  
      </div>
      <div className='weather-temp'>
        {wdata && wdata.main && (
          <div>{wdata.main.temp}&deg;C</div>
        )}
      </div>
      <div className='weather-location'>
        {city}
      </div>
      <div className='data-container'>
        <div className='element'>
          <img src={humidity_icon} alt="" className='icon' />
          <div className="data">
            {wdata && wdata.main && (
              <>
                <div className='humidity-percent'>{wdata.main.humidity}%</div>
                <div className='text'>Humidity</div>
              </>
            )}
          </div>
        </div>
        <div className='element'>
          <img src={wind_icon} alt="" className='icon' />
          <div className="data">
            {wdata && wdata.wind && (
              <>
                <div className='humidity-percent'>{wdata.wind.speed} Km/h</div>
                <div className='text'>Wind Speed</div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherApp;

