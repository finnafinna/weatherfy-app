import { MenuUnstyled, MenuUnstyledActions } from "@mui/base";
import MenuItemUnstyled from "@mui/base/MenuItemUnstyled";
import { FormEvent, useRef, useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { City } from "../api/GeocodingAPI";
import { useSearchCities } from "../hooks/useSearchCities";
import { Loading } from "./Loading";




export default function NavBarSearch(props:any) {
    const [anchorEl, setAnchorEl] = useState<HTMLInputElement | null>(null);
    const menuRef = useRef<HTMLInputElement>(null);
    const isOpen = Boolean(anchorEl);
    let inputWidth: string = menuRef.current?.width + 'px';

    const {curCity, setCurCity} = props;
    const [formValue, setFormValue] = useState<string>('');
    const {isLoading, cities, searchCities } = useSearchCities();

    const handleSearch = (e: FormEvent<HTMLFormElement>, search: string) => {
        e.preventDefault();
        searchCities(search);
        setAnchorEl(menuRef.current);
    }

    const handleClick = (city: City) => {
        setCurCity(city);
        setAnchorEl(null);

    }

    return(
        <div className="flex flex-col p-3  ml-8 rounded-xl w-5/12">
            <form onSubmit={(e) => handleSearch(e, formValue)} className='flex flex-row text-center items-center'>
                <input ref={menuRef} value={formValue} className='text-black placeholder:text-black px-3 py-1 rounded-xl focus-visible:outline-1 outline-1 outline-black/50 outline' onChange={(e) => setFormValue(e.target.value)} placeholder='Search for city/town...' />
                <BiSearchAlt size={'1.5em'} className='mx-1 cursor-pointer' />
            </form>
            <MenuUnstyled className=" max-h-[15vh] overflow-y-scroll scrollbar-thin scrollbar-track-transparent scrollbar-thumb-zinc-700/30 mt-[0.1em] bg-white rounded-xl focus-visible:outline-transparent transition-opacity duration-500" anchorEl={anchorEl} open={isOpen} onClose={() => setAnchorEl(null)}>
                 {isLoading ? <MenuItemUnstyled className="overflow-hidden focus-visible:outline-transparent bg-transparent"><Loading color='#000000' /></MenuItemUnstyled> : cities?.map((city) => <MenuItemUnstyled className="py-2 flex flex-row text-center items-center cursor-pointer mx-3 font-semibold border-b-1 border-b border-b-black px-3 focus-visible:outline-transparent" onClick={() => handleClick(city)}>
                    {city.name}, {city.country}
                    </MenuItemUnstyled>)}
            </MenuUnstyled>
        </div>
    )
}