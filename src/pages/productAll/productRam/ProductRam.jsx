import { useEffect, useState } from "react";
import createToast from "../../../utils/toastify";
import BreadCrumb from "../../../components/BreadCrumb/BreadCrumb";

import { HiDotsHorizontal } from "react-icons/hi";
import { FaCloudUploadAlt, FaTrashAlt } from "react-icons/fa";

// material ui
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';


// loading 
import CircularProgress from '@mui/material/CircularProgress';
import { FiEdit } from "react-icons/fi";


import { createProductRamData, deleteProductRamFromApi, fetchProductRamFromApi, updateProductRamData } from "../../../utils/api";

import "./ProductRam.css";

const ProductRam = () => {
  const [input, setInput ] = useState("")
  const [loading, setLoading ] = useState(false); 
  const [productRam, setProductRam] = useState([]); 
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState(null); 

  // handle close 
  const handleClose = () => {
    setOpen(false);
  };

  // handle Brand Submit
  const handleProductRamSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const name = input.trim(); // Use trim to avoid unnecessary spaces

    if (!name) {
        setLoading(false);
        createToast("All fields are required");
        return;
    }

    const formData = { name }; // Assuming your backend expects this structure

    // Create new product RAM
     createProductRamData("/", formData)
        .then((res) => {
                setLoading(false);
                createToast("Product Ram Created Successfully", "success");
                setInput(""); // Clear the input after creating a new product RAM
        })
        .catch((error) => {
                setLoading(false);
                createToast("Error creating Product RAM", "error");
        });
    
};


// get all ram 
 useEffect(() => {
  fetchProductRamFromApi("/").then((res) => {
    setProductRam(res.productRamList);
  });
 }, [productRam]); 

 // handle product ram delete 
 const handleProductRamDelete = (id) => {
  deleteProductRamFromApi(`/${id}`).then((res) => {
    createToast("Product Ram Deleted Successfull", "success"); 
    // refresh database 
    fetchProductRamFromApi("/").then((res) => {
      setProductRam(res.productRamList);
    });
  })
 }

 // handle product ram delete 
 const handleProductRamEdit = (id) => {
    setLoading(false);
    setOpen(true);
    setEditId(id); 

    fetchProductRamFromApi(`/${id}`)
        .then(res => {
            setInput(res.productRam.name);
            setLoading(false);
        })
        .catch(error => {
            console.error('Error fetching product RAM:', error);
            setLoading(false);
            createToast("Error fetching Product RAM", "error");
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
  updateProductRamData(`/${editId}`, formData)
  .then((res) => {
      setLoading(false);
      createToast("Product Ram Updated Successfully", "success");
      setOpen(false); // Close the form/modal after edit
      setInput("")
  })
 }

  return (
    <>
      <div className="right-content">
        <BreadCrumb title={"Product Ram"} page={"Product Ram"}/> 

        <div className="row my-4 product-upload-part ">
          <div className="col-sm-6 upload-part1 ">
             <div className="card p-3 right-part2 ">
                <div className="revenue-part">
                   <div className="rev-text">
                      <h4> Add New Product Ram </h4>
                   </div>
                   <p><HiDotsHorizontal /></p>
                 </div>

                 {/* product part  */}
                 <div className="product-upload-details">
                  <form onSubmit={handleProductRamSubmit} >
                      <div className="title">
                          <p className="same-title" > Product Ram </p>
                          <input 
                             type="text" 
                             className="form-control mt-1 custom-class-add" 
                             value={input}
                             placeholder="Add Product Ram"
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
          <div className="col-sm-6">
          <div className="product-table card p-3 custom-height ">
           <div className="table-responsive custom-table">
              <table className="table table-bordered table-striped">
                <thead >
                    <tr className="table-primary">
                      <th> Uid </th>
                      <th> Product Ram </th>
                      <th> action </th>
                    </tr>
                </thead>
                 <tbody>
                  {
                    productRam.length !== 0 && productRam?.map((item, index) => {
                      return  <tr className="align-middle" key={index} > 
                      <td> 
                        <input type="checkbox" name="" /> #{index + 1} 
                      </td>
                      <td> {item.name}</td>
                      <td>
                        <button 
                           className="editBtn"
                            onClick={() => handleProductRamEdit(item._id)}> 
                            <FiEdit /> 
                        </button>
                        <button 
                            className="delBtn" 
                            onClick={() => handleProductRamDelete(item._id)}
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
        <DialogTitle> Edit Product Ram </DialogTitle>
       <form > 
          <DialogContent>
            <div className="my-2">
              <label htmlFor="name"> Product Ram </label>
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

export default ProductRam;



