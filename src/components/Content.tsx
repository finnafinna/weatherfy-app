import { City } from "../api/GeocodingAPI";
import DailyWeather from "./DailyWeather";


export default function Content(props: any) {
    const { city } = props;


    return (
        <section className="w-screen h-full  bg-zinc-200 font-inter">
            <DailyWeather city={city} />
        </section>
    )
}