import { useEffect, useState } from "react";
import createToast from "../../../utils/toastify";

import BreadCrumb from "../../../components/BreadCrumb/BreadCrumb";

import { HiDotsHorizontal } from "react-icons/hi";
import { FaCloudUploadAlt, FaTrashAlt } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";

// material ui
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

// loading 
import CircularProgress from '@mui/material/CircularProgress';
import { createProductWeightData, deleteProductWeightFromApi, fetchProductWeightFromApi, updateProductWeightData } from "../../../utils/api";

const ProductWeight = () => {
  const [input, setInput ] = useState("")
  const [loading, setLoading ] = useState(false); 
  const [productSize, setProductSize] = useState([]); 
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState(null); 

  // handle close 
  const handleClose = () => {
    setOpen(false);
  };

  // handle product size Submit
  const handleProductWeightSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const name = input.trim(); // Use trim to avoid unnecessary spaces

    if (!name) {
        setLoading(false);
        createToast("All fields are required");
        return;
    }

    const formData = { name }; // Assuming your backend expects this structure

    // Create new product size
    createProductWeightData("/", formData)
        .then((res) => {
                setLoading(false);
                createToast("Product Weight Created Successfully", "success");
                setInput(""); // Clear the input after creating a new product RAM
        })
        .catch((error) => {
                setLoading(false);
                createToast("Error creating Product Weight", "error");
        });
    
};


// get all size
 useEffect(() => {
  fetchProductWeightFromApi("/").then((res) => {
    setProductSize(res.productWeightList);
  });
 }, [productSize]); 

 // handle product size delete 
 const handleProductRamDelete = (id) => {
  deleteProductWeightFromApi(`/${id}`).then((res) => {
    createToast("Product Weight Deleted Successfull", "success"); 
    // refresh database 
    fetchProductWeightFromApi("/").then((res) => {
      setProductSize(res.productWeightList);
    });
  })
 }

 // handle product size delete 
 const handleProductRamEdit = (id) => {
    setLoading(false);
    setOpen(true);
    setEditId(id); 

    fetchProductWeightFromApi(`/${id}`)
        .then(res => {
            setInput(res.productWeight.name);
            setLoading(false);
        })
        .catch(error => {
            setLoading(false);
        });
 }

  // handle update product ram data 
  const handleBrandUpdate = (e) => {
    e.preventDefault();
    setLoading(true);

    const name = input.trim(); // Use trim to avoid unnecessary spaces

    if (!name) {
        setLoading(false);
        createToast("All fields are required");
        return;
    }

    const formData = { name };

  // send update data to api 
  updateProductWeightData(`/${editId}`, formData)
  .then((res) => {
      setLoading(false);
      createToast("Product Weight Updated Successfully", "success");
      setOpen(false); // Close the form/modal after edit
      setInput("")
  })
 }

 
  return (
    <>
      <div className="right-content">
        <BreadCrumb title={"Product Weight"} page={"Product Weight"}/> 

        <div className="row my-4 product-upload-part ">
          <div className="col-sm-6 upload-part1 ">
             <div className="card p-3 right-part2 ">
                <div className="revenue-part">
                   <div className="rev-text">
                      <h4> Add New Product Weight </h4>
                   </div>
                   <p><HiDotsHorizontal /></p>
                 </div>

                 {/* product part  */}
                 <div className="product-upload-details">
                  <form onSubmit={handleProductWeightSubmit} >
                      <div className="title">
                          <p className="same-title" > Product Weight </p>
                          <input 
                             type="text" 
                             className="form-control mt-1 custom-class-add" 
                             value={input}
                              placeholder="Add Product Weight"
                             onChange={(e) => setInput(e.target.value)} />
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
          <div className="col-sm-6 upload-part2">
          <div className="product-table card p-3 custom-height ">
           <div className="table-responsive custom-table">
              <table className="table table-bordered table-striped">
                <thead >
                    <tr className="table-primary">
                      <th> Uid </th>
                      <th> Product Weight </th>
                      <th> action </th>
                    </tr>
                </thead>
                 <tbody>
                  {
                    productSize.length !== 0 && productSize?.map((item, index) => {
                      return  <tr className="align-middle" key={index} > 
                      <td> <input type="checkbox" name="" /> #{index + 1} </td>
                      
                      <td> {item.name}</td>
                      <td>
                       
                        <button className="editBtn" onClick={() => handleProductRamEdit(item._id)}> 
                            <FiEdit /> 
                        </button>
                        <button className="delBtn" onClick={() => handleProductRamDelete(item._id)}
                         >
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
      
    {/*edit product ram modal  */}
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
            handleClose();
          },
        }}
      >
        <DialogTitle> Edit Product Weight </DialogTitle>
       <form > 
          <DialogContent>
            <div className="my-2">
              <label htmlFor="name"> Product Weight </label>
              <input 
                type="text" 
                className="form-control mt-1 custom-class-add" 
                value={input} 
                onChange={(e) => setInput(e.target.value)} 
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
    </>
  )
}

export default ProductWeight
