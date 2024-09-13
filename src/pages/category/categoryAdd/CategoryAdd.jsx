
import Swal from "sweetalert2";
import createToast from "../../../utils/toastify";

// react icons 
import { FaCloudUploadAlt } from "react-icons/fa";
import { HiDotsHorizontal } from "react-icons/hi";

import BreadCrumb from "../../../components/BreadCrumb/BreadCrumb";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchSubCategoryDataFromApi, postData } from "../../../utils/api";

// loading 
import CircularProgress from '@mui/material/CircularProgress';


import "./CategoryAdd.css";

const CategoryAdd = () => {
  const [input, setInput ] = useState({
    name : "",
    subCat : "",
    photo : null,
    color : "",
  })

  const [loading, setLoading ] = useState(false); 
  const [subCatData, setSubCatData] = useState([]); 
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
const addCategory = async (e) => {
  e.preventDefault();
  setLoading(true); 

  const formData = new FormData();
  formData.append('name', input.name);
  formData.append('subCat', input.subCat);
  formData.append('color', input.color);
  if (input.photo) {
    formData.append('photo', input.photo);
  }


  if(!input.name || !input.photo || !input.color){
    setLoading(false); 
    createToast("All fields are required"); 
    return; 
  }else{
    Swal.fire("Data Stable", "success");
  }

  
  // send data to api 
  postData("/", formData).then((res) => {
    setLoading(false); 
    createToast("Category Created Successfull", "success"); 
  })
 
  // reset form
  setInput({
    name : "",
    subCat : "",
    photo : null,
    color : "",
  })
    e.target.reset(); 
    navigate("/category");
 };

// get all sub category 
useEffect(() => {
  fetchSubCategoryDataFromApi("/").then((res) => {
    setSubCatData(res.subCategoryList)
  });
}, [subCatData]); 

  return (
    <>
      <div className="right-content">
        <BreadCrumb title={"Category Add"} page={"Category"}/> 

        <div className="row my-4 product-upload-part ">
          <div className="col-sm-7 upload-part1 ">
             <div className="card p-3 right-part2 ">
                <div className="revenue-part">
                   <div className="rev-text">
                      <h4> Add New Category </h4>
                   </div>
                   <p><HiDotsHorizontal /></p>
                 </div>

                 {/* product part  */}
                 <div className="product-upload-details">
                  <form onSubmit={addCategory}>
                      <div className="title">
                          <p className="same-title" > Category Name </p>
                          <input 
                             type="text" 
                             className="form-control mt-1 custom-class-add" 
                             name="name"
                             value={input.name}
                             onChange={handleInputChange} />
                        </div>
                      <div className="title">
                          <p className="same-title" > Sub Category Name </p>
                              <select 
                                  name="subCat"
                                  value={input.subCat}
                                  className="form-select form-control"
                                  onChange={handleInputChange}
                                >
                                  <option value="">Select Sub Category</option>
                                  {
                                    subCatData.length !== 0 && subCatData.map((item, index) => {
                                      return <option value={item._id} key={index}>{item.name}</option>
                                    })
                                  }
                                </select>
                        </div>
                        <div className="description">
                          <p className="same-title"> Category Photo </p>
                          <input 
                             type="file" 
                             className="form-control mt-1 custom-class-add" 
                             name="photo"     
                             onChange={handleFileChange} />
                        </div>
                        <div className="description">
                          <p className="same-title"> Color </p>
                          <input 
                             type="text" 
                             className="form-control mt-1 custom-class-add" 
                             name="color"
                             value={input.color}
                             onChange={handleInputChange} />
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

export default CategoryAdd; 








