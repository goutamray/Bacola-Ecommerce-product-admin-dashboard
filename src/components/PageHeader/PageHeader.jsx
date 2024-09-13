import favicon from "../../assets/img/logo.png"; 

import { Helmet } from "react-helmet";

const PageHeader = ({ title }) => {
  return (
    <>
       <Helmet > 
            <meta charSet="utf-8" />
              <title> Web Squad BD - React Admin | { title } </title> 
               <link rel="shortcut icon" href={favicon} type="image/x-icon" />
        </Helmet>
    </>
  )
}

export default PageHeader; 















