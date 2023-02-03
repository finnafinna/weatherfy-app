
import NavBarSearch from './NavBarSearch'
export default function NavBar(props: any ) {
    const { city, setCity } = props;

return(
    <section className=" w-screen max-h-[10vh] min-h-[5vh] flex flex-row font-semibold">
        <NavBarSearch curCity={city} setCurCity={setCity} />
        <div className='flex text-center items-center w-3/12'>
            <span className='px-3 cursor-pointer hover:font-bold'>Today</span>
            <span className='px-3 cursor-pointer hover:font-bold'>Weekly</span>
        </div>
        <div className='flex items-end content-end text-right  font-bold text-lg w-4/12'>
            <p className='flex right-[-26vw] relative border-b-2 pt-4 border-black h-full'>{city && city.name}</p>
        </div>
       

    </section>
)
} 