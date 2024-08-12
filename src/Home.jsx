import Sidenavbar from "../components/Sidenavbar";
import Header from "../components/Header";
import Myprofile from "../components/Myprofile";
import Applypass from "../components/Applypass";
import Appliedpass from "../components/Appliedpass";
import Contact from "../components/Contact";
import Printpass from "../components/Printpass";
import "./Home.css";
import { useState } from "react";

function Home(){
    const [selecttab,setselectab]=useState("My Profile");


    return (
        <>  
   <div className="app-container">
   <Sidenavbar selecttab={selecttab} setselectab={setselectab}></Sidenavbar>  
   <div className="content"> 
    <Header></Header>
  {selecttab=== "My Profile" ? <Myprofile></Myprofile> :
   selecttab === "Apply Pass" ? <Myprofile></Myprofile> : 
  selecttab === "Applied Pass" ? <Appliedpass></Appliedpass> :
  selecttab === "Print Visitor Pass" ? <Printpass></Printpass> :
  selecttab === "Contact Us" ? <Contact></Contact> : null}

 
    </div>
    </div>   
         
    </>
    
);
}
export default Home;