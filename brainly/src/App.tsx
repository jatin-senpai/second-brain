
import SignIn from "./assets/pages/signin"
import { Dashboard } from "./assets/pages/dashboard"
import { BrowserRouter , Route, Routes} from "react-router-dom"
import { SignUp } from "./assets/pages/signup"
function App(){
    return(
      <BrowserRouter>
        <Routes>
            <Route path="/signup" element={<SignUp/>}></Route>
            <Route path="/signin" element={<SignIn/>}></Route>
            <Route path="/dashboard" element={<Dashboard/>}></Route>
        </Routes>
      </BrowserRouter>
     
      
    )
  
  
    
  }
  
 
  

export default App