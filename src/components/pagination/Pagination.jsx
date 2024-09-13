
import { FaAngleLeft, FaAngleRight } from "react-icons/fa"

import "./Pagination.css"
const Pagination = () => {
  return (
    <>
         <nav aria-label="...">
                  <ul className="pagination">
                    <li className="page-item disabled">
                      <span className="page-link"> <FaAngleLeft /> </span>
                    </li>
                    <li className="page-item active"><a className="page-link" href="#">1</a></li>
                    <li className="page-item " aria-current="page">
                      <span className="page-link"> 2 </span>
                    </li>
                    <li className="page-item " aria-current="page">
                      <span className="page-link"> 3 </span>
                    </li>
                    <li className="page-item " aria-current="page">
                      <span className="page-link"> 4 </span>
                    </li>
                    <li className="page-item"><a className="page-link" href="#">...</a></li>
                    <li className="page-item"><a className="page-link" href="#"> 20 </a></li>
                    <li className="page-item">
                      <a className="page-link" href="#"> <FaAngleRight /> </a>
                    </li>
                  </ul>
              </nav>
    </>
  )
}

export default Pagination











