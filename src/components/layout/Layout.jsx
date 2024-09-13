import { Outlet } from "react-router-dom"
import Header from "../Header/Header"
import Footer from "../footer/Footer"


import LoadingBar from 'react-top-loading-bar'
import { useContext, useState } from "react"
import { MyContext } from "../../App"


const Layout = () => {
  const [progress, setProgress] = useState(100);
  const context = useContext(MyContext)

  return (
    <>
      <LoadingBar
        color='#0d6efd'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
        style={{padding: "3px 0px"}}
      />
 

      {
        context?.isHeaderFooterShow === true &&  <Header /> 
      }
    
      <Outlet /> 

      {
        context?.isHeaderFooterShow === true &&  <Footer />  
      }
       
     
    
      
    </>
  )
}

export default Layout;













