import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Sidebar.css";

const Sidebar = ({ children }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("otp");
    navigate("/");
  };
  return (
    <div className="row w-100" style={{ height: "100vh" }}>
      <div className="sidebar col-1 bg-dark text-white p-3">
        <ul className="list-unstyled" style={{textAlign:"center"}}>
          <li className="py-2 px-3 hover-effect">Home</li>
          <li className="py-2 px-3 hover-effect">Settings</li>
          <button className="btn btn-danger my-2" onClick={handleLogout}>
          Logout
        </button>
        </ul>
      </div>
      <div className="main-content col-11 bg-light mb-5 p-2">{children}</div>
    </div>
  );
};

export default Sidebar; 
