import axios from "axios";
import { useEffect, useState } from "react";

const WeatherCapital = ({ capital, capitalCords }) => {
  const [weather, setWeather] = useState();

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${capitalCords[0]}&lon=${capitalCords[1]}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
      )
      .then(res => {
        const weather = {
          temp: res.data.main.temp,
          wind: res.data.wind.speed,
          icon: res.data.weather[0].icon,
        };
        setWeather(weather);
      });
  }, []);

  if (!weather) {
    return (
      <section>
        <h2>loading weather...</h2>
      </section>
    );
  }

  return (
    <section>
      <h2>Weather in {capital}</h2>
      <p>temperature {weather.temp} Celsius</p>
      <img src={`http://openweathermap.org/img/wn/${weather.icon}.png`} alt="" />
      <p>wind {weather.wind} m/s</p>
    </section>
  );
};

export default WeatherCapital;
