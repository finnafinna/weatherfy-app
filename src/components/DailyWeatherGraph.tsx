import { useEffect, useState } from "react";
import { Area, AreaChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import CustomTooltip from "./CustomTooltip";


interface GraphData {
    Hour: string,
    Temperature: number
}


export default function DailyWeatherGraph(props: any) {
    const {isLoading, city, hourlyWeather  } = props;
    const [data, setData] = useState<GraphData[]>([]);
    const [toggled, setToggled] = useState<boolean[]>([false, false, false]);
    

    const convertData = (originalData: number[]) => {
        originalData.map((val, i) => {
                if (i === 0) {
                    setData([{Hour: Intl.DateTimeFormat(undefined, {hour: 'numeric',minute: 'numeric'}).format(new Date(hourlyWeather.hourly.time[i] * 1000)), Temperature: val }])
                }
                else{
                    setData((data) => [...data, {Hour: Intl.DateTimeFormat(undefined, {hour: 'numeric',minute: 'numeric'}).format(new Date(hourlyWeather.hourly.time[i] * 1000)), Temperature: val }])
                }
        })
    }

    const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const updateState = () => {
            const nextToggled = toggled.map((state, i) => {
                if(i.toString() === e.currentTarget.id){
                    return true;
                }
                else return false;
            })
            setToggled(nextToggled)
        }

        const updateGraph = () => {
            if (e.currentTarget.id === "0") {
                convertData(hourlyWeather.hourly.temperature_2m.slice(0, 24))
            }
            if (e.currentTarget.id === "1") {
                convertData(hourlyWeather.hourly.precipitation.slice(0, 24))
            }
            if (e.currentTarget.id === "2") {
                convertData(hourlyWeather.hourly.windspeed_10m.slice(0, 24))
            }

        }

        for (let i = 0; i < 3; i++){
            if (e.currentTarget.id === i.toString()) {
                if (toggled[i]) {
                    e.currentTarget.className = 'p-1 m-1';
                }
                else {
                    e.currentTarget.className = 'p-1 m-1 font-bold border-b border-b-black';
                }
            }
            else {
                let button = document.getElementById(i.toString())
                if (button) {button.className = 'p-1 m-1'}
            }
        }
        updateState();
        updateGraph();

    }

    useEffect(() => {
        if (hourlyWeather){
            convertData(hourlyWeather.hourly.temperature_2m.slice(0, 24))
        }
    },[])



    return(
    <section className="flex flex-col w-[95%] bg-white rounded-2xl p-5 m-5 font-inter">
        <div className="flex justify-between">
            <span className="font-semibold text-xl" onClick={() => convertData(hourlyWeather.hourly.temperature_2m.slice(0,24))}>Hourly Forecast Graph</span>
            <div className="flex flex-row font-semibold">
                <button id="0" className="p-1 m-1" onClick={(e) => handleButtonClick(e)}>Temp</button>
                <button id="1" className="p-1 m-1" onClick={(e) => handleButtonClick(e)}>Precip</button>
                <button id="2" className="p-1 m-1" onClick={(e) => handleButtonClick(e)}>Wind</button>
            </div>
        </div>
            {hourlyWeather && <div className="w-full h-full p-5">
                <ResponsiveContainer width="100%" aspect={2.8}>
                    <AreaChart width={1200} height={300} data={data} >
                        <XAxis padding='gap' tickMargin={10} dataKey="Hour" interval={2} />
                        <YAxis tickMargin={10} />
                        <Area activeDot={{strokeWidth: 4, r:10}} type='natural' strokeWidth={4} dataKey='Temperature' stroke='#ffde24' fill='#fff4b8' />
                        <Tooltip content={<CustomTooltip />} />
                    </AreaChart>
                </ResponsiveContainer>
                </div>}
    </section>
)}