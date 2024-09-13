
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import Logo from "../../../components/logo/Logo";

import { FaEnvelope , FaFacebookF, FaGoogle } from "react-icons/fa";
import { BiSolidLock } from "react-icons/bi";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa"; 

import createToast from "../../../utils/toastify";
import { createNewUser } from "../../../utils/api";

// loading 
import CircularProgress from '@mui/material/CircularProgress';

import { MyContext } from "../../../App";

import "./Login.css"; 

const Login = () => {
   const [openPass, setOpenPass ] = useState(false); 
   const [input, setInput] = useState({
    email: "",
    password: "",
    isAdmin: true,
  });
  const [loading, setLoading] = useState(false);

  
  // Handle input change 
  const handleInputChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };
  
  const navigate = useNavigate();
  const context = useContext(MyContext)
  
  // Handle form submit 
  const handleLoginFormSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
  
    // Validate all inputs 
    if (!input.email || !input.password) {
      setLoading(false);
      createToast("All fields are required", "error");
      return;
    }
  
    // Call login API
    createNewUser("/login", input)
      .then((res) => {
        localStorage.setItem("token", res.token);
  
        const user = {
          name: res?.user?.name,
          email: res?.user?.email,
          userId: res?.user?._id,
        };
        localStorage.setItem("user", JSON.stringify(user));
  
        createToast("User Login Successful", "success");
        navigate("/");
      })
      .catch((err) => {
        const errorMessage = err.response?.data?.message || "Login failed. Please try again.";
        
        if (errorMessage.includes("Email")) {
          createToast("Invalid Email. Please check your email.", "error");
        } else if (errorMessage.includes("password")) {
          createToast("Incorrect password. Please try again.", "error");
        } else {
          createToast(errorMessage, "error");
        }
      })
      .finally(() => {
        setLoading(false);
        setInput({
          email: "",
          password: "",
          isAdmin: true,
        });
      });
  };


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []); 

  useEffect(() => {
    context.setIsHeaderFooterShow(false); 
  }, [context]);  
    
  return (
    <>
      <section className="loginSection">
        <div className="container">
          <div className="row">
              <div className="col-sm-4 col-md-3"></div>

              <div className="col-sm-4 col-md-5">
                 <div className="loginBox">
                   <Logo />
                   <h4> Login to WebSquadBD </h4>
                </div>

                <div className="form-wrapper res-form card login-cart ">
                   <form onSubmit={handleLoginFormSubmit}>
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

                    <div className="mb-3 pass-field">    
                      <span className="icon"> 
                         <BiSolidLock /> 
                      </span>                
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
                      <button type="submit" className="my-btn w-100 "> 
                          {
                            loading === true ?   
                            <CircularProgress color="inherit" className="ml-3 loader "/> : 
                             "Sign In"
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
                      <button type="submit" className="my-btn twiter w-100 "> 
                         <FaGoogle /> 
                         <Link to=""> Continue with Google </Link> 
                      </button>
                   </div>
                   <div className="Facebook mt-3">
                      <button type="submit" className="my-btn facebook w-100 "> 
                         <FaFacebookF /> 
                         <Link to=""> Continue with Facebook </Link> 
                      </button>
                   </div>

                </div>
  
                <div className="wrapperCard card">
                  <p> Dont have an account? <Link to="/register"> Register</Link></p>
                </div>
              </div>

             <div className="col-sm-4 col-md-3"></div>
          </div>
        </div>
    
      </section>
    </>
  )
}

export default Login













