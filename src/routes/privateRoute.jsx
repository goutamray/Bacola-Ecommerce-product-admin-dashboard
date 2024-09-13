import Layout from "../components/layout/Layout";

// single page list 
import Home from "../pages/home/Home";
import OrderList from "../pages/order/OrderList";

// login &  register 
import Forget from "../pages/authPage/forget/Forget";
import Login from "../pages/authPage/login/Login";
import Register from "../pages/authPage/register/Register";


//dashboard list all
import Analyticks from "../pages/dashBoard/analytics/Analyticks";
import Ecommerce from "../pages/dashBoard/ecommerce/Ecommerce";

// product list 
import ProductList from "../pages/productAll/productList/ProductList";
import ProductUpload from "../pages/productAll/productUpload/ProductUpload";
import ProductView from "../pages/productAll/productView/ProductView";

// user list 
import UserList from "../pages/userAll/userList/UserList";
import MyAccount from "../pages/userAll/myAccount/MyAccount";

// other page list
import CategoryAdd from "../pages/category/categoryAdd/CategoryAdd";
import NotFound from "../pages/notFound/NotFound";
import CategoryList from "../pages/category/categoryList/CategoryList";
import Brand from "../pages/Brand/Brand";
import SubCategory from "../pages/category/subCategory/SubCategory";

import ProductRam from "../pages/productAll/productRam/ProductRam";
import ProductSize from "../pages/productAll/productSize/ProductSize";
import ProductWeight from "../pages/productAll/productWeight/ProductWeight";
import SliderUpload from "../pages/slider/sliderUpload/SliderUpload";
import SliderList from "../pages/slider/sliderList/SliderList";


// create private router 
export const privateRoute = [
  {
    element : <Layout />,
    children : [
      {
        path : "/",
        element : <Home />,
        children : [
          {
            index : true,
            element : <Ecommerce />
          }, 
          {
            path : "/ecommerce",
            element : <Ecommerce /> 
          },
          {
            path : "/analytics",
            element : <Analyticks /> 
          },
          {
            path : "/product-list",
            element : <ProductList /> 
          },
          {
            path : "/product-view/:id",
            element : <ProductView /> 
          },
          {
            path : "/product-upload",
            element : <ProductUpload /> 
          },
          {
            path : "/order-list",
            element : <OrderList />
          },
          {
            path : "/slider-add",
            element : <SliderUpload />
          },
          {
            path : "/slider-list",
            element : <SliderList />
          },
          {
            path : "/user-list",
            element : <UserList />
          },
          {
            path : "/login",
            element : <Login />
          },
          {
            path : "/register",
            element : <Register /> 
          },
          {
            path : "/forget",
            element : <Forget /> 
          },
          {
            path : "/my-account",
            element : <MyAccount /> 
          },
          {
            path : "/category-add",
            element : <CategoryAdd />
          },
          {
            path : "/category",
            element : <CategoryList />
          },
          {
            path : "/brand",
            element : <Brand />
          },
          {
            path : "/sub-category",
            element : <SubCategory />
          },
          {
            path : "/product-ram",
            element : <ProductRam />
          },
          {
            path : "/product-size",
            element : <ProductSize /> 
          },
          {
            path : "/product-weight",
            element : <ProductWeight /> 
          },
          {
            path : "*",
            element : <NotFound /> 
          },
        ]
      },
        
    ]
  }

]











