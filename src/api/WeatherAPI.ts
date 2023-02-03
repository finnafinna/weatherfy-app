import { ReactNode } from "react";
import { IconType } from "react-icons";
import { MdEast, MdNorth, MdNorthEast, MdNorthWest, MdSouth, MdSouthEast, MdSouthWest, MdWest } from "react-icons/md";


export type WeatherHourly = {
    hourly: {
    temperature_2m: number[];
    relativehumidity_2m: number[];
    precipitation: number[];
    windspeed_10m: number[];
    winddirection_10m: number[];
    weathercode: number[];
    time: number[];
    }
}

export type WeatherDaily = {
    daily: {
        time: string[];
        weathercode: number[];
        temperature_2m_max: number[];
        temperature_2m_min: number[];
        sunrise: string[];
        sunset: string[];
        precipitation_sum: number[];
        windspeed_10m_max: number[];
        winddirection_10m_dominant: number[];
    }
}

export function degToCompass(num: number) {
    var val = Math.floor((num / 22.5) + 0.5);
    var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    return arr[(val % 16)];
}

export const getWeatherIcon = (weathercode: number) => {
    type WeatherMap = {
        svg: string;
        def: string;
    }
    const map = new Map<number, WeatherMap>();
    const setDic = () => {
        map.set(0, {svg: "../src/assets/icons/sunny.svg", def: 'Sunny' });
        map.set(1, {svg: "../src/assets/icons/sunny.svg", def: 'Mainly sunny.' });
        map.set(2, {svg: "../src/assets/icons/partly_cloudy.svg", def: 'Partly cloudy'});
        map.set(3, {svg: "../src/assets/icons/cloudy.svg", def: 'Overcast'});
        map.set(45, {svg: "../src/assets/icons/foggy.svg", def: 'Foggy' });
        map.set(48, {svg: "../src/assets/icons/foggy.svg", def: 'Depositing rime fog'});
        map.set(51, {svg: "../src/assets/icons/rain_light.svg", def: 'Light drizzle' });
        map.set(53, {svg: "../src/assets/icons/rain_light.svg", def: 'Moderate drizzle' });
        map.set(55, {svg: "../src/assets/icons/rain.svg", def: 'Heavy drizzle' });
        map.set(56, {svg: "../src/assets/icons/rain_light.svg", def: 'Light freezing drizzle' });
        map.set(57, {svg: "../src/assets/icons/rain_light.svg", def: 'Heavy freezing drizzle' });
        map.set(61, {svg: "../src/assets/icons/rain.svg", def: 'Light rain' });
        map.set(63, {svg: "../src/assets/icons/rain.svg", def: 'Moderate rain' });
        map.set(65, {svg: "../src/assets/icons/rain_heavy.svg", def: 'Heavy rain' });
        map.set(66, {svg: "../src/assets/icons/rain_light.svg", def: 'Light freezing rain' });
        map.set(67, {svg: "../src/assets/icons/rain_heavy.svg", def: 'Heavy freezing rain' });
        map.set(71, {svg: "../src/assets/icons/snow.svg", def: 'Slight snowfall'});
        map.set(73, {svg: "../src/assets/icons/snow.svg", def: 'Moderate snowfall'});
        map.set(75, {svg: "../src/assets/icons/snow.svg", def: 'Heavy snowfall'});
        map.set(77, {svg: "../src/assets/icons/snow.svg", def: 'Snow grains'});
        map.set(80, {svg: "../src/assets/icons/rain_light.svg", def: 'Slight rain showers' });
        map.set(81, {svg: "../src/assets/icons/rain.svg", def: 'Moderate rain showers' });
        map.set(82, {svg: "../src/assets/icons/rain_heavy.svg", def: 'Voilent rain showers' });
        map.set(85, {svg: "../src/assets/icons/snow.svg", def: 'Slight snow showers'});
        map.set(86, {svg: "../src/assets/icons/snow.svg", def: 'Heavy snow showers'});
        map.set(95, {svg: "../src/assets/icons/storm.svg", def: 'Thunderstorm'});
        map.set(96, {svg: "../src/assets/icons/storm.svg", def: 'Thunderstorm with slight hail'});
        map.set(99, {svg: "../src/assets/icons/hail.svg", def: 'Thunderstorm with heavy hail'});
    }

    setDic();
    if(map.get(weathercode)){
        const result = map.get(weathercode);
        return result
    }


};

export const getDirectionIcon = (direction: string) => {
    const map = new Map<string, IconType>();
    map.set('N', MdNorth)
    map.set('NNE', MdNorthEast)
    map.set('NE', MdNorthEast)
    map.set('ENE', MdNorthEast)
    map.set('E', MdEast)
    map.set('ESE', MdSouthEast)
    map.set('SE', MdSouthEast)
    map.set('SSE', MdSouthEast)
    map.set('S', MdSouth)
    map.set('SSW', MdSouthWest)
    map.set('SW', MdSouthWest)
    map.set('WSW', MdSouthWest)
    map.set('W', MdWest)
    map.set('WNW', MdNorthWest)
    map.set('NW', MdNorthWest)
    map.set('NNW', MdNorthWest)
    

    if(map.get(direction)){
        return map.get(direction);
    }

}


export function getWeatherHourly(lat: number, long: number) {
    return fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m,relativehumidity_2m,precipitation,windspeed_10m,winddirection_10m,weathercode&timeformat=unixtime&timezone=auto`)
    .then(response => response.json())
}

export function getWeatherDaily(lat: number, long: number) {
    return fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum,windspeed_10m_max,winddirection_10m_dominant&timezone=auto`)
    .then(response => response.json())
}
