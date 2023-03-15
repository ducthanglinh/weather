import classNames from "classnames/bind";
import React, { useState } from "react";
import axios from "axios";
import styles from "./Weather.module.scss";
const cx = classNames.bind(styles);

const API_KEY = "96fbba9950f64367946165005231503";
const BASE_URL = "http://api.weatherapi.com/v1";

function Weather() {
  let [weather, setWeather] = useState();
  const [address, setAddress] = useState();

  async function getWeather() {
    try {
      const response = await axios.get(
        `${BASE_URL}/current.json?key=${API_KEY}&q=${address}&aqi=no`
      );
      setWeather(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios
        .get(`${BASE_URL}/current.json?key=${API_KEY}&q=${address}&aqi=no`)
        .then((response) => {
          setWeather(response.data);
          console.log(response.data);
        });
      setAddress("");
    }
  };

  return (
    <div className={cx("app")}>
      <div className={cx("search")}>
        <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          onKeyPress={searchLocation}
          type="text"
        />
        <button className={cx("btnSearch")} onClick={getWeather}>
          Tra cứu
        </button>
      </div>
      <div className={cx("container")}>
        <div className={cx("top")}>
          <div className={cx("location")}>
            <p>
              {weather?.location?.name} - {weather?.location?.country}
            </p>
          </div>
          <div className={cx("temp")}>
            <h1>{weather?.current?.temp_c} &#176;C</h1>
          </div>
          <div className={cx("des")}>
            <p>{weather?.current?.condition?.text}</p>
          </div>
        </div>
        <div className={cx("bottom")}>
          <div className={cx("feels")}>
            <span className={cx("bottom-title")}>Nhiệt Độ</span>
            <p>{weather?.current?.temp_f} &#176;F</p>
          </div>
          <div className={cx("humidity")}>
            <span className={cx("bottom-title")}>Độ ẩm</span>

            <p>{weather?.current?.humidity}%</p>
          </div>
          <div className={cx("wind")}>
            <span className={cx("bottom-title")}>Gió</span>

            <p>{weather?.current?.wind_mph} MPH</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Weather;
