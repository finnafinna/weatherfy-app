import { useState } from "react";
import { getWeatherHourly, WeatherHourly } from "../api/WeatherAPI";


export function useGetHourlyWeather () {
    const [hourlyWeather, setHourlyWeather] = useState<WeatherHourly>();
    const getHourlyWeather = (lat: number, long: number) => {
        return getWeatherHourly(lat, long).then(setHourlyWeather)
    }
    return {hourlyWeather, getHourlyWeather}
}