// react icons 
 import { FaCloudUploadAlt } from "react-icons/fa";
import { HiDotsHorizontal } from "react-icons/hi";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
     fetchBrandDataFromApi,
     fetchDataFromApi, 
     fetchProductRamFromApi, 
     fetchProductSizeFromApi, 
     fetchProductWeightFromApi, 
     fetchSubCategoryDataFromApi, 
     productData 
  } from "../../../utils/api";
import Rating from '@mui/material/Rating';
import BreadCrumb from "../../../components/BreadCrumb/BreadCrumb";
import createToast from "../../../utils/toastify";
import CircularProgress from '@mui/material/CircularProgress';
import Swal from "sweetalert2";

import "./ProductUpload.css";

// material ui 
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useTheme } from '@mui/material/styles';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


function getStyles(item, ramDataArr, theme) {
  return {
    fontWeight:
    ramDataArr.indexOf(item) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const ProductUpload = () => {
  const [input, setInput ] = useState({
    name : "",
    description : "",
    photo : [],
    category : "",
    subCat : "",
    brand : "",
    price : 0,
    oldPrice : 0,
    countInStock : 0,
    rating : 0,
    isFeatured : false,
    discount : 0,
    productRams : [],
    productSize : [],
    productWeight : [],
  }); 
  const [loading, setLoading ] = useState(false); 
  const [rating, setRating] = useState(0)
  const [file, setFile ] = useState([]); 
  const [catData, setCatData ] = useState([]);
  const [brandData, setBrandData] = useState([]); 
  const [subCatData, setSubCatData] = useState([]); 

  const [productRamData, setProductRamData] = useState([]); 
  const [productSizeData, setProductSizeData] = useState([]); 
  const [productWeightData, setProductWeightData] = useState([]); 

  // ram data 
  const [ramDataArr, setProductRamArr] = useState([]);
  const [sizeDataArr, setProductSizeArr] = useState([]);
  const [weightDataArr, setProductWeightArr] = useState([]);

  const theme = useTheme();

    // handle ram change 
    const handleRamChange = (event) => {
      const { target: { value }, } = event;
    
      // Ensure value is an array or split it into an array if it's a string
      const selectedValues = typeof value === 'string' ? value.split(',') : value;
    
      // Update the state for selected RAMs
      setProductRamArr(selectedValues);
    
      // Update the input state to reflect the selected RAMs
      setInput((prevState) => ({
        ...prevState,
        productRams: selectedValues,
      }));
    };

    // handle Size change 
    const handleSizeChange = (event) => {
      const { target: { value }, } = event;
    
      // Ensure value is an array or split it into an array if it's a string
      const selectedValues = typeof value === 'string' ? value.split(',') : value;
    
      // Update the state for selected RAMs
      setProductSizeArr(selectedValues);
    
      // Update the input state to reflect the selected RAMs
      setInput((prevState) => ({
        ...prevState,
        productSize: selectedValues,
      }));
    };

    // handle Weight change 
    const handleWeightChange = (event) => {
      const { target: { value }, } = event;
    
      // Ensure value is an array or split it into an array if it's a string
      const selectedValues = typeof value === 'string' ? value.split(',') : value;
    
      // Update the state for selected RAMs
      setProductWeightArr(selectedValues);
    
      // Update the input state to reflect the selected RAMs
      setInput((prevState) => ({
        ...prevState,
        productWeight: selectedValues,
      }));
    };


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
    setFile((prevState) => ([
      ...prevState,
      ...Array.from(e.target.files),
    ]));
  };

  // photo delete 
  const handlePhotoDelete = (item) => {
    setFile(file.filter(data => data !== item))
  }; 


 // handle product submit 
 const handleProductSubmit = (e) => {
     e.preventDefault(); 
     setLoading(true); 

   
     const formData = new FormData();
     formData.append('name', input.name);
     formData.append('description', input.description);
     formData.append('category', input.category);
     formData.append('subCat', input.subCat);
     formData.append('brand', input.brand);
     formData.append('price', input.price);
     formData.append('oldPrice', input.oldPrice);
     formData.append('countInStock', input.countInStock);
     formData.append('rating', input.rating);
     formData.append('isFeatured', input.isFeatured);
     formData.append('discount', input.discount);
    // Append the productRams as a JSON string
     formData.append('productRams', JSON.stringify(input.productRams));
     formData.append('productSize', JSON.stringify(input.productSize));
     formData.append('productWeight', JSON.stringify(input.productWeight));

    // file manage
     file.forEach((f) => {
      formData.append('photo', f);
    });
    
    // validate data 
    if( 
         !input.name || 
         !input.brand || 
         !input.price ||
         !input.photo ||
         !input.brand || 
         !input.category || 
         !input.description || 
         !input.countInStock 
        ){
           setLoading(false); 
           createToast("All fields are required");
           return;
       }else{
           Swal.fire("Data Stable", "success");
       } 
      
  // Submit the form data
    try {
      productData("/create", formData).then((res) => {
        console.log(res);
        
        setLoading(false); 
        createToast("Product Created Successfull", "success"); 
      });
      
        // reset form
        setInput({
          name : "",
          description : "",
          photo : [],
          category : "",
          brand : "",
          price : null,
          oldPrice : null,
          countInStock : null,
          rating : 0,
          isFeatured : false,
          discount : 0,
          productRams : [],
          productSize : [],
          productWeight : [],
        });

        e.target.reset(); 

        navigate("/product-list");

    } catch (error) {
      console.error(error.message);
    }
  }; 

  // get all brand list
    useEffect(() => {
      fetchBrandDataFromApi("/").then(res => {
        setBrandData(res.brandList);
      });
    }, [brandData]); 

/**
 * Get all data 
 * 
 */
  useEffect(() => {

    // get all category
    fetchDataFromApi("/").then(res => {
      setCatData(res.categoryList)
    });

    // get all product ram 
    fetchProductRamFromApi("/").then(res => {
      setProductRamData(res.productRamList)
    });

    // get all product size 
    fetchProductSizeFromApi("/").then(res => {
      setProductSizeData(res.productSizeList)
    });

    // get all product weight 
    fetchProductWeightFromApi("/").then(res => {
      setProductWeightData(res.productWeightList)
    });

}, [catData, productRamData, productSizeData, productWeightData ]); 


// get all sub category data
 useEffect(() => {
  fetchSubCategoryDataFromApi("/").then((res) => {
    setSubCatData(res.subCategoryList)
  });
 }, [subCatData]); 


  return (
    <>
      <div className="right-content">
        <BreadCrumb title={" Product Upload"} page={"Products"}/> 

        <div className="row my-4 product-upload-part ">
          <div className="col-sm-8 upload-part1 ">
             <div className="card p-3 right-part2 ">
                <div className="revenue-part">
                   <div className="rev-text">
                      <h4> Basic Information </h4>
                   </div>
                   <p><HiDotsHorizontal /></p>
                 </div>

                 {/* product part  */}
                 <div className="product-upload-details">
                  <form onSubmit={handleProductSubmit}> 
                    <div className="title">
                      <p className="same-title" > Product Name </p>
                      <input 
                         type="text" 
                         placeholder="Type here" 
                         className="form-control"
                         name="name"
                         value={input.name}
                         onChange={handleInputChange}
                      />
                    </div>
                    <div className="description">
                      <p className="same-title"> Description </p>
                      <textarea
                         cols="30" 
                         rows="5" 
                         className="form-control" 
                         placeholder="message"
                         name="description"
                         value={input.description}
                         onChange={handleInputChange}
                         >
                        </textarea>
                    </div>
                    <div className="description">
                      <p className="same-title"> Product Photo </p>
                      <input 
                            type="file" 
                            multiple
                            className="form-control mt-1 custom-class-add" 
                            name="photo"   
                            onChange={handleFileChange} 
                          />
                    </div>
                    <div className="all-details">
                      <div className="row">
                        <div className="col-sm-6">
                          <p className="same-title"> Category </p>
                           <select 
                             className="form-select form-control"
                             name="category" 
                             value={input.category}
                             onChange={handleInputChange}
                            >
                            <option value=""> Select Category </option>
                              {
                                catData.length !== 0 && 
                                catData?.map((item, index) => {
                                  return <option value={item._id} key={index}> 
                                         { item.name }
                                        </option>
                                })
                              }
                           </select>
                        </div>
                        <div className="col-sm-6">
                          <p className="same-title"> Sub Category </p>
                      <select 
                          name="subCat"
                          value={input.subCat}
                          className="form-select form-control"
                          onChange={handleInputChange}
                        >
                          <option value=""> Select Sub Category </option>
                              {
                                subCatData.length !== 0 &&
                                subCatData?.map((item, index) => {
                                      return <option value={item._id} key={index}>{item.name}</option>
                                    })
                                }
                      </select>
                        </div>
 
                      </div>

                      <div className="row">
                        <div className="col-sm-6">
                           <p className="same-title"> Regular Price </p>
                            <input 
                                type="text" 
                                placeholder="Type here" 
                                className="form-control"
                                name="price"
                                value={input.price}
                                onChange={handleInputChange}
                              />
                        </div>
                        
                        <div className="col-sm-6">
                           <p className="same-title"> Discount Price </p>
                           <input 
                               type="text" 
                               placeholder="Type here" 
                               className="form-control"
                               name="oldPrice"
                               value={input.oldPrice}
                               onChange={handleInputChange}
                            />
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-sm-6">
                          <div className="description">
                             <p className="same-title"> Is Featured </p>
                                <select
                                    name="isFeatured"
                                    className="form-select form-control"
                                    value={input.isFeatured}
                                    onChange={(e) => setInput({
                                      ...input,
                                      isFeatured: e.target.value === "true"
                                    })}
                                  >
                                <option value="true"> True </option>
                                <option value="false"> False </option>
                              </select>
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <p className="same-title"> Brand </p>
                           <select 
                              className="form-select form-control"
                              name="brand" 
                              value={input.brand}
                              onChange={handleInputChange}
                            >
                          <option value=""> Select Brand </option>
                           {
                                brandData.length !== 0 && 
                                brandData?.map((item, index) => {
                                  return<option 
                                       value={item.name}
                                       key={index}> 
                                         { item.name }
                                       </option>
                                })
                              }
                           </select>
                        </div>
                      </div>

                      <div className="row">
                           <div className="col-sm-4">
                              <div className="description">
                                <p className="same-title"> Product Ram </p>

                                <Select
                                    className="form-select form-control"
                                    multiple
                                    value={ramDataArr}
                                    onChange={handleRamChange}
                                   
                                    MenuProps={MenuProps}
                                  >
                                    {productRamData.map((item, index) => (
                                      <MenuItem
                                        
                                        key={index}
                                        value={item.name}
                                        style={getStyles(item , ramDataArr, theme)}
                                      >
                                        {item.name}
                                      </MenuItem>
                                    ))}
                                  </Select>

                   
                              </div>
                            </div>
                           <div className="col-sm-4">
                              <div className="description">
                                <p className="same-title"> Product Size </p>

                                  <Select
                                    className="form-select form-control"
                                    multiple
                                    value={sizeDataArr}
                                    onChange={handleSizeChange}
                                   
                                    MenuProps={MenuProps}
                                  >
                                {
                                    productSizeData.map((item, index) => (
                                      <MenuItem
                                        
                                        key={index}
                                        value={item.name}
                                        style={getStyles(item , sizeDataArr, theme)}
                                      >
                                        {item.name}
                                      </MenuItem>
                                    ))
                                  }
                                  </Select>

                              </div>
                            </div>

                           <div className="col-sm-4">
                              <div className="description">
                                <p className="same-title"> Product Weight </p>
                                  <Select
                                    className="form-select form-control"
                                    multiple
                                    value={weightDataArr}
                                    onChange={handleWeightChange}
                                   
                                    MenuProps={MenuProps}
                                  >
                                {
                                    productWeightData.map((item, index) => (
                                      <MenuItem
                                        
                                        key={index}
                                        value={item.name}
                                        style={getStyles(item , weightDataArr, theme)}
                                      >
                                        {item.name}
                                      </MenuItem>
                                    ))
                                  }
                                  </Select>
                              </div>
                            </div>
                      </div>
                     
                     {/* stock & discount & rating row start */}
                      <div className="row">
                        <div className="col-sm-4">
                          <div className="description">
                              <p className="same-title"> Stock </p>
                              <input 
                                  type="text" 
                                  placeholder="Type here" 
                                  className="form-control"
                                  name="countInStock"
                                  value={input.countInStock}
                                  onChange={handleInputChange}
                                />
                            </div>
                          </div>
                          <div className="col-sm-4">
                           <p className="same-title"> Discount </p>
                            <input 
                                type="text" 
                                placeholder="Type here" 
                                className="form-control"
                                name="discount"
                                value={input.discount}
                                onChange={handleInputChange}
                              />
                          </div>
                          <div className="col-sm-4">
                            <div className="description">
                              <p className="same-title"> Rating </p>
                              <Rating
                                  name="rating"
                                  value={input.rating}
                                  onChange={(event, newValue) => {
                                    setRating(newValue);
                                    setInput((prev) => ({
                                      ...prev,
                                      rating : newValue
                                    }))
                                  }}
                                />
                            </div>
                          </div>
                      
                      </div>
                    </div>
                    <button type="submit" className="btn btn-lg btn-primary mt-5">
                       <span> <FaCloudUploadAlt /> </span>
                         {
                            loading === true ?   
                            <CircularProgress color="inherit" className="ml-3 loader "/> : 
                             "Publish and View "
                          }
                     </button>
                 </form>
              </div>
            </div>
          </div>
          <div className="col-sm-4 upload-part2">
            <div className="card p-2 preview">
              <h4 className="preview-manage"> Product Preview Images </h4>
              <div className="card-body">
                 <div className="product-photo">
                      {
                        file.map((item, index) => {
                          const imageurl = URL.createObjectURL(item);

                          return <div className="single-product" key={index}>
                             <img src={imageurl} alt="product" />
                             <button className="btn btn-danger" onClick={()=> handlePhotoDelete(item)}> Delete </button>
                        </div>
                        })
                      }
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductUpload












