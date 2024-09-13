
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaArrowTrendUp } from "react-icons/fa6";
import { FaArrowTrendDown } from "react-icons/fa6";
import { IoTimerOutline } from "react-icons/io5";

import { useState } from "react";


import "./DashBoardBox.css";

const DashBoardBox = ({ text, color, total, icon, discount, discountColor, grow }) => {
  const [openBoxday, setOpenBoxDay ] = useState(false)

 const openBox = () => {
  setOpenBoxDay(() => !openBoxday)
 }

  return (
    <>
       <div className="dashboardBox" style={{  backgroundImage: `linear-gradient(to right, ${color?.[0]} , ${color?.[1]} )`  }}>
        {
          grow === true ?   <span className="cart"> <FaArrowTrendUp /> </span> : <span  className="cart"> <FaArrowTrendDown /> </span>
        }
          <div className="d-flex justify-content-between">
            <div className="col1">
               <h3 className="text-white"> Total {text} </h3>
               <span className="text-white">{total} </span>
            </div>
            <div className="ml-auto">
              {
                icon ?  
                <span className="icon">
                  {icon}
               </span>
               : ""
              }
              
            </div>
          </div>

          <div className="last-month-box d-flex justify-content-between">
            <div className="month">
              <button style={{backgroundColor: discountColor}}> {discount}</button>
              <h4> Last Month </h4>
            </div>
            <div className="dot-icon">
              <button onClick={openBox}><BsThreeDotsVertical /> </button>
              {
               openBoxday === true && 
                <ul>
                  <li> 
                    <span> <IoTimerOutline /></span> 
                    <a href="#"> Last Day </a>
                  </li>
                  <li> 
                    <span> <IoTimerOutline /></span> 
                    <a href="#"> Last week </a>
                  </li>
                  <li> 
                    <span> <IoTimerOutline /></span> 
                    <a href="#"> Last month </a>
                  </li>
                  <li> 
                    <span> <IoTimerOutline /></span> 
                    <a href="#"> Last Year </a>
                  </li>
                </ul>
              }
            </div>
          </div>
       </div>
     
    </>
  )
}

export default DashBoardBox








