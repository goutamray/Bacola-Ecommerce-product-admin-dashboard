import { HiDotsHorizontal } from "react-icons/hi"
import BreadCrumb from "../../../components/BreadCrumb/BreadCrumb"
import { useState } from "react";
import { createSliderData } from "../../../utils/api";
import createToast from "../../../utils/toastify";
import Swal from "sweetalert2";
import { FaCloudUploadAlt } from "react-icons/fa";

// loading 
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from "react-router-dom";



const SliderUpload = () => {
  const [input, setInput ] = useState({
    title : "",
    subTitle : "",
    photo : null,
    price : 0,
    offerText : "",
    discount : 0,

  })

  const [loading, setLoading ] = useState(false); 
  const navigate = useNavigate(); 

 // handle input change 
  const handleInputChange = (e) => {
    setInput((prevState) => ({
      ...prevState, 
      [e.target.name] : e.target.value
     }))
  }; 

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setInput((prevState) => ({
      ...prevState,
      photo: file,
    }));
  };

// Post form data
const handleSliderSubmit = async (e) => {
  e.preventDefault();
  setLoading(true); 

  const formData = new FormData();
  formData.append('title', input.title);
  formData.append('subTitle', input.subTitle);
  formData.append('price', input.price);
  formData.append('offerText', input.offerText);
  formData.append('discount', input.discount);
  if (input.photo) {
    formData.append('photo', input.photo);
  }


  if(!input.title || !input.subTitle || !input.photo || !input.price){
    setLoading(false); 
    createToast("All fields are required"); 
    return; 
  }
   
  // send data to api 
  createSliderData("/", formData).then((res) => {
    setLoading(false); 
    createToast("Slider Created Successfull", "success"); 
  })
 
  // reset form
  setInput({
    title : "",
    subTitle : "",
    photo : null,
    price : 0,
    offerText : "",
    discount : 0,
  })
    e.target.reset(); 
   navigate("/slider-list");
 };




 
  return (
    <>
      <div className="right-content">
        <BreadCrumb title={"Slider Add"} page={"Slider"}/> 

        <div className="row my-4 product-upload-part ">
          <div className="col-sm-7 upload-part1 ">
             <div className="card p-3 right-part2 ">
                <div className="revenue-part">
                   <div className="rev-text">
                      <h4> Add New Slider </h4>
                   </div>
                   <p><HiDotsHorizontal /></p>
                 </div>

                 {/* product part  */}
                 <div className="product-upload-details">
                  <form onSubmit={handleSliderSubmit}>
                      <div className="title">
                          <p className="same-title" > Title</p>
                          <input 
                             type="text" 
                             className="form-control mt-1 custom-class-add" 
                             name="title"
                             value={input.title}
                             onChange={handleInputChange} />
                        </div>
                      <div className="title">
                          <p className="same-title" > Sub Title</p>
                          <input 
                             type="text" 
                             className="form-control mt-1 custom-class-add" 
                             name="subTitle"
                             value={input.subTitle}
                             onChange={handleInputChange} />
                        </div>
                      <div className="title">
                          <p className="same-title" > Offer Text </p>
                          <input 
                             type="text" 
                             className="form-control mt-1 custom-class-add" 
                             name="offerText"
                             value={input.offerText}
                             onChange={handleInputChange} />
                        </div>
                      <div className="title">
                          <p className="same-title" > Discount </p>
                          <input 
                             type="text" 
                             className="form-control mt-1 custom-class-add" 
                             name="discount"
                             value={input.discount}
                             onChange={handleInputChange} />
                        </div>
                        <div className="description">
                          <p className="same-title"> Price </p>
                          <input 
                             type="text" 
                             className="form-control mt-1 custom-class-add" 
                             name="price"
                             value={input.price}
                             onChange={handleInputChange} />
                        </div>
                        <div className="description">
                          <p className="same-title"> Slider Photo </p>
                          <input 
                             type="file" 
                             className="form-control mt-1 custom-class-add" 
                             name="photo"     
                             onChange={handleFileChange} />
                        </div>

                        <button type="submit" className="btn btn-lg btn-primary mt-5 w-100"> 
                          <span> <FaCloudUploadAlt /> </span>
                          
                          {
                            loading === true ?   
                            <CircularProgress color="inherit" className="ml-3 loader "/> : 
                             "Publish and View "
                          }
              
                        </button>
                   </form>
                   <div >
                       
                   </div>
                 </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default SliderUpload














