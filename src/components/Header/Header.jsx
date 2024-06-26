// HeaderAndSidebar.jsx
import { GiHamburgerMenu } from "react-icons/gi";
import PropTypes from "prop-types";
import { FaSquarePlus } from "react-icons/fa6";
import { CgMenuGridR } from "react-icons/cg";
import { BiSolidContact } from "react-icons/bi";
import { Link } from "react-router-dom";
import "./Heaader.scss";

const HeaderAndSidebar = ({ isSidebarOpen, toggleSidebar }) => {
  return (
    <div className={`wrapper ${isSidebarOpen ? "sidebar-open" : ""}`}>
      <div className="sidebar" onClick={toggleSidebar}></div>
      <div className={`sidebar-content ${isSidebarOpen ? "open" : ""}`}>
        <ul className="sidebar_list">
          <li>
            <Link className="sidebar_list_item" to="/">
              <CgMenuGridR />
              Dashboard
            </Link>
          </li>
          <li>
            <Link className="sidebar_list_item" to="/add_question">
              {" "}
              <FaSquarePlus />
              Add Content
            </Link>
          </li>

          <li className="sidebar_list_item">
            <BiSolidContact />
            Contact
          </li>
        </ul>
      </div>
      <div className="header">
        <GiHamburgerMenu
          className={`hamburger ${isSidebarOpen ? "move-right" : ""}`}
          onClick={toggleSidebar}
        />
        <input className="searchInput" type="text" placeholder="Search..." />
        <h1>My Website</h1>
      </div>
    </div>
  );
};

HeaderAndSidebar.propTypes = {
  isSidebarOpen: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
};

export default HeaderAndSidebar;
