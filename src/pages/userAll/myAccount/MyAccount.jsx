
import { useNavigate } from "react-router-dom";
import "./MyAccount.css"; 
import { useEffect, useState } from "react";

import avaterPhoto from "../../../assets/avater/aaaa.jpg"; 

// loading 
import CircularProgress from '@mui/material/CircularProgress';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import TextField from '@mui/material/TextField';

import { FaCloudUploadAlt } from "react-icons/fa";
import { fetchUserDataFromApi, updateUserData } from "../../../utils/api";
import createToast from "../../../utils/toastify";
import axios from "axios";
import BreadCrumb from "../../../components/BreadCrumb/BreadCrumb";

const MyAccount = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState([]);

  const [input, setInput] = useState({
    name: "",
    email: "",
    phone: "",
    photo: "", // This will store the file object temporarily
    previewPhoto: "", // For image preview
  });

  const [fields, setfields] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  
  const navigate = useNavigate();

  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Handle file input change and set preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setInput((prevState) => ({
        ...prevState,
        photo: file, // Store the file object for uploading
        previewPhoto: imageUrl, // For image preview
      }));
    }
  };
  
  // Handle input change 
   const handleInputChange = (e) => {
      setInput((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value
      }));
    };

  useEffect(() => {
    window.scrollTo(0,0);

    const token = localStorage.getItem("token");

    if (token !== null && token !== undefined && token !== "") {
      setIsLogin(true);
    }else{
      navigate("/signIn"); 
    }

  }, []);


  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user && user?.userId) {
      fetchUserDataFromApi(`/${user?.userId}`).then((res) => {
        if (res) {
          setUserData(res);

          console.log(res);
          

          // Ensure response has required fields before setting input state
          setInput({
            name: res.user?.name || "",
            email: res.user?.email || "",
            phone: res.user?.phone || "",
            photo: res.user?.photo || "", // Ensure you are using the URL returned from API
            previewPhoto: res.user?.photo || avaterPhoto, // Default to avatar photo if no photo is available
          });
        }
      });
    } else {
      console.error("User not found in localStorage");
    }
  }, []);



// handle user update 
const handleUserUpdate = (e) => {
  e.preventDefault();
  setIsLoading(true);

  // Validation
  if (!input.name || !input.email || !input.phone) {
    setIsLoading(false);
    createToast("All fields are required");
    return;
  }

  const formData = new FormData();
  formData.append('name', input.name);
  formData.append('email', input.email);
  formData.append('phone', input.phone);
  if (input.photo) {
    formData.append('photo', input.photo);
  }

  // Get token and user data
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));


  if (user?.userId && token) {
    updateUserData(`/${user?.userId}`, formData)
      .then((res) => {
        setIsLoading(false);
        createToast("User updated successfully!", "success");
      })
  } else {
    setIsLoading(false);
    createToast("User or token not found", "error");
  }
};



// change password value 
const handlePassword = (e) => {
  setfields((prev) => ({
    ...prev,
    [e.target.name]: e.target.value
  }));
}

