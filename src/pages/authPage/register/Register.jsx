
import { Link, useNavigate } from "react-router-dom";
import {  useContext, useEffect, useState } from "react";

// react icons 
import { 
      FaEnvelope ,
      FaFacebookF , 
      FaGoogle, 
      FaRegUserCircle,
      FaRegEyeSlash,
      FaPhoneVolume
    } from "react-icons/fa";
import { BiSolidLock } from "react-icons/bi";
import { MdOutlineVerifiedUser } from "react-icons/md";
import { MdHome } from "react-icons/md";
import { IoEyeOutline } from "react-icons/io5";


// loading 
import CircularProgress from '@mui/material/CircularProgress';

import "./Register.css";
import Logo from "../../../components/logo/Logo";
import { createNewUser } from "../../../utils/api";
import createToast from "../../../utils/toastify";
import { MyContext } from "../../../App";


const Register = () => {
  const [openPass, setOpenPass ] = useState(false); 
  const [openPass2, setOpenPass2 ] = useState(false);
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState({
    name : "",
    email : "",
    phone : "",
    password : "",
    confirmPass : "",
    isAdmin : true,
   });

   const navigate = useNavigate();
   const context = useContext(MyContext);

   // hamdle input change 
   const handleInputChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name] : e.target.value
    }))
   };

 // handle form submit 
  const handleFormSubmit = (e) => {
    e.preventDefault(); 
    setLoading(true);

    
    // validation all input 
    if(!input.name || !input.email || !input.password || !input.phone || !input.confirmPass ){
      setLoading(false); 
      createToast("All fields are required"); 
      return; 
    }
    
    // password match check 
    if ( input.password !== input.confirmPass) {
      setLoading(false); 
      return createToast("PassWord Not Match"); 
    }

 try {
  // Create user
  createNewUser("/signup", input)
    .then((res) => {
      console.log(res);
      
      setLoading(false); 
      createToast("User Register Successful", "success");
      
      // Redirect to login page after successful registration
      setTimeout(() => {
        navigate("/login");
      }, 2000);
      
      // Clear input fields
      setInput({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPass: "",
        isAdmin: true,
      });
    })
    .catch((error) => {
      setLoading(false);

      // Assuming the backend returns different error codes or messages for email and phone number conflicts
      if (error.response) {
        const status = error.response.status;
        const errorMessage = error.response.data.message;

        if (status === 400) {
          if (errorMessage.includes("Email")) {
            // Email already exists
            createToast("Email already exists. Please use a different email.", "error");
          } else if (errorMessage.includes("Phone")) {
            // Phone number already exists
            createToast("Phone number already exists. Please use a different phone number.", "error");
          }
        } else {
          // Other errors
          createToast("Registration failed. Please try again.", "error");
        }
      } else {
        createToast("An unexpected error occurred. Please try again.", "error");
      }

      console.error("Error during registration:", error);
    });
  } catch (error) {
    setLoading(false);
    console.error("Unexpected error:", error);
    createToast("An unexpected error occurred. Please try again.", "error");
  }

  }

    useEffect(() => {
      window.scrollTo(0,0)
    }, []); 

    useEffect(() => {
      context.setIsHeaderFooterShow(false); 
    }, []);  


  return (
    <>
      <section className="loginSection register">
        <div className="container">
          <div className="row register-part ">
              <div className="col-sm-7 left-part1 ">
                   <div className="banner-content">
                      <h2> Best ux/ui fashion <br/> <span style={{color : "#0858f7"}}> ecommerce dashboard  </span> <br/>  & admin panel </h2>
                      <p> Elit Iusto dolore libero recusandae dolor dolores explicabo ullam cum facilis aperiam alias odio quam excepturi molestiae omnis inventore. Repudiandae officia placeat amet consectetur dicta dolorem quo </p>
                      <button className="my-btn home-page" > 
                        <MdHome /> 
                        <Link to="/">  Go To Home </Link> 
                    </button>
                   </div>
              </div>

              <div className="col-sm-5 register-right-part ">
                 <div className="loginBox">
                   <Logo />
                   <h4> Register a new account </h4>
                </div>

                <div className="form-wrapper res-form card register ">
                   <form onSubmit={handleFormSubmit}>
                      <div className="mb-3 ">
                          <span className="icon"> <FaRegUserCircle /> </span>         
                          <input 
                             type="text" 
                             className="form-control" 
                             placeholder="Enter your name" 
                             autoFocus 
                             name="name"
                             value={input.name}
                             onChange={handleInputChange}
                             />                                 
                        </div>
                      <div className="mb-3 ">
                          <span className="icon"> <FaEnvelope /> </span>         
                          <input 
                             type="email" 
                             className="form-control" 
                             placeholder="Enter your email"
                             name="email"
                             value={input.email}
                             onChange={handleInputChange}  
                            />                                 
                        </div>
                      <div className="mb-3 ">
                          <span className="icon"> <FaPhoneVolume /> </span>         
                          <input 
                             type="text" 
                             className="form-control" 
                             placeholder="Enter your phone number"
                             name="phone"
                             value={input.phone}
                             onChange={handleInputChange}  
                            />                                 
                        </div>

                        <div className="mb-3 pass-field">    
                          <span className="icon">  <BiSolidLock /> </span>                
                          <input 
                             type={openPass === false ? "password" : "text"}    
                             className="form-control"
                              placeholder="Enter your password"
                              name="password"
                              value={input.password}
                              onChange={handleInputChange}
                            /> 
                          <span> 
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              setOpenPass(!openPass);
                            }}
                          >
                            {openPass ? <IoEyeOutline /> : <FaRegEyeSlash />}
                          </button>
                            </span>               
                        </div>
                        <div className="mb-3 pass-field ">    
                          <span className="icon">  <MdOutlineVerifiedUser /> </span>                
                          <input 
                             type={openPass2 === false ? "password" : "text"}  
                             className="form-control" 
                             placeholder="Confirm your password"
                             name="confirmPass"
                             value={input.confirmPass}
                             onChange={handleInputChange}
                             />    
                          <span> 
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              setOpenPass2(!openPass2);
                            }}
                          >
                            {openPass2 ? <IoEyeOutline /> : <FaRegEyeSlash />}
                          </button>
                            </span>          
                        </div>
                        <div className="mb-3">
                          <input type="checkbox" /> <span className="checkBox"> I agree to the all Terms & Condiotions </span>
                        </div>
                   
                       <button type="submit" className="my-btn w-100 "> 
                       
                          {
                            loading === true ?   
                            <CircularProgress color="inherit" className="ml-3 loader "/> : 
                             "Sign Up"
                          }
                     
                    </button>
                   </form>
                   <div className="forget my-2">
                    <Link to="/forget"> FORGOT PASSWORD </Link>
                   </div>
                   <div className="or-div">
                       <p> or </p>
                   </div>
                   <div className="twiter">
                     <button type="submit" className="my-btn twiter w-100 "> <FaGoogle /> <Link to=""> Continue with Google </Link> </button>
                   </div>
                   <div className="Facebook mt-3">
                     <button type="submit" className="my-btn facebook w-100 "> <FaFacebookF /> <Link to=""> Continue with Facebook </Link> </button>
                   </div>

                </div>

                <div className="wrapperCard ">
                  <p> Already have an account? <Link to="/login"> Login</Link></p>
                </div>
              </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Register





















