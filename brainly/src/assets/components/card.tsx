import { share } from "./icons/sharre"
interface Cardprops{
    title:string,
    link:string,
    type:"twitter"|"youtube"
}
export function Card({title,link,type}:Cardprops){
    return(
        <div className="p-4 border  bg-white rounded-md  outline-slate-200 max-w-72 min-h-48">
            <div className="flex justify-between">
                <div className="flex items-center text-md">
                    <div className="text-gray-500 pr-2">
                        {share}
                    </div>
                    {title}
                </div>
                <div className="flex">
                    <div className="pr-2 text-gray-500" >
                        <a href={link} target="_blank">{share}</a>
                        
                    </div>
                    <div className="text-gray-500">
                        {share}
                    </div>
                </div>

            </div>
            <div className="pt-4">
                {type==="youtube" && <iframe className="w-full"  src={link.replace("watch","embed").replace("?v=","/")} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>}
                
                {type==="twitter" && <blockquote className="twitter-tweet">
                    <a href={link.replace("x.com","twitter.com")}></a> 
                </blockquote>}
                
            </div>
            
            
            
        </div>
    )
}