
import { MdEmail } from "react-icons/md"; 

import { Link } from "react-router-dom";


import "./Forget.css"; 
import Logo from "../../../components/logo/Logo";

const Forget = () => {
 

  return (
    <>
      <div className="right-content">
        <div className="row">
        <div className="col-sm-4 col-md-3"> </div>
          <div className="col-sm-4 col-md-6 forget-part "> 
              <div className="logo-box-text">
                <Logo />
               <h4> reset the password </h4>
             </div>
             <div className="forget-box p-4">
                 <span> <MdEmail /></span>
                 <input type="text" className="form-control" placeholder="Enter Your Email"/>
                 <button className="btn  w-100 btn-primary mt-4"> GET LINK </button>
             </div>

             <div className="login-box ">
                  <p> remember the password? <Link to="/login"> Login </Link></p>
             </div>
          </div>
          <div className="col-sm-4 col-md-3"> </div>
        </div>
      </div>
    </>
  )
}

export default Forget
