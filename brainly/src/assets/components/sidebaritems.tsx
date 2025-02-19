import { ReactElement } from "react"


export function SidebarItems({text,icon}:{
    text:string,
    icon:ReactElement
}){
    return <div className="flex items-center ml-4 cursor-pointer hover:bg-gray-200">
        <div className="pr-2">{icon}</div>
        <div className="">{text}</div>
         
    </div>
}