
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

// images 
import photo from "../../assets/img/goutam.png";
import sujan from "../../assets/img/sujan.jpeg";
import logo from "../../assets/img/logo.png";
import shirt from "../../assets/img/shirt.png";

// react icons 
import { MdMenuOpen, MdOutlineLightMode } from "react-icons/md";
import { IoMenu } from "react-icons/io5"; 
import { CiDark } from "react-icons/ci"; 
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaCaretDown, FaHeart, FaRegUserCircle } from "react-icons/fa";
import { IoIosNotifications, IoMdMail, IoMdSettings } from "react-icons/io";
import { IoCart } from "react-icons/io5";
import { PiShieldWarningFill } from "react-icons/pi";
import { RiLock2Fill } from "react-icons/ri";
import { IoMdMenu } from "react-icons/io";
import { IoSearchSharp } from "react-icons/io5";

import createToast from "../../utils/toastify";

import SearchBox from "../searchBox/SearchBox";
import { MyContext } from "../../App";

import "./Header.css";
const Header = () => {
  const [openDrop, setOpenDrop ] = useState(false); 
  const [openNotification, setOpenNotification ] = useState(false); 
  const [openMail, setOpenMail ] = useState(false); 
  const [cartOpen, setcartOpen ] = useState(false); 

  const context = useContext(MyContext)
  const navigate = useNavigate();


 // handle open 
 const handleOpen  = () => {
  setOpenDrop(() => !openDrop);
 };

 // handle close
 const handleClose  = () => {
  setOpenDrop(false);
 };

 // handle notification
 const handleOpenNoti  = () => {
  setOpenNotification(() => !openNotification);
 };

 // handle mail
 const handleOpenMail  = () => {
  setOpenMail(() => !openMail);
 };

 // handle notification
 const handleOpenCart  = () => {
  setcartOpen(() => !cartOpen);
 }

 // user logout 
 const handleLogout = () => {
   localStorage.clear();

  setTimeout(() => {
      navigate("/login");
      createToast("User Logout Successful", "success");
  }, 2000);
 }; 

  // Check login status on component mount
  useEffect(() => {
   const token = localStorage.getItem("token");

   if (token) {
     context.setIsLogin(true); 
     const userData = JSON.parse(localStorage.getItem("user"));
     context.setUser(userData); 
   } else {
     context.setIsLogin(false); 
     context.setUser({
       name: "",
       email: "",
       userId: ""
     });
   }
 }, []);

  return (
    <>
      <header className="d-flex align-items-center shadow-sm">
        <div className="container-fluid">
           <div className="row header-row ">

         {/********  header part 1  ************/}
            <div className="col-sm-2 col-md-12 part1 menu-option ">
              {/* logo part  */}
                <div className="logo">
                   <Link to="/" className="d-flex align-items-center ">
                       <img src={logo} className="logo"/>
                       <span className="logo-name">EB SQUAD BD </span>
                     </Link>
                </div>
            </div>

         {/********  header part 2  ********/}
             <div className="col-sm-3 part2  ">
                <div className="menu-part mobile-none  ">
                  <button 
                      className="open-btn " 
                      onClick={() => context.setIsToggleSideBar(!context?.isToggleSidebar)} 
                     > 
                  {
                     context?.isToggleSidebar === false ?  <MdMenuOpen />  :  <IoMenu /> 
                  }
                   
                  </button>
                  <div className="search-box">
                    <SearchBox /> 
                  </div>
                </div>
             </div>

         {/********  header part 3  ********/}
            <div className="col-sm-7 part3 ">
             <div className="menu-part menu-last ">
                  {/* tablet show search box */}
                  <div className="search-box tablet-show-search ">
                    <SearchBox /> 
                  </div>

                    <button className="mobile-search-data"> 
                        <IoSearchSharp /> 
                    </button>

                    <button 
                       className="mobile-search-data menu-btn"
                       onClick={context?.toggleSidebar}
                       > 
                        <IoMdMenu /> 
                    </button>
               
                  <button className="open-btn " onClick={() => context.setThemeMode(!context.themeMode)} >
                    {
                     context?.themeMode === true ?  <MdOutlineLightMode />  :  <CiDark /> 
                    }
                  </button>

                  <button className="open-btn cart-icon-top mobile-hide-btn" onClick={handleOpenCart}> <IoCart /> 
                    <div className="topper-box"> 
                        <span> 25 </span>
                    </div>
                  </button>
                  {
                    cartOpen === true && 
                    <div className="notification-drop cart-dropd shadow">
                    <div className="top-bar-notification">
                      <h4> Orders (15) </h4>
                      <p> <IoMdSettings /> </p>
                    </div>
                    <div className="bottom-bar-notification">
                      <div className="single-item-noti custom my-2">
                         <div className="not-image cart-abc">
                            <img src={shirt} alt="" className="mail-img "/>
                           
                         </div>
                         <div className="not-info">
                              <h4> <span> <b>Goutam ray </b> - now  </span></h4>
                              <h6> (  $289.00 ) <span> total price </span>  </h6>
                         </div>
                         <div className="noti-drop">
                            <button> <BsThreeDotsVertical /> </button>
                         </div>
                      </div>
                      <div className="single-item-noti custom my-2">
                      <div className="not-image cart-abc">
                            <img src={shirt} alt="" className="mail-img "/>
                      
                         </div>
                         <div className="not-info">
                              <h4> <span> <b> Shanto ray </b> - 1h  </span></h4>
                              <h6> (  $289.00 ) <span> total price </span>  </h6>
                         </div>
                         <div className="noti-drop">
                            <button> <BsThreeDotsVertical /> </button>
                         </div>
                      </div>
                      <div className="single-item-noti custom my-2">
                      <div className="not-image cart-abc">
                            <img src={shirt} alt="" className="mail-img "/>
                         
                         </div>
                         <div className="not-info">
                              <h4> <span> <b>Hori Shankor ray </b> - 1d  </span></h4>
                              <h6> (  $289.00 ) <span> total price </span>  </h6>
                         </div>
                         <div className="noti-drop">
                            <button> <BsThreeDotsVertical /> </button>
                         </div>
                      </div>
                      <div className="single-item-noti custom my-2">
                      <div className="not-image cart-abc">
                            <img src={shirt} alt="" className="mail-img "/>
                        
                         </div>
                         <div className="not-info">
                              <h4> <span> <b>Durjay ray </b> - 3d  </span></h4>
                              <h6> (  $289.00 ) <span> total price </span>  </h6>
                         </div>
                         <div className="noti-drop">
                            <button> <BsThreeDotsVertical /> </button>
                         </div>
                      </div>
                      <div className="single-item-noti custom my-2">
                      <div className="not-image cart-abc">
                            <img src={shirt} alt="" className="mail-img "/>
                           
                         </div>
                         <div className="not-info">
                              <h4> <span> <b>Uttam ray </b> - 5d  </span></h4>
                              <h6> (  $289.00 ) <span> total price </span>  </h6>
                         </div>
                         <div className="noti-drop">
                            <button> <BsThreeDotsVertical /> </button>
                         </div>
                      </div>
                    
                    </div>
                    <div className="footer-bar">
                      <button> View All Orders </button>
                    </div>
                    </div>
                  }
                  
                  {/**** mail box  ******/}
                  <button className="open-btn " onClick={handleOpenMail}> <IoMdMail /> 
                    <div className="topper-box"> 
                        <span> 5 </span>
                    </div>
                  </button>
                  {
                    openMail === true && 
                    <div className="notification-drop shadow">
                    <div className="top-bar-notification">
                      <h4> Messages (23) </h4>
                      <p> <IoMdSettings /> </p>
                    </div>
                    <div className="bottom-bar-notification">
                      <div className="single-item-noti custom my-2">
                         <div className="not-image">
                            <img src={photo} alt="" className="mail-img "/>
                            <div className="media-act "> </div>
                         </div>
                         <div className="not-info">
                              <h4> <span> <b>Goutam ray </b> - 1h  </span></h4>
                              <h6> Lorem ipsum dolor sit amet, consectetur adipisicing elit.  </h6>
                         </div>
                         <div className="noti-drop">
                            <button> <BsThreeDotsVertical /> </button>
                         </div>
                      </div>
                      <div className="single-item-noti custom my-2">
                         <div className="not-image">
                            <img src={photo} alt="" className="mail-img "/>
                            <div className="media-act "> </div>
                         </div>
                         <div className="not-info">
                              <h4> <span> <b>Durjay ray  </b> - 6h  </span></h4>
                              <h6> Lorem ipsum dolor sit amet, consectetur adipisicing elit.  </h6>
                         </div>
                         <div className="noti-drop">
                            <button> <BsThreeDotsVertical /> </button>
                         </div>
                      </div>
                      <div className="single-item-noti custom my-2">
                         <div className="not-image">
                            <img src={photo} alt="" className="mail-img "/>
                            <div className="media-act "> </div>
                         </div>
                         <div className="not-info">
                              <h4> <span> <b>Uttam ray </b> - 1d  </span></h4>
                              <h6> Lorem ipsum dolor sit amet, consectetur adipisicing elit.  </h6>
                         </div>
                         <div className="noti-drop">
                            <button> <BsThreeDotsVertical /> </button>
                         </div>
                      </div>
                      <div className="single-item-noti custom my-2">
                         <div className="not-image">
                            <img src={photo} alt="" className="mail-img "/>
                            <div className="media-act "> </div>
                         </div>
                         <div className="not-info">
                              <h4> <span> <b>Boltu ray </b> - 2d  </span></h4>
                              <h6> Lorem ipsum dolor sit amet, consectetur adipisicing elit.  </h6>
                         </div>
                         <div className="noti-drop">
                            <button> <BsThreeDotsVertical /> </button>
                         </div>
                      </div>
                      <div className="single-item-noti custom my-2">
                         <div className="not-image">
                            <img src={photo} alt="" className="mail-img "/>
                            <div className="media-act "> </div>
                         </div>
                         <div className="not-info">
                              <h4> <span> <b>Shanto ray </b> - 3d  </span></h4>
                              <h6> Lorem ipsum dolor sit amet, consectetur adipisicing elit.  </h6>
                         </div>
                         <div className="noti-drop">
                            <button> <BsThreeDotsVertical /> </button>
                         </div>
                      </div>
                    
                    </div>
                    <div className="footer-bar">
                      <button> View All Messages </button>
                    </div>
                    </div>
                  }
                  
                  {/**** notofication box *****/}
                  <button className="open-btn mobile-hide-btn" onClick={handleOpenNoti} > 
                  <IoIosNotifications /> 
                     <div className="topper-box"> 
                       <span> 20 </span>
                     </div>
                  </button>
                
                  {
                    openNotification === true && 
                    <div className="notification-drop shadow">
                    <div className="top-bar-notification">
                      <h4> Notifications (34) </h4>
                      <p> <IoMdSettings /> </p>
                    </div>
                    <div className="bottom-bar-notification">
                      <div className="single-item-noti my-2">
                         <div className="not-image">
                            <img src={sujan} alt="" />
                            <div className="media">
                              <FaHeart />
                            </div>
                         </div>
                         <div className="not-info">
                              <h4> <span> <b>Goutam ray </b>  added to his favorite list  <b> Leather belt steve madden</b></span></h4>
                              <p> few seconds ago! </p>
                         </div>
                         <div className="noti-drop">
                            <button> <BsThreeDotsVertical /> </button>
                         </div>
                      </div>
                      <div className="single-item-noti my-2">
                         <div className="not-image">
                            <img src={sujan} alt="" />
                            <div className="media">
                              <FaHeart />
                            </div>
                         </div>
                         <div className="not-info">
                              <h4> <span> <b>Goutam ray </b>  added to his favorite list  <b> Leather belt steve madden</b></span></h4>
                              <p> few seconds ago! </p>
                         </div>
                         <div className="noti-drop">
                            <button> <BsThreeDotsVertical /> </button>
                         </div>
                      </div>
                      <div className="single-item-noti my-2">
                         <div className="not-image">
                            <img src={sujan} alt="" />
                            <div className="media">
                              <FaHeart />
                            </div>
                         </div>
                         <div className="not-info">
                              <h4> <span> <b>Goutam ray </b>  added to his favorite list  <b> Leather belt steve madden</b></span></h4>
                              <p> few seconds ago! </p>
                         </div>
                         <div className="noti-drop">
                            <button> <BsThreeDotsVertical /> </button>
                         </div>
                      </div>
                      <div className="single-item-noti my-2">
                         <div className="not-image">
                            <img src={sujan} alt="" />
                            <div className="media">
                              <FaHeart />
                            </div>
                         </div>
                         <div className="not-info">
                              <h4> <span> <b>Goutam ray </b>  added to his favorite list  <b> Leather belt steve madden</b></span></h4>
                              <p> few seconds ago! </p>
                         </div>
                         <div className="noti-drop">
                            <button> <BsThreeDotsVertical /> </button>
                         </div>
                      </div>
                      <div className="single-item-noti my-2">
                         <div className="not-image">
                            <img src={sujan} alt="" />
                            <div className="media">
                              <FaHeart />
                            </div>
                         </div>
                         <div className="not-info">
                              <h4> <span> <b>Goutam ray </b>  added to his favorite list  <b> Leather belt steve madden</b></span></h4>
                              <p> few seconds ago! </p>
                         </div>
                         <div className="noti-drop">
                            <button> <BsThreeDotsVertical /> </button>
                         </div>
                      </div>
                    </div>
                    <div className="footer-bar">
                      <button> View All Notifications </button>
                    </div>
                    </div>
                  }
                   {context?.isLogin !== true ? (
                        <Link to="/login">
                           <button className="signUp-btn"> Sign Up </button>
                        </Link>
                        ) : (
                        <button className="myAcc d-flex align-items-center" onClick={handleOpen}>
                           <div className="user-img">
                              <span className="rounded-circle">
                              {context.user?.name?.charAt(0)}
                              </span>
                           </div>
                           <div className="user-name">
                              <div className="name">
                              <h4>{context.user?.name}</h4>
                              <div className="drop-icon">
                                 <FaCaretDown />
                              </div>
                              </div>
                              <div className="nick-name">
                              {context?.user?.email}
                              </div>
                           </div>
                        </button>
                        )}
                  
                  
                 {
                  openDrop === true && 
                  <ul className="dropdown-menu-item shadow">
                     <li>
                        <Link className="dropdown-item" to="/my-account" onClick={handleClose} > <FaRegUserCircle /> my account </Link>
                     </li>
                     <li>
                        <Link className="dropdown-item" to="" onClick={handleClose}> <PiShieldWarningFill /> reset password </Link>
                     </li>
                     <li onClick={handleLogout}>
                        <Link className="dropdown-item" to="" onClick={handleClose}> <RiLock2Fill /> logout  </Link>
                     </li>
                  </ul>
                 }
                 
              </div>
           </div>

           </div>
        </div>
      </header>
    </> 
  )
}

export default Header    












