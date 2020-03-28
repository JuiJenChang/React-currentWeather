import React, { useState, useEffect } from "react";
import "./WeatherCard.css";
import Rain from "../../images/iconfinder_weather_44.png";
import Wind from "../../images/iconfinder_weather_9.png";
import Reset from "../../images/icons8-reset.png";
import Setting from '../../images/icons8-settings.png';
import WeatherIcon from "../weathericons/WeatherIcon";
import WeatherSetting from "../weathersetting/WeatherSetting";

const url_1 =
  "https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=CWB-706FB73B-04B6-4011-A4F7-7908A67C6028&locationName=";

const url_2 =
  "https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-706FB73B-04B6-4011-A4F7-7908A67C6028&locationName=";

const dayOrNight = new Date().getHours();

const WeatherCard = () => {
  const [page, setPage] = useState(false);
  const [locationName, setLocationName] = useState("臺北");
  const [cityName, setCityName] = useState("臺北市");
  const [weatherData, setWeatherData] = useState({
    observationTime: "",
    locationName: "",
    temperature: "",
    windSpeed: "",
    description: "",
    weatherCode: "",
    rainPossibility: "",
    comfortability: ""
  });

  const openSetting = () => {
    setPage(!page);
  };

  const fetchData = async () => {
    const [weatherData_1, weatherData_2] = await Promise.all([
      fetchWeatherData_1(),
      fetchWeatherData_2()
    ]);
    setWeatherData({
      ...weatherData_1,
      ...weatherData_2
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchWeatherData_1 = async () => {
    try {
      const res = await fetch(`${url_1}${locationName}`);
      const data = await res.json();
      console.log(data);
      const locationData = data.records.location[0];
      const weatherElements = locationData.weatherElement.reduce(
        (elements, item) => {
          if (["WDSD", "TEMP"].includes(item.elementName)) {
            elements[item.elementName] = item.elementValue;
          }
          return elements;
        },
        {}
      );
      return {
        observationTime: locationData.time.obsTime,
        temperature: weatherElements.TEMP,
        windSpeed: weatherElements.WDSD
      };
    } catch (error) {
      console.log(error);
    }
  };

  const fetchWeatherData_2 = async () => {
    try {
      const res = await fetch(`${url_2}${cityName}`);
      const data = await res.json();
      console.log(data);
      const locationData = data.records.location[0];
      const weatherElements = locationData.weatherElement.reduce(
        (elements, item) => {
          if (["Wx", "PoP", "CI"].includes(item.elementName)) {
            elements[item.elementName] = item.time[0].parameter;
          }
          return elements;
        },
        {}
      );
      return {
        locationName: locationData.locationName,
        description: weatherElements.Wx.parameterName,
        weatherCode: weatherElements.Wx.parameterValue,
        rainPossibility: weatherElements.PoP.parameterName,
        comfortability: weatherElements.CI.parameterName
      };
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {!page ? (
        <main className="weathercard">
          <div className="weathercard-header">
            <div className="weathercard-location">
              {weatherData.locationName}
            </div>
            <div className="weathercard-control">
              <img src={Reset} onClick={fetchData} className="control-reset" />
              <img src={Setting} onClick={openSetting} className="control-setting"  />
            </div>
          </div>
          <div className="weathercard-description">
            <span>{weatherData.description}</span>
            <span>{weatherData.comfortability}</span>
          </div>
          <div className="weathercard-content">
            <div className="weathercard-temperature">
              {Math.round(weatherData.temperature)}
              <div className="weathercard-celsius">°C</div>
            </div>
            <WeatherIcon
              currentWeatherCode={weatherData.weatherCode}
              moment={
                (dayOrNight >= 18 && dayOrNight <= 23) ||
                (dayOrNight >= 0 && dayOrNight < 6)
                  ? "night"
                  : "day"
              }
            />
          </div>
          <div className="weathercard-airflow">
            <img src={Wind} />
            {weatherData.windSpeed}m/h
          </div>
          <div className="weathercard-rain">
            <img src={Rain} />
            {Math.round(weatherData.rainPossibility)}%
          </div>
          <div className="weathercard-lasttime">
            <span>最後觀測時間 : {weatherData.observationTime}</span>
          </div>
        </main>
      ) : (
        <WeatherSetting
          page={page}
          openSetting={openSetting}
          setLocationName={setLocationName}
          setCityName={setCityName}
        />
      )}
    </div>
  );
};

export default WeatherCard;
