
import {  useContext, useEffect, useState } from "react";
import { Chart } from "react-google-charts";

// react icons 
import { FaRegUserCircle ,FaShoppingBag, FaStar, FaTrashAlt, FaCalendarAlt, FaCheck } from "react-icons/fa";
import { FaCartArrowDown, FaArrowTrendUp, FaRegEye,  FaAngleLeft, FaAngleRight, FaPlus } from "react-icons/fa6";
import { TbStars } from "react-icons/tb";
import { HiDotsHorizontal } from "react-icons/hi";
import { FiEdit } from "react-icons/fi";
import { TbBriefcase2 } from "react-icons/tb";
import { IoBookmarksSharp } from "react-icons/io5";
import { MdOutlineLayers } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { PiWarningLight } from "react-icons/pi";

// components 
import DashBoardBox from "../../../components/dashboardBox/DashBoardBox";
import BreadCrumb from "../../../components/BreadCrumb/BreadCrumb";
import { fetchBrandDataFromApi, fetchDataFromApi, fetchOrderFromApi, fetchProductFromApi, fetchUserDataFromApi, getReviewData } from "../../../utils/api";


export const data = [
  ["Task", "Hours per Day"],
  ["Work", 11],
  ["Eat", 2],
  ["Commute", 2],
  ["Watch TV", 2],
  ["Sleep", 7],
];

export const options = {
  backgroundColor: 'transparent',
  'chartArea' : {'height': "100%", 'width' :'90%'}
};


export const data2 = [
  ["Task", "Hours per Day"],
  ["Work", 11],
  ["Eat", 2],
  ["Commute", 2],
  ["Watch TV", 2],
  ["Sleep", 7], // CSS-style declaration
];

export const options2 = {
  pieHole: 0.4,
  is3D: false,
  'chartArea' : {'height': "100%", 'width' :'90%'}
};
export const data3 = [
  ["Year", "Sales", "Expenses", "Profit"],
  ["2014", 1000, 400, 200],
  ["2015", 1170, 460, 250],
  ["2016", 660, 1120, 300],
  ["2017", 1030, 540, 350],
];


import "./Ecommerce.css";
import { MyContext } from "../../../App";
import Pagination from "../../../components/pagination/Pagination";



