
import BreadCrumb from "../../../components/BreadCrumb/BreadCrumb"

// react icons 
import { FaAngleLeft, FaAngleRight, FaRegEye, FaShoppingBag,  FaTrashAlt } from "react-icons/fa";
import { HiDotsCircleHorizontal, HiDotsHorizontal } from "react-icons/hi";
import { FaCarAlt } from "react-icons/fa";
import { BiSolidDownload } from "react-icons/bi";


import { useEffect, useState } from "react";
import { fetchUserDataFromApi } from "../../../utils/api";
import "./UserList.css";

const UserList = () => {
  const [userData, setUserData ] = useState([]);


  useEffect(() => {
    fetchUserDataFromApi("/").then((res) => {
      setUserData(res.userList); 
    })
  }, [])


  return (
    <>   
      <div className="right-content">
          <BreadCrumb title={"User List"} page={"Users"}/> 

          <div className="product-list-topper">
            <div className="row">
               
                <div className="col-sm-4 part1 ">
                    <div className="total-product category ">
                        <div className="left-top-part ">
                           <h2> 398 </h2>
                           <span className="widget"> <FaCarAlt /></span>
                        </div>
                        <p> Pending Users </p>
                    </div>
                </div>
                <div className="col-sm-4 part1 ">
                    <div className="total-product brand">
                        <div className="left-top-part ">
                           <h2> 605 </h2>
                           <span className="verify"> <FaShoppingBag /> </span>
                        </div>
                        <p> Approved Users </p>
                    </div>
                </div>
                <div className="col-sm-4 part1 ">
                    <div className="total-product cancel">
                        <div className="left-top-part ">
                           <h2> 249 </h2>
                           <span className="cansel2"> <HiDotsCircleHorizontal /> </span>
                        </div>
                        <p> Blocked Users </p>
                    </div>
                </div>

            </div>
        </div>

        <div className="product-table card p-3">
              <div className="top-part">
                  <h4> Registered Users </h4>
                  <p><HiDotsHorizontal /></p>
                </div>
          <div className="row cartFilter">
               <div className="col-sm-4 col-single">
                  <h4 > SHOW BY </h4>
                  <select className="form-select form-control" aria-label="Default select example">
                      <option selected value="1">12 Row </option>
                      <option value="2">24 Row </option>
                      <option value="3">36 Row </option>
                </select>
               </div>
               <div className="col-sm-4 col-single">
                  <h4 > ROLE_BY </h4>
                  <select className="form-select form-control" aria-label="Default select example" >
                      <option selected value="Admin"> Admin </option>
                      <option value="Member"> Member </option>
                      <option value="Client"> Client </option>
                      <option value="Manager"> Manager </option>              
                      <option value="Vendor"> Vendor </option>              
                </select>

               </div>
               <div className="col-sm-4 col-single">
                  <h4 > STATUS BY </h4>
                  <select className="form-select form-control" aria-label="Default select example" >
                      <option selected value="Approved"> Approved </option>
                      <option value="Pending"> Pending </option>
                      <option value="Blocked"> Blocked </option>      
                </select>
               </div>
           </div>

           <div className="table-responsive">
              <table className="table table-bordered table-striped">
                <thead >
                    <tr className="table-primary">
                      <th> S.L </th>
                      <th> CLIENT </th>
                      <th className="mobile-hide"> Role </th>
                      <th className="mobile-hide"> EMAIL </th>
                      <th> Phone </th>
                      <th> STATUS </th>
                      <th className="mobile-hide"> ISSUE DATE</th>
                      <th className="mobile-hide"> action </th>
                    </tr>
                </thead>
                <tbody>

                  {
                    userData?.length !== 0 && userData?.map((item, index) => {
                      return  <tr className="align-middle" key={index}> 
                      <td> <input type="checkbox" name="" /> {index + 1} </td>
                      <td> 
                        <div className="table-product">
                          <img src={item?.photo} alt="" />
                          <div className="product-box">
                            <div className="tab-content">
                               <p> {item?.name} </p>
                           
                            </div>
                          </div>
                        </div>
                      </td>
                      <td> User </td>
                      <td className="mobile-hide"> { item?.email }  </td>
                      <td> { item?.phone }</td>
                      <td className="mobile-hide"> <p className="won"> Pending </p> </td>
                      <td className="mobile-hide"> 15/06/2022 14:02</td>
                      <td className="mobile-hide">
                        <button className="eyeBtn" > <FaRegEye /> </button>
                        <button className="editBtn"> <BiSolidDownload /> </button>
                        <button className="delBtn">  <FaTrashAlt /> </button>
                      </td>
                    </tr>
                    })
                  }

                </tbody>
              </table>
              <div className="table-footer">
                <div className="footer-left">
                    <p> showing <b> 12 </b>  of <b> 60 </b> results </p>
                </div>
                <div className="footer-right">
                <nav aria-label="...">
                  <ul className="pagination">
                    <li className="page-item disabled">
                      <span className="page-link"> <FaAngleLeft /> </span>
                    </li>
                    <li className="page-item active"><a className="page-link" href="#">1</a></li>
                    <li className="page-item " aria-current="page">
                      <span className="page-link"> 2 </span>
                    </li>
                    <li className="page-item " aria-current="page">
                      <span className="page-link"> 3 </span>
                    </li>
                    <li className="page-item " aria-current="page">
                      <span className="page-link"> 4 </span>
                    </li>
                    <li className="page-item"><a className="page-link" href="#">...</a></li>
                    <li className="page-item"><a className="page-link" href="#"> 20 </a></li>
                    <li className="page-item">
                      <a className="page-link" href="#"> <FaAngleRight /> </a>
                    </li>
                  </ul>
                </nav>
                </div>
              </div>
             </div>
        </div>

          


          
      </div>
    </>
  )
}

export default UserList


