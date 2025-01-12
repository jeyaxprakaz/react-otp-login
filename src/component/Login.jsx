import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Header";
import Footer from "./Footer";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [timer, setTimer] = useState(30);
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!email) {
      alert("Please enter an email address.");
      return;
    }

    // OTP Generation
    const randomOtp = Math.floor(1000 + Math.random() * 9000);
    const otpExpiry = Date.now() + 30 * 1000; // otp expiry time

    // Store OTP and expiry in localStorage
    localStorage.setItem("otp", randomOtp);
    localStorage.setItem("otpExpiry", otpExpiry);

    alert(`Your OTP is: ${randomOtp}`);
    setTimer(30);

    // OTP timer
    const countdown = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(countdown);
        }
        return prevTimer - 1;
      });
    }, 1000);

    // Redirect to OTP page
    navigate("/otp");
  };

  return (
    <div style={{backgroundColor:"#249DA1",maxWidth:"100%"}}>
      <Header />
      {/* <h2>Login</h2> */}
      {/* <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div> */}
      {/* <button className="btn btn-primary mt-3" onClick={handleLogin}>
        Send OTP
      </button> */}
      <div className="row justify-content-center align-items-center py-5 my-5" style={{maxWidth:"100%"}}>
        <div className="col-md-4 d-flex flex-column justify-content-center align-items-center px-5" style={{minHeight:"350px", border:"3px solid #43757A",borderRadius:"20px 0px 0px 20px",backgroundColor:"#255E68"}}>
          <h4 className="text-dark my-4">Sign In</h4>
          <form style={{textAlign:"center"}} onSubmit={handleLogin}>
            <div className="my-2">
              <input
                className="w-100 ps-4"
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-mail"
                style={{ marginLeft: "10px", padding: "10px",borderRadius:"5px" }}
              />
            </div>

            <button
              className="btn btn-success px-5 py-2 rounded-pill"
              type="submit"
              style={{ marginTop: "10px" }}
            >
              {"Send Otp"}
            </button>
            {/* {errorMessage && (
              <p style={{ color: "red", marginTop: "10px" }}>{errorMessage}</p>
            )} */}
          </form>
        </div>
        <div className="col-md-4 d-flex align-items-center" style={{minHeight:"350px",border:"3px solid #43757A",borderRadius:"0px 20px 20px 0px",backgroundColor:"#2D756F"}}>
          <h5>Web Application With Analytical Dashboard</h5>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;