// handle password submit
const handlePasswordSubmit = (e) => {
  e.preventDefault();

  // Validation
  if (!fields.oldPassword || !fields.newPassword || !fields.confirmPassword) {
      setIsLoading(false);
      createToast("All fields are required");
      return;
  }

  if (fields.newPassword !== fields.confirmPassword) {
    setIsLoading(false);
    createToast("New Password and Confirm Password do not match");
    return;
  }

  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.userId) {
    // Create JSON payload
    const requestData = {
      oldPassword: fields.oldPassword,
      newPassword: fields.newPassword,
    };

    // Use Axios to send a PATCH request
    axios.patch(`http://localhost:5050/api/v1/user/changePassword/${user.userId}`, requestData)
      .then((res) => {
        console.log("Password updated successfully:", res);
        createToast("Password updated successfully", "success");
      })
      .catch((error) => {
        console.error("Error updating password:", error);
        createToast("Error updating password", "error");
      });
  } else {
    createToast("User not found", "error");
  }
};

  return (
    <>
      <div className="right-content">
         <BreadCrumb title={"User Profile"} page={"Users"}/> 
     
        <div className="account-dashboard">
          <div className="container">
          <div className="row">
                <div className="col">
                    <Box sx={{ width: '100%', typography: 'body1' }} className="custom-bg">
                      <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                          <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="Edit Profile" value="1" />
                            <Tab label="Change Password" value="2" />
                          </TabList>
                        </Box>                     
                      <TabPanel value="1">
                          <form onSubmit={handleUserUpdate}>
                            <div className="row mt-3">
                              <div className="col-md-3">  
                                      <div className="user-data">
                                        <div className="user-photo">
                                            <img src={input.previewPhoto || avaterPhoto} alt="User" />
                                        </div>
                                        <div className="overlay">
                                            <label htmlFor="photo-upload" className="file-upload-label">
                                              <FaCloudUploadAlt /> Upload
                                            </label>
                                            <input
                                              id="photo-upload"
                                              name="photo"
                                              type="file"
                                              onChange={handleFileChange}
                                              style={{ display: "none" }} // Hide the actual input field
                                            />
                                          </div>
                                      </div>
                                </div>
                              <div className="col-md-9">
                                  <div className="row">
                                  <div className="col-md-6">
                                      <div className="form-group">
                                          <TextField 
                                              fullWidth 
                                              id="outlined-basic" 
                                              label="Name" 
                                              variant="outlined" 
                                              name="name"
                                              value={input.name}
                                              onChange={handleInputChange}
                                            />
                                      </div>
                                      </div>
                                    <div className="col-md-6">
                                      <div className="form-group">
                                          <TextField 
                                              fullWidth 
                                              disabled 
                                              id="outlined-basic" 
                                              label="Email" 
                                              variant="outlined" 
                                              name="email"
                                              value={input.email}
                                              onChange={handleInputChange}
                                            />
                                      </div>
                                    </div>
                                    </div>
                                  <div className="row">
                                    <div className="col-md-12">
                                      <div className="form-group mt-2">
                                          <TextField 
                                              fullWidth 
                                              id="outlined-basic" 
                                              label="Phone" 
                                              variant="outlined" 
                                              name="phone"
                                              value={input.phone}
                                              onChange={handleInputChange}
                                            />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row">
                                      <button 
                                        type="submit" 
                                        className="save-btn"> 
                                        {
                                            isLoading === true ?   
                                            <CircularProgress color="inherit" className="ml-3 loader "/> 
                                            : "Save" 
                                          }
                                              
                                          
                                      </button>
                                  </div>
                              </div>
                              </div>
                          
                          </form>
                        </TabPanel>
                        <TabPanel value="2">
                        <form onSubmit={handlePasswordSubmit}>
                            <div className="row mt-3">
                              <div className="col-md-12">
                                  <div className="row">
                                    <div className="col-md-4">
                                      <div className="form-group">
                                          <TextField 
                                              fullWidth 
                                              id="outlined-basic" 
                                              label="Old Password" 
                                              variant="outlined" 
                                              name="oldPassword"
                                              value={fields.oldPassword}
                                              onChange={handlePassword}
                                            />
                                      </div>
                                      </div>
                                    <div className="col-md-4">
                                      <div className="form-group">
                                          <TextField 
                                              fullWidth  
                                              id="outlined-basic" 
                                              label="New Password" 
                                              variant="outlined"
                                              name="newPassword" 
                                              value={fields.newPassword}
                                              onChange={handlePassword}
                                            />
                                      </div>
                                    </div>
                                    <div className="col-md-4">
                                      <div className="form-group">
                                          <TextField 
                                              fullWidth 
                                              id="outlined-basic" 
                                              label="Confirm Password" 
                                              variant="outlined"
                                              name="confirmPassword"
                                              value={fields.confirmPassword} 
                                              onChange={handlePassword}
                                            />
                                      </div>
                                    </div>
                                    </div>
                                  <div className="row">
                                      <button 
                                        type="submit" 
                                        className="save-btn"
                                        > 
                                        Save
                                      </button>
                                  </div>
                              </div>
                              </div>
                          
                          </form>
                        </TabPanel>
                      </TabContext>
                    </Box>
                </div>
              </div>
      
          </div>
        </div>
      </div>
    </>
  )
}

export default MyAccount
