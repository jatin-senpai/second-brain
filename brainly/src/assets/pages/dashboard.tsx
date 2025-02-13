import { Button } from "../components/button"
import { add } from "../components/icons/add"
import { share } from "../components/icons/sharre"
import { Card } from "../components/card"
import { CreateContentModal } from "../components/createmodel"
import { Sidebar } from "../components/sidebar"
import { useEffect, useState } from "react"
import { useContent } from "../../hooks/useContent"
import { Backend_Url } from "../../config"


export function Dashboard() {
  const [modalopen,setModal] = useState(false)
  const {contents,refresh} = useContent()
  useEffect(()=>{
    refresh
  },[modalopen])
  return (
    <>
    <div >
      
      <Sidebar />
      <div className="p-4 ml-72 min-h-screen bg-gray-50">
        <CreateContentModal open={modalopen} onClose={()=>{
          setModal(false)
        }}/>
        <div className="flex justify-end gap-4 mt-4 me-4">
          <Button onClick={()=>setModal(true)} varient="primary" text="Add Content" starticon={add}></Button>
          <Button onClick={async ()=>{
            let response = await axios.post(Backend_Url+"api/v1/brain/share",{
              share:true
            },{
              headers:{
                "Authorization": localStorage.getItem("token")
              }
            })
            const shareurl = Backend_Url+"/brain:"+response.data.hash
            alert(shareurl)
          }}varient="secondary" text="Share" starticon={share}></Button>
        </div>
        
        <div className="flex gap-4 flex-wrap">
          {contents.map(({type,link,title})=><Card type={type} link={link} title={title}/>)}
          
          
          
        </div>
      </div>
    </div>
      
      
      
    </>
  )
}


