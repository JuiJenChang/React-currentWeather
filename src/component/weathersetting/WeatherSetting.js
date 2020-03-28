import React, { useState } from "react";
import "./WeatherSetting.css";

const cities = [
  {
    cityName: "宜蘭縣",
    locationName: "宜蘭"
  },
  {
    cityName: "嘉義市",
    locationName: "嘉義"
  },
  {
    cityName: "屏東縣",
    locationName: "恆春"
  },
  {
    cityName: "雲林縣",
    locationName: "古坑"
  },
  {
    cityName: "臺東縣",
    locationName: "臺東"
  },
  {
    cityName: "臺北市",
    locationName: "臺北"
  },
  {
    cityName: "金門縣",
    locationName: "金門"
  },
  {
    cityName: "桃園市",
    locationName: "新屋"
  },
  {
    cityName: "彰化縣",
    locationName: "彰師大"
  },
  {
    cityName: "高雄市",
    locationName: "高雄"
  },
  {
    cityName: "基隆市",
    locationName: "基隆"
  },
  {
    cityName: "臺南市",
    locationName: "南區中心"
  },
  {
    cityName: "南投縣",
    locationName: "日月潭"
  },
  {
    cityName: "臺中市",
    locationName: "臺中"
  },
  {
    cityName: "新竹縣",
    locationName: "新竹"
  },
  {
    cityName: "花蓮縣",
    locationName: "花蓮"
  },
  {
    cityName: "連江縣",
    locationName: "馬祖"
  },
  {
    cityName: "澎湖縣",
    locationName: "澎湖"
  },
  {
    cityName: "新北市",
    locationName: "板橋"
  }
];

const WeatherSetting = ({
  page,
  openSetting,
  setLocationName,
  setCityName
}) => {
  const [city, setCity] = useState("臺北市");

  const handleSave = () => {
    cities.reduce((acc, current) => {
      if (current.cityName.includes(city)) {
        setCityName(current.cityName);
        setLocationName(current.locationName);
        openSetting();
      }
    }, {});
  };

  return (
    <div className="weather-setting">
      <label>設定地區</label>
      <input
        list="location-list"
        value={city}
        onChange={e => setCity(e.target.value)}
      />
      <datalist id="location-list">
        {cities.map(element => (
          <option value={element.cityName} key={element.cityName} />
        ))}
      </datalist>
      <div className="weather-setting-btn">
        <button onClick={openSetting}>返回</button>
        <button onClick={handleSave}>儲存</button>
      </div>
    </div>
  );
};

export default WeatherSetting;
