import { MoonLoader } from "react-spinners";


export function Loading(props?: any) {
    return(
        <div className="flex justify-center items-center w-full"><MoonLoader color={props?.color ?? '#000000'} className="text-justify" /></div>
    )
}