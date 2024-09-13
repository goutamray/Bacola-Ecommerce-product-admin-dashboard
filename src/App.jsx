
import { createContext, useEffect, useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.css';
import { router } from './routes/router';

const MyContext = createContext(); 

function App() {
  const [isToggleSidebar, setIsToggleSideBar] = useState(false); 
  const [isHeaderFooterShow, setIsHeaderFooterShow] = useState(true); 

  const [themeMode, setThemeMode] = useState(() => {
    return localStorage.getItem("themeMode") === "dark" ? false : true;
  });
  const [isLogin, setIsLogin] = useState(() => {
    return localStorage.getItem("token") !== null;
  });
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user")) || {
      name: "",
      email: "",
      userId: ""
    };
  });

  useEffect(() => {
    if (themeMode) {
      document.body.classList.remove("dark");
      document.body.classList.add("light");
      localStorage.setItem("themeMode", "light");
    } else {
      document.body.classList.remove("light");
      document.body.classList.add("dark");
      localStorage.setItem("themeMode", "dark");
    }
  }, [themeMode]);

  
  // login & logout 
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsLogin(true); 
      const userData = JSON.parse(localStorage.getItem("user"));
      setUser(userData); 
    } else {
      setIsLogin(false); 
      setUser({
        name: "",
        email: "",
        userId: ""
      });
    }
  }, []);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar visibility
    };

  const values = {
    isToggleSidebar,
    setIsToggleSideBar,
    themeMode,
    setThemeMode, 
    isLogin,
    setIsLogin,
    user,
    setUser,
    isHeaderFooterShow,
    setIsHeaderFooterShow,
    isSidebarOpen,
    setIsSidebarOpen,
    toggleSidebar
  };

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <MyContext.Provider value={values}> 
        <RouterProvider router={router}/>   
      </MyContext.Provider>
    </>  
  );
}

export default App;
export { MyContext };