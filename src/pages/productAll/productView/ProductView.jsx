
// react icons 
import { FaStoreAlt , FaStarHalfAlt, FaStar} from "react-icons/fa";
import { MdPix , MdSummarize, MdVerified, MdOutlineReply} from "react-icons/md";
import { IoMdSettings , IoIosColorPalette} from "react-icons/io";
import { IoPricetagSharp } from "react-icons/io5";
import { FaCartArrowDown } from "react-icons/fa6";
import { BsThreeDotsVertical } from "react-icons/bs";


import BreadCrumb from "../../../components/BreadCrumb/BreadCrumb";
import { useParams } from "react-router-dom";

// product images
import goutam from "../../..//assets/img/goutam.png";
import sujan from "../../../assets/img/sujan.jpeg";
import shirt1 from "../../../assets/product/01.webp";
import shirt2 from "../../../assets/product/02.webp";
import shirt3 from "../../../assets/product/03.webp";
import shirt4 from "../../../assets/product/04.webp";
import shirt5 from "../../../assets/product/05.webp";



import "./ProductView.css";
import { useEffect, useState } from "react";
import { fetchProductFromApi } from "../../../utils/api";
import Zoom from "../../../components/zoomBox/Zoom.jsx";

const ProductView = () => {
  const [product, setProduct] = useState({});

  const { id } = useParams(); 


  // get all products 
  useEffect(() => {
    fetchProductFromApi(`/${id}`).then((res) => {
      setProduct(res.product);
    });
  }, [id]); 

  

  return (
    <>
      <div className="right-content">
        <BreadCrumb title={"Product View"} page={"Products"}/> 
        
       <div className="product-view card p-4 my-4 dark-mode ">
           <div className="row product-view-part ">
            <div className="col-md-5 left-view-part ">
                <h6> Product Gallery </h6>
                <Zoom images = {product?.photo} discount={product.discount}/>
                
            </div>
            <div className="col-md-7 right-view-part">
                <h6> Product Details </h6>
                <div className="product-description">
                    <h3> {product?.name} </h3>
                    <div className="product-view-meta">
                       <span className="brand"> <FaStoreAlt /> </span>
                       <h5> brand </h5>
                       <span> : </span>
                       <p> {product?.brand} </p>
                    </div>

                    <div className="product-view-meta">
                       <span className="brand"> <MdPix /> </span>
                       <h5> Category </h5>
                       <span> : </span>
                       <p> {product?.category} </p>
                    </div>

                   {
                    product?.productRams?.length !== 0 &&
                    <div className="product-view-meta">
                       <span className="brand"> <MdSummarize /> </span>
                       <h5> Rams </h5>
                       <span> : </span>
                       <ul>
                        {
                           product?.productRams?.map((item, index) =>{
                            return   <li className="tag" key={index}> {item} </li>
                           })
                        }
               
                       </ul>
                    </div>
                   }

                   {
                    product?.productSize?.length !== 0 &&
                    <div className="product-view-meta">
                       <span className="brand"> <MdSummarize /> </span>
                       <h5> Size </h5>
                       <span> : </span>
                       <ul>
                        {
                           product?.productSize?.map((item, index) =>{
                            return   <li className="tag" key={index}> {item} </li>
                           })
                        }
               
                       </ul>
                    </div>
                   }

                   {
                    product?.productWeight?.length !== 0 &&
                    <div className="product-view-meta">
                       <span className="brand"> <MdSummarize /> </span>
                       <h5> Weight </h5>
                       <span> : </span>
                       <ul>
                        {
                           product?.productWeight?.map((item, index) =>{
                            return   <li className="tag" key={index}> {item} </li>
                           })
                        }
               
                       </ul>
                    </div>
                   }

           


                    <div className="product-view-meta">
                       <span className="brand"> <IoPricetagSharp /> </span>
                       <h5> Price </h5>
                       <span> : </span>
                       <p> 
                        <span className="reg-price"> <b> {product?.price}  </b></span> <span className="sale-price">{product?.oldPrice} </span>
                       </p>
                    </div>

                    <div className="product-view-meta">
                       <span className="brand"> <FaCartArrowDown /> </span>
                       <h5> Stock </h5>
                       <span> : </span>
                       <p> ( <b> {product?.countInStock} </b>) Piece </p>
                    </div>
                    <div className="product-view-meta">
                       <span className="brand"> <FaStarHalfAlt /> </span>
                       <h5> Review </h5>
                       <span> : </span>
                       <p> (<b> {product?.rating} </b>) Review </p>
                    </div>

                    <div className="product-view-meta">
                       <span className="brand"> <MdVerified /> </span>
                       <h5> Published </h5>
                       <span> : </span>
                       <p> {product?.createdAt}</p>
                    </div>
                </div>
            </div>
           </div>

           <div className="row">
            <div className="col">
               <div className="product-short-desc">
                  <h6> Product Description </h6>
                  <p>{product?.description}</p>
                </div>
              </div>
            </div>
         </div>
      </div>
    </>
  )
}

export default ProductView
















