import { useEffect, useState } from "react"
import { getWeatherIcon } from "../api/WeatherAPI";

import { useGetDailyWeather } from "../hooks/useGetDailyWeather";
import { useGetHourlyWeather } from "../hooks/useGetHourlyWeather";
import DailyWeatherGraph from "./DailyWeatherGraph";
import WeatherCard from "./WeatherCard";




export default function DailyWeather(props: any) {

    const {hourlyWeather, getHourlyWeather} = useGetHourlyWeather();
    const {dailyWeather, getDailyWeather} = useGetDailyWeather();
    const [isLoading, setIsLoading] = useState<Boolean>(false);

    const fetchData = () => {
        getHourlyWeather(props.city.latitude, props.city.longitude).then(() => {
            getDailyWeather(props.city.latitude, props.city.longitude).then(() => {
                setIsLoading(false)
            })
        })
    }



    useEffect(() => {
        setIsLoading(true)
        if(props.city){
            fetchData();
        }
    },[props.city])

    return(
        <div className="flex flex-row h-[90vh]">
                <WeatherCard city={props.city} isLoading={isLoading} dailyWeather={dailyWeather}  />
                <div className="flex flex-col w-9/12">
                    <section className="flex flex-col w-[95%] bg-white rounded-2xl p-5 m-5 font-inter">
                        <span className="font-semibold text-xl">Hourly Forecast</span>
                        <div className="flex flex-row m-3 overflow-x-scroll scrollbar-thin scrollbar-track-transparent scrollbar-thumb-zinc-300 rounded-xl" >
                            {hourlyWeather && hourlyWeather.hourly.temperature_2m.slice(0,24).map((temp, i) => <div className="flex flex-col p-5 text-center items-center whitespace-nowrap">
                                <span className="text-lg font-semibold">{Intl.DateTimeFormat(undefined, {hour: "numeric" ,minute: "numeric", hour12: true}).format( new Date (hourlyWeather.hourly.time[i] * 1000) )}</span>
                                <img className="w-14" src={(getWeatherIcon(hourlyWeather.hourly.weathercode[i])?.svg) ?? "../src/assets/icons/sunny.svg"} />
                                <span className="p-2 font-semibold text-2xl">{temp}°</span>
                            </div>) }
                        </div>
                    </section>
                    <DailyWeatherGraph city={props.city} isLoading={isLoading} hourlyWeather={hourlyWeather} />
                </div>
        </div>
)}