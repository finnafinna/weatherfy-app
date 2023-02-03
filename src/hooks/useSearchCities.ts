import { useState } from "react";
import { City, getCoords } from "../api/GeocodingAPI";

export const useSearchCities = () => {
    const [cities, setCities] = useState<City[]>();
    const [isLoading, setIsLoading] = useState(false);

    const searchCities = (search: string) => {
        setIsLoading(true);
        getCoords(search)
            .then(setCities)
            .then(() => {
                setIsLoading(false)
        })
    }


    return {isLoading, cities, searchCities }

}