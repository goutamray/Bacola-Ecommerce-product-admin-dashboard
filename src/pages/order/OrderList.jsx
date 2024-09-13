
// react icons 
import { FaAngleLeft, FaAngleRight, FaRegEye, FaShoppingBag,  FaTrashAlt } from "react-icons/fa";
import { HiDotsCircleHorizontal, HiDotsHorizontal } from "react-icons/hi";
import { FaCarAlt } from "react-icons/fa";
import { BiSolidDownload } from "react-icons/bi";

import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";

import "./OrderList.css"; 
import { useEffect, useState } from "react";
import { fetchOrderFromApi } from "../../utils/api";
import Pagination from "../../components/pagination/Pagination";

const OrderList = () => {

   const [orders, setOrders] = useState([]);


   useEffect(() => {
    fetchOrderFromApi("/").then((res) => {
      setOrders(res.orderList)
    })
   }, [])

  return ( 
    <>
     <div className="right-content">
         <BreadCrumb title={"Order List "} page={"Orders"}/> 

        <div className="product-list-topper">
            <div className="row">
                <div className="col-sm-3 part1 ">
                    <div className="total-product ">
                        <div className="left-top-part ">
                           <h2> { orders?.length } </h2>
                           <span> <HiDotsCircleHorizontal /> </span>
                        </div>
                        <p> Total Orders  </p>
                    </div>
                </div>
                <div className="col-sm-3 part1 ">
                    <div className="total-product category ">
                        <div className="left-top-part ">
                           <h2> 39 </h2>
                           <span className="widget"> <FaCarAlt /></span>
                        </div>
                        <p> Shipped Order </p>
                    </div>
                </div>
                <div className="col-sm-3 part1 ">
                    <div className="total-product brand">
                        <div className="left-top-part ">
                           <h2> 60</h2>
                           <span className="verify"> <FaShoppingBag /> </span>
                        </div>
                        <p> Recieved Order </p>
                    </div>
                </div>
                <div className="col-sm-3 part1 ">
                    <div className="total-product cancel">
                        <div className="left-top-part ">
                           <h2> 9 </h2>
                           <span className="cansel2"> <HiDotsCircleHorizontal /> </span>
                        </div>
                        <p> Cancelled Order </p>
                    </div>
                </div>

            </div>
        </div>

        <div className="product-table card shadow p-3">
              <div className="top-part">
                  <h4> Order Information </h4>
                  <p><HiDotsHorizontal /></p>
              </div>
              <div className="row cartFilter">
                  <div className="col-sm-3 col-single">
                      <h4 > SHOW BY </h4>
                      <select className="form-select form-control" aria-label="Default select example">
                          <option selected value="1">12 Row </option>
                          <option value="2">24 Row </option>
                          <option value="3">36 Row </option>
                    </select>
                  </div>
                  <div className="col-sm-3 col-single">
                      <h4 > STATUS BY</h4>
                      <select className="form-select form-control" aria-label="Default select example" >
                          <option selected value="Pending">Pending </option>
                          <option value="Shipped"> Shipped</option>
                          <option value="Recieved"> Recieved</option>
                          <option value="Cancelled"> Cancelled </option>              
                    </select>

                  </div>
                  <div className="col-sm-3 col-single">
                      <h4 > ISSUED BY </h4>
                        <input type="date" name="" id="" className="form-control" />
                  </div>
                  
                  <div className="col-sm-3 col-single abcd">
                      <h4 > SEARCH BY </h4>
                      <input type="text" placeholder="id / name / email" className="form-control" />
                  </div>
              </div>

           <div className="table-responsive">
              <table className="table table-bordered table-striped">
                <thead >
                    <tr className="table-primary">
                      <th> Order Id </th>
                      <th> Customer Name </th>
                      <th> Phone </th>
                      <th> Email </th>
                      <th> Total </th>
                      <th> Address </th>
                      <th> Status </th>
                      <th> action </th>
                    </tr>
                </thead>
                <tbody>
                  {
                    orders.length !== 0 && orders?.map((item, index) => {
                      return   <tr className="align-middle" key={index}> 
                      <td> {item?._id} </td>
                      <td> {item?.name}</td>
                      <td> {item?.phone} </td>
                      <td> {item?.email} </td>
                      <td> {item?.amount} </td>
                      <td> {item?.address} </td>
                      <td> <p className="won"> {item?.status} </p> </td>
                      <td>
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
                    <Pagination />
                </div>
              </div>
             </div>
        </div>
      </div>
    </>
  )
}

export default OrderList


