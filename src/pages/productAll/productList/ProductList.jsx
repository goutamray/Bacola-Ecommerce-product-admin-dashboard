
// react icons 
import { 
  FaAngleLeft, 
  FaAngleRight, 
  FaRegEye, 
  FaShoppingBag, 
  FaStar, 
  FaTrashAlt } from "react-icons/fa";
import { MdWidgets } from "react-icons/md";
import { MdVerifiedUser } from "react-icons/md";
import { FiEdit } from "react-icons/fi";

import { useEffect, useState } from "react";
import BreadCrumb from "../../../components/BreadCrumb/BreadCrumb";

import { deleteProductData, 
  editProductData, 
  fetchBrandDataFromApi, 
  fetchDataFromApi, 
  fetchProductFromApi, 
  fetchProductRamFromApi, 
  fetchProductSizeFromApi, 
  fetchProductWeightFromApi, 
  fetchSubCategoryDataFromApi 
} from "../../../utils/api";
import createToast from "../../../utils/toastify";

// loading 
import CircularProgress from '@mui/material/CircularProgress';

// material ui
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import Rating from '@mui/material/Rating';

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
}; 


import "./ProductList.css"; 
import { Link } from "react-router-dom";
import Pagination from "../../../components/pagination/Pagination";

const ProductList = () => {
   const [productList, setProductList] = useState([]);
   const [open, setOpen] = useState(false);
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
  const [editId, setEditId ] = useState(null); 
  const [rating, setRating] = useState(0); 
  const [file, setFile ] = useState([]); 
  const [catData, setCatData ] = useState([]);
  const [loading, setLoading ] = useState(false); 
  const [brandData, setBrandData] = useState([]);  
  const [subCatData, setSubCatData] = useState([]); 
  
  const [productRamData, setProductRamData] = useState([]); 
  const [productSizeData, setProductSizeData] = useState([]); 
  const [productWeightData, setProductWeightData] = useState([]); 

  // handle input change 
   const handleInputChange = (e) => {
    setInput((prevState) => ({
        ...prevState, 
        [e.target.name] : e.target.value
      }))
  }; 

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

   // Handle file input change
    const handleFileChange = (e) => {
      setFile((prevState) => ([
        ...prevState,
        ...Array.from(e.target.files),
      ]));
    };

    // handle close 
    const handleClose = () => {
      setOpen(false);
    };

  // edit product data 
  const editProduct = (id) => {
    setOpen(true); 
    setEditId(id); 

    fetchProductFromApi(`/${id}`).then(res => {
      if (res.product) {
        setInput({
          name: res.product.name || '',
          description: res.product.description || '',
          category: res.product.category || '',
          subCat: res.product.subCat || '',
          brand: res.product.brand || '',
          price: res.product.price || '',
          oldPrice: res.product.oldPrice || '',
          countInStock: res.product.countInStock || '',
          rating: res.product.rating || '',
          isFeatured: res.product.isFeatured || false,
          photo: res.product.photo || [],
          discount: res.product.discount || '',
          productRams: res.product.productRams || [], // Ensure it's an array
          productSize: res.product.productSize || [], // Ensure it's an array
          productWeight: res.product.productWeight || [], // Ensure it's an array
        });


        
      }
    }).catch(error => {
      console.error('Error fetching product data:', error);
    });
  };

  // handle product update data
  const handleProductUpdate = (e) => {
    e.preventDefault();
    setLoading(true); 

    // form data 
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

    editProductData(`/${editId}`, formData ).then((res) => {
      // refresh database 
      fetchProductFromApi("/").then(res => {
        setProductList(res.productList)
        setOpen(false);
        setLoading(false); 
      });
    }); 

    // refresh database 
    fetchProductFromApi("/",).then((res) => {
      setProductList(res.productList);
  });
  createToast("Product Updated Successfull", "success"); 
  }; 

  // handle delete single product data
  const handleProductDelete = (id) => {
    deleteProductData(`/${id}`).then((res) => {
      createToast("Product Deleted Successfull", "success"); 
  
      // refresh database 
      fetchProductFromApi("/",).then((res) => {
        setProductList(res.productList);
      });
    })
   }; 


  // get all products 
    useEffect(() => {
      fetchProductFromApi("/",).then((res) => {
          setProductList(res.productList);
      });
    }, [productList]); 

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

  // get all brand list
  useEffect(() => {
    fetchBrandDataFromApi("/").then(res => {
      setBrandData(res.brandList);
    });
  }, [brandData]); 


 // get all sub category 
 useEffect(() => {
  fetchSubCategoryDataFromApi("/").then((res) => {
    setSubCatData(res.subCategoryList)
  });
 }, [subCatData]); 


  return (
    <>
      <div className="right-content">
        <BreadCrumb title={"Product List "} page={"Products"}/> 

        <div className="product-list-topper">
            <div className="row">
                <div className="col-sm-4 part1 ">
                    <div className="total-product ">
                        <div className="left-top-part ">
                           <h2>{productList?.length}</h2>
                           <span> <FaShoppingBag /> </span>
                        </div>
                        <p> Total Products </p>
                    </div>
                </div>
                <div className="col-sm-4 part1 ">
                    <div className="total-product category ">
                        <div className="left-top-part ">
                           <h2> {catData?.length}</h2>
                           <span className="widget"> <MdWidgets /></span>
                        </div>
                        <p> Total Categories </p>
                    </div>
                </div>
                <div className="col-sm-4 part1 ">
                    <div className="total-product brand">
                        <div className="left-top-part ">
                           <h2>{brandData?.length} </h2>
                           <span className="verify"> <MdVerifiedUser /> </span>
                        </div>
                        <p> Total Barnds </p>
                    </div>
                </div>
            </div>
        </div>

        <div className="product-table card p-3">
          <div className="row cartFilter">
               <div className="col-sm-3 col-single">
                  <h4 > SHOW BY </h4>
                  <select className="form-select" defaultValue="">
                      <option  value="1">12 Row </option>
                      <option value="2">24 Row </option>
                      <option value="3">36 Row </option>
                </select>
               </div>
               <div className="col-sm-3 col-single">
                  <h4 > RATING BY </h4>
                  <select className="form-select" defaultValue="">
                      <option  value="1"> 1 Star </option>
                      <option value="2"> 2 Star </option>
                      <option value="3"> 3 Star </option>
                      <option value="4"> 4 Star </option>
                      <option value="5"> 5 Star </option>
                </select>
               </div>
               <div className="col-sm-3 col-single">
                     <h4 > CATEGORY BY </h4>
                     <select 
                          className="form-select form-control"
                          name="category" 
                          value={input.category}
                          onChange={handleInputChange}
                       >
                     <option value="" disabled> Select Category </option>
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
              
               <div className="col-sm-3 col-single">
                  <h4 > BRAND BY </h4>
                  <select 
                        className="form-select form-control"
                        name="brand" 
                        value={input.brand}
                        onChange={handleInputChange}
                      >
                       <option value="" disabled> Select Brand </option>
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

           <div className="table-responsive custom-table">
              <table className="table table-bordered ">
                <thead >
                    <tr className="table-primary">
                      <th> uid </th>
                      <th> product </th>
                      <th> category </th>
                      <th className="mobile-hide"> sub cat </th>
                      <th className="mobile-hide"> brand </th>
                      <th className="mobile-hide"> discount </th>
                      <th className="mobile-hide"> P Ram </th>
                      <th className="mobile-hide"> P Size </th>
                      <th className="mobile-hide"> P weight </th>
                      <th className="mobile-hide"> price </th>
                      <th className="mobile-hide"> stock </th>
                      <th className="mobile-hide"> rating </th>
                      <th className="mobile-hide"> action </th>
                    </tr>
                </thead>
                <tbody>
                  {
                    productList?.length !== 0 && productList?.map((item, index) => {
                      return  <tr className="align-middle" key={index}> 
                      <td> <input type="checkbox" /> #{index + 1} </td>
                      <td> 
                        <div className="table-product custom-table-product-data">
                        
                          <img  src={item.photo?.[0] ? item?.photo[0] : 'default-image-url.jpg'}  alt="product" />
                          <div className="product-box">
                            <div className="tab-content">
                               <h6 className="product-heading">
                                {
                                item?.name?.length > 25 ?
                                  item?.name.substring(0, 20)+ ". . ." : 
                                  item?.name
                                 } 
                               </h6>
                               <p>
                                {
                                item?.description?.length > 30 ?
                                  item.description.substring(0, 25)+ ". . ." : 
                                  item.description
                                 } 
                               </p>

                            </div>
                          </div>
                        </div>
                      </td>
                      <td> {item?.category?.name}</td>
                      <td className="mobile-hide"> {item?.subCat?.name}</td>
                      
                      <td className="mobile-hide"> {item?.brand} </td>
                      <td className="mobile-hide"> {item?.discount}</td>
                      <td className="product-ram-data mobile-hide"> {item?.productRams?.map((item_, index_) => {
                        return <span key={index_} className="custom-design"> {item_}</span>
                      })}
                      </td>

                      <td className="custom-size-design mobile-hide">  {item?.productSize?.map((item__, index__)=> {
                        return <span className="product-size-data" key={index__}> {item__}</span>
                      })} </td>
                      <td className="mobile-hide"> {item?.productWeight?.map((item___, index___) => {
                        return <span key={index___} className="product-weight-custom"> {item___}</span>
                      })} </td>
                      <td className="mobile-hide"> 
                         <p className="reg-price "> {item?.price}</p>
                         <p className="sale-price"> {item?.oldPrice} </p>
                      </td>
                      <td className="mobile-hide"> {item?.countInStock} </td>
                      <td className="mobile-hide"> 
                         <div className="three-item">
                            <div className="star"> <FaStar /> </div>
                             <span> {item?.rating} </span>
                          </div>
                      </td>
                      <td className="mobile-hide">
                        <div >
                          <Link to={`/product-view/${item?._id}`}>
                            <button className="eyeBtn">
                              <FaRegEye />
                            </button>
                          </Link>
                        </div>  
                          <button 
                              className="editBtn"
                              onClick={() => editProduct(item?._id)}
                              > 
                              <FiEdit /> 
                          </button>
                          <button 
                              className="delBtn" 
                              onClick={() => handleProductDelete(item?._id)}>  <FaTrashAlt /> 
                          </button>
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


    {/* edit product modal  */}
      <Dialog
        className="editproductModal"
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const formJson = Object.fromEntries().entries();
            const email = formJson.email;
            handleClose();
          },
        }}
      >
        <DialogTitle> Edit Product </DialogTitle>
        <form > 
          <DialogContent>
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
                            <option value="" disabled> Select Category </option>
                              {
                                catData.length !== 0 && 
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
                        <div className="col-sm-6">
                          <p className="same-title"> sub Category </p>
                          <select 
                          name="subCat"
                          value={input.subCat}
                          className="form-select form-control"
                          onChange={handleInputChange}
                        >
                          <option value="" disabled> Select Sub Category </option>
                              {
                                subCatData.length !== 0 &&
                                subCatData.map((item, index) => {
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
                          <option value="" disabled> Select Brand </option>
                              {
                                brandData.length !== 0 && 
                                brandData?.map((item, index) => {
                                  return <option 
                                       value={item.name}
                                       key={index}> 
                                         { item.name }
                                       </option>
                                })
                              }
                           </select>
                        </div>
                      </div>

                      {/* product ram & size & weight  */}
                      <div className="row">
                           <div className="col-sm-4">
                              <div className="description">
                                <p className="same-title"> Product Ram </p>
                                <Select
                                    className="form-select form-control"
                                    multiple
                                    value={input.productRams} // Use state value
                                    onChange={handleRamChange}
                                    MenuProps={MenuProps}
                                  >
                                    {productRamData.map((item, index) => (
                                      <MenuItem
                                        key={index}
                                        value={item.name}
                                        style={getStyles(item, input.productRams, theme)} // Adjust selection style
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
                                    value={input.productSize} // Use state value
                                    onChange={handleSizeChange}
                                    MenuProps={MenuProps}
                                  >
                                    {productSizeData.map((item, index) => (
                                      <MenuItem
                                        key={index}
                                        value={item.name}
                                        style={getStyles(item, input.productSize, theme)}
                                      >
                                        {item.name}
                                      </MenuItem>
                                    ))}
                                  </Select>
                              </div>
                            </div>

                           <div className="col-sm-4">
                              <div className="description">
                                <p className="same-title"> Product Weight </p>
                                <Select
                                    className="form-select form-control"
                                    multiple
                                    value={input.productWeight} // Use state value
                                    onChange={handleWeightChange}
                                    MenuProps={MenuProps}
                                  >
                                    {productWeightData.map((item, index) => (
                                      <MenuItem
                                        key={index}
                                        value={item.name}
                                        style={getStyles(item, input.productWeight, theme)}
                                      >
                                        {item.name}
                                      </MenuItem>
                                    ))}
                                  </Select>
                              </div>
                            </div>
                      </div>
                      
                      {/* product stock & discount & rating  */}
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
                        <div className="col-sm-6">
                            
                        </div>
                      </div>
                    </div>

          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button 
               type="submit" 
               className="my-submit-btn"
                onClick={handleProductUpdate}
               > 
                {
                  loading === true ?  
                   <CircularProgress color="inherit" className="ml-3 loader "/> :  
                   "Update"
                }
            </Button>
          </DialogActions>
        </form> 
      </Dialog>

    </>
  )
}

export default ProductList;         

















