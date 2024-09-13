import { useEffect, useState } from "react";
import BreadCrumb from "../../../components/BreadCrumb/BreadCrumb";

// material ui
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

// loading 
import CircularProgress from '@mui/material/CircularProgress';

import { FaTrashAlt } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { deleteSliderFromApi, fetchSliderFromApi, updateSliderData } from "../../../utils/api";
import createToast from "../../../utils/toastify";
import "./SliderList.css";

const SliderList = () => {

  const [sliderData, setSliderData] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading ] = useState(false); 
  const [editId, setEditId ] = useState(null); 
  const [input, setInput ] = useState({
    title : "",
    subTitle : "",
    photo : null,
    price : 0,
    offerText : "",
    discount : 0,

  })

  // handle close 
  const handleClose = () => {
    setOpen(false);
  };

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
  


  useEffect(() => {
    fetchSliderFromApi("/").then((res) => {
      setSliderData(res.sliderList)
    });
  }, [sliderData]); 


  // handle slider delete 
  const handleSliderDelete = (id) => {
    deleteSliderFromApi(`/${id}`).then((res) => {
      createToast("Slider Deleted Successfully Done", "success"); 

      // refresh database
      fetchSliderFromApi("/").then((res) => {
        setSliderData(res.sliderList)
      });

    })
  };


  // handle slider update 
  const editSliderData = (id)=> {
    setInput({
      title : "",
      subTitle : "",
      photo : null,
      price : 0,
      offerText : "",
      discount : 0,
     });
     setOpen(true); 
     setEditId(id); 
 
      fetchSliderFromApi(`/${id}`).then(res => {
      
         setInput({
          title : res?.slider?.title,
          subTitle : res?.slider?.subTitle,
          photo : res?.slider?.photo,
          price : res?.slider?.price,
          discount : res?.slider?.discount,
          offerText : res?.slider?.offerText,
         });
     });
  }

  // handle update category 
  const handleSliderUpdate = (e) => {
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

    // send update data to api 
    updateSliderData(`/${editId}`, formData ).then((res) => {

      fetchSliderFromApi("/").then(res => {
        setSliderData(res.sliderList)
        setOpen(false);
        setLoading(false); 
      });
    })


    // refresh database
    fetchSliderFromApi("/").then((res) => {
      setSliderData(res.sliderList)
    });
    createToast("Slider Updated Successfull", "success"); 
  }
  
  return (
    <>
        <div className="right-content">
            <BreadCrumb title={"Slider List"} page={"Slider"}/> 

            <div className="slider-list card p-3">
              <div className="container slider-container ">
                <div className="row">
                  <div className="col">
                    
                       <table className="table table-bordered">
                          <thead className="slide-table">
                            <tr>
                                <th> Photo </th>
                                <th> Title </th>
                                <th className="mobile-hide"> Sub Title </th>
                                <th className="mobile-hide"> Offer Text </th>
                                <th> Discount </th>
                                <th> Price </th>
                                <th> Action </th>
                             </tr>
                          </thead>
                          <tbody>
                            {
                              sliderData?.length !== 0 && 
                              sliderData?.map((item, index) => {
                                return  <tr key={index}>
                                <td>
                                  <img className="slider-photo" src={item?.photo} alt="slider-photo" />
                                </td>
                                <td> {item?.title} </td>
                                <td  className="mobile-hide"> {item?.subTitle}</td>
                                <td  className="mobile-hide"> {item?.offerText} </td>
                                <td> {item?.discount}% </td>
                                <td> {item?.price} tk </td>
                                <td>
                                <button 
                                    className="editBtn"
                                     onClick={() => editSliderData(item?._id)}
                                    > 
                                    <FiEdit /> 
                                </button>
                                <button 
                                    className="delBtn" 
                                     onClick={() => handleSliderDelete(item?._id)}
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


    {/*edit slider modal  */}
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

          </DialogContent>
            <DialogActions>
               <Button onClick={handleClose}>Cancel</Button>
                 <Button 
                    type="submit" 
                    className="my-submit-btn"
                    onClick={handleSliderUpdate}
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

export default SliderList
























