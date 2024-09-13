
// react icons 
import { FaAngleLeft, FaAngleRight, FaTrashAlt } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";

import BreadCrumb from "../../../components/BreadCrumb/BreadCrumb";
import { deleteData, editData, fetchDataFromApi, fetchSubCategoryDataFromApi } from "../../../utils/api";
 
// loading 
import CircularProgress from '@mui/material/CircularProgress';

import { useEffect, useState } from "react";

// material ui
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import createToast from "../../../utils/toastify";
import "./CategoryList.css";
import Pagination from "../../../components/pagination/Pagination";

const CategoryList = () => {
  const [catData, setCatData ] = useState([]);
  const [open, setOpen] = useState(false);

  const [editId, setEditId ] = useState(null); 
  const [loading, setLoading ] = useState(false); 
  const [subCatData, setSubCatData] = useState([]); 
  const [page , setPage] = useState(1); 

  const [input, setInput ] = useState({
    name : "",
    subCat: "",
    photo : null,
    color : "",
  });
  
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

  // handle close 
  const handleClose = () => {
    setOpen(false);
  };

  // edit category
  const editCategory = (id) => {
    setInput({
      name : "",
      subCat : "",
      photo : null,
      color : ""
     });
     setOpen(true); 
     setEditId(id); 
 
     fetchDataFromApi(`/${id}`).then(res => {
         setInput({
          name : res?.category?.name,
          subCat : res?.category?.subCat,
          photo : res?.category?.photo,
          color : res?.category?.color,
         });
    });
  }; 

  // handle update category 
  const handleCategoryUpdate = (e) => {
    e.preventDefault();
    setLoading(true); 

    // form data 
    const formData = new FormData();
    formData.append('name', input.name);
    formData.append('subCat', input.subCat);
    formData.append('color', input.color);
    if (input.photo) {
      formData.append('photo', input.photo);
    }

    // send update data to api 
    editData(`/${editId}`, formData ).then((res) => {
      // refresh database 
      fetchDataFromApi("/").then(res => {
        setCatData(res.categoryList)
        setOpen(false);
        setLoading(false); 
      });
    })

    // refresh database 
    fetchDataFromApi("/").then(res => {
        setCatData(res.categoryList);
        setOpen(false);
    });
    createToast("Category Updated Successfull", "success"); 
  }


  // delete category 
  const handleCategoryDelete = (id) => {
    
    deleteData(`/${id}`).then((res) => {
      createToast("Category Deleted Successfull", "success"); 
      // refresh database 
      fetchDataFromApi("/").then(res => {
        setCatData(res.categoryList);
        setOpen(false);
      });
    })
  }

// get category list
    useEffect(() => {
      fetchDataFromApi("/").then(res => {
          setCatData(res.categoryList);
    });
  }, [catData]);
  
// get all sub category 
useEffect(() => {
  fetchSubCategoryDataFromApi("/").then((res) => {
    setSubCatData(res.subCategoryList)
  });
}, [subCatData]); 
 

  return (
    <>
      <div className="right-content">
        <BreadCrumb title={"Category List"} page={"Category"}/> 

        <div className="product-table card p-3 mt-3">
           <div className="table-responsive custom-table">
              <table className="table table-bordered table-striped">
                <thead >
                    <tr className="table-primary">
                      <th> Uid </th>
                      <th> Image </th>
                      <th> Category </th>
                      <th className="mobile-hide"> Sub Category </th>
                      <th> Color </th>
                      <th> action </th>
                    </tr>
                </thead>
                <tbody>

                  {
                    catData.length !== 0 && catData.map((item, index) => {
                      return (
                        <tr className="align-middle" key={index}> 
                        <td> <input type="checkbox" /> #{index + 1} </td>
                        <td> 
                          <div className="table-product">
                            <img src={item?.photo} alt="" />
                          </div>
                        </td>
                        <td> {item?.name}  </td>
                        <td className="mobile-hide"> {item?.subCat?.name}</td>
                        <td> 
                          {item?.color}
                        </td>
                       
                        <td>
                          {/* <button className="eyeBtn" > <FaRegEye /> </button> */}
                          <button 
                              className="editBtn" 
                              onClick={() => editCategory(item?._id)} > 
                              <FiEdit /> 
                          </button>
                          <button className="delBtn" onClick={() => handleCategoryDelete(item?._id)}>  <FaTrashAlt /> </button>
                        </td>
                      </tr>
                      )
                    })
                  }
                </tbody>
              </table>
              <div className="table-footer">
                <div className="footer-left">
                    <p> showing <b> { page } </b>  of <b> {catData?.length} </b> results </p>
                </div>
                <div className="footer-right">
                    <Pagination />
                </div>
              </div>
           </div>
        </div>
      </div>



      {/*edit category modal  */}
      <Dialog
        className="editModal"
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
        <DialogTitle> Edit Category </DialogTitle>
       <form action="#"> 
          <DialogContent>
            <div className="my-2">
              <label htmlFor="name"> Category Name </label>
              <input 
                  type="text" 
                  className="form-control mt-1 custom-class-add"
                  id="name"
                  name="name"
                  value={input.name}
                  onChange={handleInputChange}
                  />
            </div>
            <div className="my-2">
              <label htmlFor="subName"> Sub Category Name </label>
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
            <div className="my-2">
                 <label htmlFor="photo"> Category Photo </label>
                  <input 
                      type="file" 
                      className="form-control" 
                      name="photo"
                      onChange={handleFileChange} 
                    />
            </div>

            <div className="my-2">
              <label htmlFor="color"> Category Color </label>
              <input 
                  type="text" 
                  className="form-control mt-1 custom-class-add "
                  id="color"
                  name="color"
                  value={input.color}
                  onChange={handleInputChange}
                  />
            </div>

          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button 
               type="submit" 
               className="my-submit-btn"
               onClick={handleCategoryUpdate}
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

export default CategoryList; 
