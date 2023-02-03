import { useState } from "react";
import { getWeatherDaily, WeatherDaily } from "../api/WeatherAPI";

export function useGetDailyWeather () {
    const [dailyWeather, setDailyWeather] = useState<WeatherDaily>();
    const getDailyWeather = (lat: number, long: number) => {
        return getWeatherDaily(lat, long).then(setDailyWeather)
    }
    return {dailyWeather, getDailyWeather}
}