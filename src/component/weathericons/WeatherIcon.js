import React, { useState, useEffect } from "react";
import "./WeatherIcon.css";
import DayClear from "../../images/iconfinder_weather_3.png";
import DayCloudy from "../../images/iconfinder_weather_2.png";
import DayRain from "../../images/iconfinder_weather_17.png";
import DayFog from "../../images/iconfinder_weather_49.png";
import DayCloudyFog from "../../images/iconfinder_weather_39.png";
import DayThunder from "../../images/iconfinder_weather_24.png";
import DaySnow from "../../images/iconfinder_weather_36.png";
import NightClear from "../../images/iconfinder_weather_4.png";
import NightCloudy from "../../images/iconfinder_weather_5.png";
import NightRain from "../../images/iconfinder_weather_18.png";
import NightFog from "../../images/iconfinder_weather_50.png";
import NightCloudyFog from "../../images/iconfinder_weather_40.png";
import NightThunder from "../../images/iconfinder_weather_25.png";
import NightSnow from "../../images/iconfinder_weather_37.png";

const weatherTypes = {
  isThunder: [15, 16, 17, 18, 21, 22, 33, 34, 35, 36, 41],
  isClear: [1],
  isCloudyFog: [25, 26, 27, 28],
  isCloudy: [2, 3, 4, 5, 6, 7],
  isFog: [24],
  isRain: [8, 9, 10, 11, 12, 13, 14, 19, 20, 29, 30, 31, 32, 38, 39],
  isSnow: [23, 37, 42]
};

const weatherIcons = {
  day: {
    isThunder: DayThunder,
    isClear: DayClear,
    isCloudyFog: DayCloudyFog,
    isCloudy: DayCloudy,
    isFog: DayFog,
    isRain: DayRain,
    isSnow: DaySnow
  },
  night: {
    isThunder: NightThunder,
    isClear: NightClear,
    isCloudyFog: NightCloudyFog,
    isCloudy: NightCloudy,
    isFog: NightFog,
    isRain: NightRain,
    isSnow: NightSnow
  }
};

const WeatherIcon = ({ currentWeatherCode, moment }) => {
  const [currentWeatherIcon, setCurrentWeatherIcon] = useState("");

  const weatherCodeType = weatherCode =>
    Object.entries(weatherTypes).reduce(
      (currentWeatherType, [weatherType, weatherCodes]) =>
        weatherCodes.includes(Number(weatherCode))
          ? weatherType
          : currentWeatherType,
      ""
    );
  useEffect(() => {
    const weatherIcon = weatherCodeType(currentWeatherCode);
    setCurrentWeatherIcon(weatherIcon);
  }, [currentWeatherCode]);

  return (
    <div className="weather-icon">
      <img src={weatherIcons[moment][currentWeatherIcon]} />
    </div>
  );
};

export default WeatherIcon;
