
import { IoSearchSharp } from "react-icons/io5";

import "./SearchBox.css"; 
const SearchBox = () => {
  return (
    <>
      <div className="searchbox ">
        <div className="icon">
           <IoSearchSharp />
        </div>
        <input type="text" placeholder="Search here..." className="search-data"/>
      </div>
    </>
  )
}

export default SearchBox
















