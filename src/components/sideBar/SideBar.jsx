
// react icons 
import { FaAngleRight, FaProductHunt } from "react-icons/fa";
import { MdDashboard, MdLock } from "react-icons/md";
import { MdCategory } from "react-icons/md";
import { TbBrandBootstrap } from "react-icons/tb";
import { FaPix } from "react-icons/fa6";
import { FaChevronDown } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";

import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import createToast from "../../utils/toastify";


import { MyContext } from "../../App";

import "./SideBar.css";

const SideBar = () => {
    const [activeTab, setActiveTab] = useState(null); // Track the active submenu
  
    const context = useContext(MyContext)

    const isOpenSubmenu = (index) => {
        setActiveTab((prevActiveTab) => (prevActiveTab === index ? null : index)); // Toggle submenu, close others
    };
   
    const navigate = useNavigate()

     // user logout 
   const handleLogout = () => {
      localStorage.clear();
 
    setTimeout(() => {
        navigate("/login");
        createToast("User Logout Successful", "success");
     }, 2000);
   }; 
 

  return (
    <>
        <div className={`sideBar-wrapper ${context?.isSidebarOpen ? "open" : ""}`}>
         <div className="all-left-menu">
            <h4 className="mt-3"> </h4>
           <ul>
            {/* dashboard */}
            <li>
                <button className={activeTab === 0 ? "active" : ""} onClick={() => isOpenSubmenu(0)} >
                    <span className="icon">
                        <MdDashboard />
                    </span>
                    Dashboard
                    <span className="angle">
                    {
                    activeTab === 0 ? ( <FaChevronDown className="angle-down" />) 
                    : ( <FaAngleRight className="angle-right" /> )
                    }
                    </span>
                </button>
                <div className={`submenuWrapper ${ activeTab === 0 ? "colapse" : "colapsed" }`}>
                    <ul>
                        <li>
                        <Link to="/ecommerce">Ecommerce</Link>
                        </li>
                        <li>
                        <Link to="/analytics">Analytics</Link>
                        </li>
                    </ul>
                </div>
            </li>
            {/* product */}
            <li>
                <button className={activeTab === 1 ? "active" : ""} onClick={() => isOpenSubmenu(1)} >
                <span className="icon">
                    <FaProductHunt />
                </span>
                Products
                <span className="angle">
                  {
                   activeTab === 1 ? ( <FaChevronDown className="angle-down" /> ) 
                    : ( <FaAngleRight className="angle-right" /> )}
                </span>
                </button>
                <div className={`submenuWrapper ${ activeTab === 1 ? "colapse" : "colapsed" }`} >
                    <ul>
                        <li>
                          <Link to="/product-upload"> Add New Product  </Link>
                        </li>
                        <li>
                           <Link to="/product-list"> Product List </Link> 
                        </li>
                        <li>
                            <Link to="/product-ram"> Add Product Ram  </Link>
                        </li>
                        <li>
                            <Link to="/product-weight"> Add Product Weight </Link>
                        </li>
                        <li>
                           <Link to="/brand"> Add Product  Brand </Link> 
                        </li> 
                        <li>
                           <Link to="/product-size"> Add Product Size  </Link>
                        </li>
                    </ul>
                </div>
            </li>
            {/* category */}
            <li>
                <button className={activeTab === 2 ? "active" : ""} onClick={() => isOpenSubmenu(2)} >
                <span className="icon">
                    <MdCategory />
                </span>
                Category
                <span className="angle">
                  {
                   activeTab === 2 ? ( <FaChevronDown className="angle-down" /> ) 
                    : ( <FaAngleRight className="angle-right" /> )}
                </span>
                </button>
                <div className={`submenuWrapper ${ activeTab === 2 ? "colapse" : "colapsed" }`} >
                    <ul>
                        <li>
                            <Link to="/category-add">Add New Category </Link> 
                        </li>
                        <li>
                           <Link to="/category"> Category List </Link>
                        </li>
                        <li>
                           <Link to="/sub-category"> Add Sub Category </Link> 
                        </li>
                 
                    </ul>
                </div>
            </li>
            {/* slider */}
            <li>
                <button className={activeTab === 3 ? "active" : ""} onClick={() => isOpenSubmenu(3)} >
                <span className="icon">
                    <FaPix />
                </span>
                Slider
                <span className="angle">
                  {
                   activeTab === 3 ? ( <FaChevronDown className="angle-down" /> ) 
                    : ( <FaAngleRight className="angle-right" /> )}
                </span>
                </button>
                <div className={`submenuWrapper ${ activeTab === 3 ? "colapse" : "colapsed" }`} >
                    <ul>
                        <li>
                           <Link to="/slider-add"> Slider Add </Link>
                        </li>
                        <li>
                           <Link to="/slider-list"> Slider List </Link>
                        </li>
                 
                    </ul>
                </div>
            </li>
            {/* order  */}
            <li>
                <button className={activeTab === 4 ? "active" : ""} onClick={() => isOpenSubmenu(4)} >
                <span className="icon">
                    <TbBrandBootstrap />
                </span>
                Order
                <span className="angle">
                  {
                   activeTab === 4 ? ( <FaChevronDown className="angle-down" /> ) 
                    : ( <FaAngleRight className="angle-right" /> )}
                </span>
                </button>
                <div className={`submenuWrapper ${ activeTab === 4 ? "colapse" : "colapsed" }`} >
                    <ul>
                        <li>
                           <Link to="/order-list"> Order List </Link>
                        </li>
                 
                    </ul>
                </div>
            </li>

            {/* user */}
            <li>
                <button className={activeTab === 5 ? "active" : ""} onClick={() => isOpenSubmenu(5)} >
                <span className="icon">
                    <FaRegUserCircle />
                </span>
                Users
                <span className="angle">
                  {
                   activeTab === 5 ? ( <FaChevronDown className="angle-down" /> ) 
                    : ( <FaAngleRight className="angle-right" /> )}
                </span>
                </button>
                <div className={`submenuWrapper ${ activeTab === 5 ? "colapse" : "colapsed" }`} >
                    <ul>
                        <li>
                           <Link to="/user-list"> Users List </Link>
                        </li>
                        <li>
                           <Link to="/my-account"> My Account </Link>
                        </li>
                    </ul>
                </div>
            </li>
          </ul>
            <div className="logoutWrapper">
              <Link to="">
                  <button onClick={handleLogout}> 
                       <span> <MdLock /></span> 
                        Logout
                   </button>
               </Link>
            </div>
         </div>
        </div>
    </>
  )
}

export default SideBar; 














