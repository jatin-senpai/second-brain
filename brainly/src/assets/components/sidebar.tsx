import { SidebarItems } from "./sidebaritems"
import { brain } from "./icons/brain"
import { x } from "./icons/x"
import { youtube } from "./icons/youtube"
export function Sidebar(){
    return <div className=" h-screen w-72 bg-white absolute fixed left-0 top-0 pl-4 ">
        <div className="p-4 text-2xl flex items-center ">
            <div className="pr-2">{brain}</div>
            <div>Second-Brain</div></div>
        <div><SidebarItems text="Youtube" icon={youtube}/></div>
        <div><SidebarItems text="Twitter" icon={x}/></div>
    </div>
}