import { ReactElement } from "react"
interface buttontypes{
    varient:"primary"|"secondary",
    text:string,
    starticon?:ReactElement,
    onClick?:()=>void


}
const varientclasses={
    "primary":"bg-purple-600 text-white",
    "secondary":"bg-purple-200 text-purple-600 font-light"
}
const defaultClasses = "px-4 py-2 rounded-md flex items-center "
export function Button({varient,text,starticon,onClick}:buttontypes){
    return<button onClick={onClick} className={varientclasses[varient]+" "+defaultClasses}>{starticon}{text}</button>
}