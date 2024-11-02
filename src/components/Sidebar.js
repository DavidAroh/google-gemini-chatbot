import React, { useState } from "react";
import { TbStackFilled } from "react-icons/tb";
import { MdHome, MdFileCopy, MdLightMode, MdDarkMode, MdMenu, MdClose, MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { IoMdLock } from "react-icons/io";
import "../styles/Sidebar.css";

const Sidebar = ({ darkMode, setDarkMode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Toggle state for sidebar visibility on mobile
  const [isOtherPagesOpen, setIsOtherPagesOpen] = useState(false); // Toggle state for "Other Pages" dropdown
  const [isAdminPagesOpen, setIsAdminPagesOpen] = useState(false); // Toggle state for "Admin Pages" dropdown

  // Function to toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Function to toggle "Other Pages" dropdown
  const toggleOtherPagesDropdown = () => {
    setIsOtherPagesOpen(!isOtherPagesOpen);
  };

  // Function to toggle "Admin Pages" dropdown
  const toggleAdminPagesDropdown = () => {
    setIsAdminPagesOpen(!isAdminPagesOpen);
  };

  return (
    <div>
      {/* Toggle button for mobile */}
      <button className="toggle-sidebar-button" onClick={toggleSidebar}>
        {isSidebarOpen ? <MdClose size={25} /> : <MdMenu size={25} />}
      </button>

      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <div className="sidebar__header">
          <img src="../assets/logo.svg" alt="logo" className="logo" />
        </div>
        <hr style={{
          border: "none",
          borderTop: "2px solid #E9EDF7",
          position: "relative",
          right: 20,
          width: "280px",
        }} 
        />
        
        <div className="dark-mode-toggle">
          <button onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <MdLightMode className="light" /> : <MdDarkMode className="dark" />}
          </button>
        </div>

        <div className="sidebar-content">
          <ul className="sidebar-content2">
            <li className="projects">
              <TbStackFilled className="icon" />
              <p className="pages">My Projects</p>
              <div className="pro">PRO</div>
            </li>
            <li className="projects">
              <MdHome className="icon" />
              <p className="pages">Templates</p>
              <div className="pro">PRO</div>
            </li>

            <li className="projects" onClick={toggleOtherPagesDropdown}>
              <MdFileCopy className="icon" />
              <p className="pages">Other Pages</p> 
              <div className="pro">PRO</div>
            </li>
            {isOtherPagesOpen && (
              <ul className="dropdown">
                <li>Prompt Page</li>
                <li>Register</li>
                <li>Sign In</li>
              </ul>
            )}

            <li className="projects" onClick={toggleAdminPagesDropdown}>
              <IoMdLock className="icon" />
              <p className="pages">Admin Pages</p>
              <div className="pro">PRO</div>
            </li>
            {isAdminPagesOpen && (
              <ul className="dropdown">
                <li>All Templates</li>
                <li>New Template</li>
                <li>Edit Template</li>
                <li>Users Overview</li>
              </ul>
            )}
          </ul>
        </div>

        <div className="credits">
          <div className="circle">
            <img src="../assets/Vector.svg" alt="moon" />
          </div>
          <div className="text">
            <h3>Go unlimited with PRO</h3>
            <p>Get your AI Project to another <br /> level and start doing more with <br /> Horizon AI Template PRO!</p>
            <button>Get started with PRO</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
