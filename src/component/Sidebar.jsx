import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Sidebar.css"; // Custom CSS for additional styling

const Sidebar = ({ children }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("otp");
    navigate("/");
  };
  return (
    <div className="row w-100" style={{ height: "100vh" }}>
      <div className="sidebar col-3 bg-dark text-white p-3">
        {/* <h4 className="text-center mb-4">Dashboard</h4> */}
        <ul className="list-unstyled">
          <li className="py-2 px-3 hover-effect">Home</li>
          {/* <li className="py-2 px-3 hover-effect">Services</li> */}
          <li className="py-2 px-3 hover-effect">Settings</li>
          {/* <li className="py-2 px-3 hover-effect">Loans</li> */}
          <button className="btn btn-danger my-2" onClick={handleLogout}>
          Logout
        </button>
        </ul>
      </div>
      <div className="main-content col-9 bg-light mb-5 p-2">{children}</div>
    </div>
  );
};

export default Sidebar;
