// Layout.jsx
import { useState } from "react";
import Header from '../Header/Header'
import PropTypes from "prop-types";
import "./Layout.scss";

const Layout = ({children}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={`wrapper ${isSidebarOpen ? "sidebar-open" : ""}`}>
      <Header isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="content">{children}</div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired, 
};

export default Layout;
