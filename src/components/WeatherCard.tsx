import { degToCompass, getDirectionIcon, getWeatherIcon } from "../api/WeatherAPI";
import { Loading } from "./Loading";
import { WiSunrise, WiSunset } from 'react-icons/wi'
import { BsFillCloudRainFill } from 'react-icons/bs'


export default function WeatherCard(props: any) {
    const {isLoading, city, dailyWeather  } = props;

    function getDirection(){
        const Icon = getDirectionIcon(degToCompass(dailyWeather.daily.winddirection_10m_dominant[0]));
        if (Icon) return <Icon className="text-white" />
    }
    dailyWeather && getDirection()
    return(
        <section className="flex flex-col h-full w-3/12 bg-gradient-to-tl from-sky-300 via-blue-600 to-purple-400 m-5 rounded-2xl items-center text-left shadow-2xl overflow-clip">
                    <span className="text-white p-2 flex text-[2.5rem] font-inter font-semibold">{ props.city && props?.city.name}</span>
                    <img className="w-9/12  rounded-3xl" src={(dailyWeather && getWeatherIcon(dailyWeather?.daily.weathercode[0])?.svg) ?? "../src/assets/icons/sunny.svg"} />
                   {isLoading ? <div className="w-full h-full p-5"><Loading color="#FFFFFF" /></div> :
                     <div className="w-full px-6 text-white">
                        { dailyWeather && <><h1 className="text-white flex text-[5rem] font-inter font-regular">{dailyWeather.daily.temperature_2m_max[0]}<span className="text-[0.8em] pt-1">°</span><span className="text-5xl font-semibold pt-6">C</span></h1>
                        <div className="-translate-y-6 ">
                            <h2 className="text-white/60 flex text-[2rem] font-inter font-regular">{dailyWeather.daily.temperature_2m_min[0]}<span className="text-[0.8em]">°</span><span className="text-xl font-semibold pt-1">C</span></h2>
                            <div className="flex -translate-y-1"><span className=" text-[2rem]">{getWeatherIcon(dailyWeather.daily.weathercode[0])?.def}</span></div>
                        </div>
                        <div className="flex justify-start font-light py-1">
                            <span className="flex items-center  text-lg"><WiSunrise />{Intl.DateTimeFormat(undefined, {hour: 'numeric',minute: 'numeric',hour12: true}).format(new Date(dailyWeather.daily.sunrise[0]))}</span>
                            <span className="flex px-5 items-center text-white/70 text-lg"><WiSunset />{Intl.DateTimeFormat(undefined, {hour: 'numeric',minute: 'numeric',hour12: true}).format(new Date(dailyWeather.daily.sunset[0]))}</span>
                        </div>
                        <div className="flex justify-start font-light items-center py-1">
                            {getDirection()}
                            <span className="  text-lg font-light px-1">{dailyWeather.daily.windspeed_10m_max[0]}km/h</span>
                        </div>
                        <span className="flex items-center text-lg font-light py-1"><BsFillCloudRainFill className='mr-1' /> {dailyWeather.daily.precipitation_sum[0]}%</span>
                        
                        </>}
                    </div>}
                </section>

    )
}