const Ecommerce = () => {
  const [productList, setProductList] = useState([]);
  const [brandData, setBrandData] = useState([]);  
  const [catData, setCatData ] = useState([]);
  const [userData, setUserData ] = useState([]);
  const [orders, setOrders] = useState([]);
  const [reviews, setReviews] = useState([]);

  const context = useContext(MyContext);

    // get all api calls 
    useEffect(() => {
      fetchProductFromApi("/",).then((res) => {
          setProductList(res.productList);
      });

      // get all brand 
      fetchBrandDataFromApi("/").then(res => {
        setBrandData(res.brandList);
      });
  
    // get all category
    fetchDataFromApi("/").then(res => {
        setCatData(res.categoryList)
    });

    // get all user
    fetchUserDataFromApi("/").then((res) => {
      setUserData(res.userList); 
    });

    // get all order list 
    fetchOrderFromApi("/").then((res) => {
      setOrders(res.orderList)
    });

    // get all review list
    getReviewData("/").then((res) => {
      setReviews(res.reviews)
    })

    }, [productList, brandData, catData, userData, orders,  ]);
  
  
   // show header footer 
   useEffect(() => {
    context.setIsHeaderFooterShow(true); 
   }, [context]); 

  
  return (
    <>
      <div className="right-content">
        <BreadCrumb title={"Ecommerce"} page={"DashBoard"}/>

        <div className="row dashboard-div">
          <div className="col-sm-8 box-div ">
              <DashBoardBox text={"Users"} color={["#1ba054", "#4dd988"]} total={userData?.length} icon={< FaRegUserCircle/> } grow={true} discountColor={"#187d44"} discount={"+35%"}  />
              <DashBoardBox text={"Orders"} color={["#bf10e1", "#ed67ff"]} total={orders?.length}  icon={< FaCartArrowDown /> } discountColor={"#a808c3"} discount={"+20%"}/>
              <DashBoardBox text={"Products"} color={["#2d79e6", "#63b2f6"]} total={productList?.length}  icon={< FaShoppingBag/> } discountColor={"#2262d3"} discount={"+55%"} />
              <DashBoardBox text={"Reviews"} color={["#e1950e", "#f4cf2b"]} total={reviews?.length} icon={< TbStars/> } grow={true} discountColor={"#ae640f"} discount={"+45%"} />
          </div>
          <div className="col-sm-4 box-div2">
             <div className="anotherBox">
                 <div className="right-box">
                  <h4> Total Sales </h4>
                  <div className="dot-abcd">
                     <HiDotsHorizontal />
                  </div>
                 </div>
                 <div className="box-2">
                    <div className="left-content">
                      <h3> $3,787,681.00 </h3> 
                      <h5> 40.63% </h5>
                      <p> < FaArrowTrendUp/> </p>
                    </div>
                    <p> $3,578.90 in last month </p>
                     <div className="cart-pai mt-5"> 
                        <Chart
                           chartType="PieChart"
                           data={data}
                           options={options}
                           width={"100%"}
                           height={"200px"}
                        />
                     </div>
                 </div>
             </div>
          </div>
        </div> 

        <div className="card table-box p-3 border-0">
           <div className="top-part">
              <h4> Best Selling Products </h4>
              <p><HiDotsHorizontal /></p>
           </div>
           <div className="row cartFilter">
               <div className="col-sm-4 col-single">
                  <h4 > SHOW BY </h4>
                  <select className="form-select" aria-label="Default select example">
                      <option selected value="1">12 Row </option>
                      <option value="2">24 Row </option>
                      <option value="3">36 Row </option>
                </select>
               </div>
               <div className="col-sm-4 col-single">
                  <h4 > CATEGORY BY </h4>
                  <select 
                        className="form-select form-control"
                       >
                     <option value="" > Select Category </option>
                          {
                            catData?.length !== 0 && 
                            catData?.map((item, index) => {
                                return <option 
                                       value={item._id}
                                       key={index}> 
                                         { item.name }
                                       </option>
                              })
                            }
                      </select>
               </div>
               <div className="col-sm-4 col-single">
                  <h4 > BRAND BY </h4>
                  <select 
                        className="form-select form-control" 
                      >
                       <option value="" > Select Brand </option>
                          {
                            brandData?.length !== 0 && 
                            brandData?.map((item, index) => {
                              return <option 
                                       value={item._id}
                                       key={index}> 
                                         { item.name }
                                       </option>
                                })
                          }
                  </select>
               </div>
           </div>

           <div className="table-responsive">
              <table className="table table-bordered table-striped">
                <thead >
                    <tr className="table-primary">
                      <th> uid </th>
                      <th> product </th>
                      <th> category </th>
                      <th className="mobile-hide "> brand </th>
                      <th className="mobile-hide show-tablet"> price </th>
                      <th className="mobile-hide"> stock </th>
                      <th className="mobile-hide"> rating </th>
                      <th className="mobile-hide "> action </th>
                    </tr>
                </thead>
                <tbody>

                  {
                    productList?.length !== 0 && productList?.map((item, index) =>{
                      return <tr className="align-middle" key={index}> 
                      <td> <input type="checkbox" name="" /> #{index + 1} </td>
                      <td> 
                        <div className="table-product">
                          <img  src={item.photo?.[0] ? item?.photo[0] : 'default-image-url.jpg'}  alt="product" />
                          <div className="product-box">
                            <div className="tab-content">
                               <p>   
                                {
                                  item?.name?.length > 25 ?
                                  item?.name.substring(0, 20)+ ". . ." : 
                                  item?.name
                                 }  
                              </p>
                               <h6>  
                               {
                                   item?.description?.length > 30 ?
                                   item.description.substring(0, 25)+ ". . ." : 
                                   item.description
                                 }  </h6>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td> {item?.category?.name} </td>
                      <td className="mobile-hide "> {item?.brand} </td>
                      <td className="mobile-hide show-tablet"> 
                         <p className="reg-price "> $ {item?.price}</p>
                         <p className="sale-price"> {item?.oldPrice} </p>
                      </td>
                      <td className="mobile-hide"> {item?.countInStock} </td>
                      <td className="mobile-hide"> 
                         <div className="three-item">
                            <div className="star"> <FaStar /> </div>
                             <span> {item?.rating} </span>
                             <p> (16) </p>
                          </div>
                      </td>
                      <td className="mobile-hide ">
                        <button className="eyeBtn" > <FaRegEye /> </button>
                        <button className="editBtn"> <FiEdit /> </button>
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

        <div className="row my-3 revenue-box-part ">
          <div className="col-sm-8 revenue-box-part-left ">
             <div className="card p-3 abcd">
                 <div className="revenue-part">
                   <div className="rev-text">
                      <h4> Revenue Report </h4>
                   </div>
                   <div className="year-select">
                    <p> <FaCalendarAlt />  </p>
                
                     <select className="form-select" aria-label="Default select example">
                     
                         <option selected value="1"> Select Option</option>
                         <option value="2">Year 2021</option>
                         <option value="3">Year 2020</option>
                         <option value="3">Year 2020</option>
                         <option value="3">Year 2020</option>
                         <option value="3">Year 2020</option>
                         <option value="3">Year 2020</option>
                     </select>
                   </div>
                 </div>
                 <div className="earning-part">
                   <div className="earn-part1">
                       <div className="bag">
                          <span> <TbBriefcase2 /> </span>
                       </div>
                       <div className="text-info">
                         <p> invested</p>
                         <h4> 3,387.67K </h4>
                       </div>
                   </div>
                   <div className="earn-part1">
                       <div className="bag">
                          <span className="book"> <IoBookmarksSharp /> </span>
                       </div>
                       <div className="text-info">
                         <p> Earnings </p>
                         <h4> 2,856.35K </h4>
                       </div>
                   </div>
                   <div className="earn-part1">
                       <div className="bag">
                          <span className="layer"> <MdOutlineLayers /> </span>
                       </div>
                       <div className="text-info">
                         <p> Expenses</p>
                         <h4> 1,994.12K </h4>
                       </div>
                   </div>        
                 </div>

                 <div className="line-chart pt-5">
                 <Chart
                   chartType="Bar"
                   width="100%"
                   height="300px"
                   data={data3}
                 
                  />
                 </div>
             </div>
          </div>
          
          <div className="col-sm-4 revenue-box-part-right">
            <div className="card p-3 right-part2 ">
                <div className="revenue-part">
                   <div className="rev-text">
                      <h4> Orders Overview </h4>
                   </div>
                   <p><HiDotsHorizontal /></p>
                 </div>
                 <div className="grap-chart pt-4">   
                 <Chart
                    chartType="PieChart"
                    width="100%"
                    height="200px"
                    data={data2}
                    options={options2}
                  />

                  <div className="total-box">
                       <div className="box-1">
                         <div className="left-dot">
                           <p> <HiDotsHorizontal /></p>
                           <h6> Pending </h6>
                         </div>
                         <p> 568 </p>
                       </div>
                       <div className="box-1">
                         <div className="left-dot">
                           <p className="shipped"> <FaPlus /></p>
                           <h6> Shipped </h6>
                         </div>
                         <p> 457 </p>
                       </div>
                       <div className="box-1">
                         <div className="left-dot">
                           <p className="recieved" > <FaCheck /></p>
                           <h6> Recieved </h6>
                         </div>
                         <p> 325 </p>
                       </div>
                       <div className="box-1">
                         <div className="left-dot">
                           <p className="cancelled"> <RxCross2 /></p>
                           <h6>Cancelled </h6>
                         </div>
                         <p> 158 </p>
                       </div>
                       <div className="box-1">
                         <div className="left-dot">
                           <p className="refunded"> <PiWarningLight /></p>
                           <h6> Refunded</h6>
                         </div>
                         <p> 237 </p>
                       </div>
                  </div>
                 </div>
            </div>
          </div>
        </div>
      </div>   
    </>
  )
}

export default Ecommerce
















