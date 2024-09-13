import { useEffect, useState } from "react";

import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import { createBrandData, deleteBrandData, editBrandData, fetchBrandDataFromApi } from "../../utils/api";

// react icons 
import { FiEdit } from "react-icons/fi";
import { HiDotsHorizontal } from "react-icons/hi";
import { FaCloudUploadAlt, FaTrashAlt } from "react-icons/fa";


// loading 
import CircularProgress from '@mui/material/CircularProgress';

// material ui
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import createToast from "../../utils/toastify";
import Swal from "sweetalert2";

import "./Brand.css"; 
const Brand = () => {
    const [input, setInput ] = useState({
      name : "",
      photo : null,
    }) 
  
    const [brandData, setBrandData] = useState([]); 
    const [loading, setLoading ] = useState(false); 
    const [open, setOpen] = useState(false);
    const [editId, setEditId ] = useState(null); 
  
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

  // handle Brand Submit
  const handleBrandSubmit = (e) => {
    e.preventDefault();
    setLoading(true); 

    const formData = new FormData();
    formData.append('name', input.name);
    if (input.photo) {
      formData.append('photo', input.photo);
    }

    if(!input.name || !input.photo ){
      setLoading(false); 
      createToast("All fields are required"); 
      return; 
    }else{
      Swal.fire("Data Stable", "success");
    }

    createBrandData("/", formData).then((res) => {
      setLoading(false); 
      createToast("Brand Created Successfull", "success"); 
    });

    // reset form
    setInput({
      name : "",
      photo : null,
    }); 
  }; 



  // handle brand delete 
  const handleBrandDelete = (id) => {
 
    deleteBrandData(`/${id}`).then((res) => {
      createToast("Brand Deleted Successfull", "success"); 
      // refresh database 
      fetchBrandDataFromApi("/").then(res => {
        setBrandData(res.brandList);
      });
    });
  }; 

  // handle edit Brand 
  const handleBrandEdit = (id) => {
    setInput({
      name : "",
      photo : null,
     });
    setOpen(true); 
    setEditId(id);  

    fetchBrandDataFromApi(`/${id}`).then(res => {
      setInput({
       name : res.brand.name,
       photo : res.brand.photo,
      });
  });
 }; 

  // handle update brand data 
    const handleBrandUpdate = (e) => {
      e.preventDefault();
      setLoading(true); 
   
      // form data 
      const formData = new FormData();
      formData.append('name', input.name);
      if (input.photo) {
        formData.append('photo', input.photo);
      }
  
    // send update data to api 
    editBrandData(`/${editId}`, formData ).then((res) => {
        // refresh database 
        fetchBrandDataFromApi("/").then(res => {
          setBrandData(res.brandList);
          setOpen(false);
          setLoading(false); 
    });

    // reset form 
    setInput({
        name : "",
        photo : null,
    });

  })
  
  createToast("Brand Updated Successfull", "success"); 
   }

  // get all brand list
  useEffect(() => {
    fetchBrandDataFromApi("/").then(res => {
      setBrandData(res.brandList);
  });
}, [brandData]); 
  
  return (
    <>
      <div className="right-content">
        <BreadCrumb title={"Brand Add"} page={"Brand"}/> 

        <div className="row my-4 product-upload-part ">
          <div className="col-sm-6 upload-part1 ">
             <div className="card p-3 right-part2 ">
                <div className="revenue-part">
                   <div className="rev-text">
                      <h4> Add New Brand </h4>
                   </div>
                   <p><HiDotsHorizontal /></p>
                 </div>

                 {/* product part  */}
                 <div className="product-upload-details">
                  <form onSubmit={handleBrandSubmit} >
                      <div className="title">
                          <p className="same-title" > Brand Name </p>
                          <input 
                             type="text" 
                             className="form-control mt-1 custom-class-add" 
                             name="name"
                             value={input.name}
                              placeholder="Add Product Brand"
                             onChange={handleInputChange} />
                        </div>
                        <div className="description">
                          <p className="same-title"> Brand Photo </p>
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
                             "Create"
                          }
                        </button>
                   </form>
                 </div>
            </div>
          </div>
          <div className="col-sm-6">
          <div className="product-table card p-3 custom-height ">
           <div className="table-responsive custom-table">
              <table className="table table-bordered table-striped">
                <thead >
                    <tr className="table-primary">
                      <th> Uid </th>
                      <th> Image </th>
                      <th> Brand </th>
                      <th> action </th>
                    </tr>
                </thead>
                 <tbody>
                  {
                    brandData.length !== 0 && brandData?.map((item, index) => {
                      return  <tr className="align-middle" key={index} > 
                      <td> <input type="checkbox" name="" /> #{index + 1 }  </td>
                      <td> 
                        <div className="table-product">
                          <img src={item.photo} alt="brand" />
                        </div>
                      </td>
                      <td> {item.name}</td>
                      <td>
                       
                        <button 
                            className="editBtn"
                            onClick={() => handleBrandEdit(item._id)}
                             > 
                            <FiEdit /> 
                        </button>
                        <button className="delBtn" onClick={() => handleBrandDelete(item._id)}>
                          <FaTrashAlt />
                        </button>
                      </td>
                    </tr>
                    })
                  }
                     
                </tbody>
              </table>
             
               </div>
            </div>
          </div>
        </div>
      </div>

    {/*edit brand modal  */}
    <div>
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
        <DialogTitle> Edit Brand </DialogTitle>
       <form > 
          <DialogContent>
            <div className="my-2">
              <label htmlFor="name"> Brand Name </label>
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
                 <label htmlFor="photo"> Brand Photo </label>
                  <input 
                      type="file" 
                      className="form-control" 
                      name="photo"
                      onChange={handleFileChange} 
                    />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button 
               type="submit" 
               className="my-submit-btn"
                onClick={handleBrandUpdate}
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
    </div>
    </>
  )
}

export default Brand













