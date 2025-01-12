// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import Header from "./Header";
// import Footer from "./Footer";

// const Otppage = () => {
//   const [email, setEmail] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [otp, setOtp] = useState("");
//   const [generatedOtp, setGeneratedOtp] = useState(null);
//   const [isOtpFieldVisible, setIsOtpFieldVisible] = useState(false);
//   const [isResendVisible, setIsResendVisible] = useState(false);
//   const [timer, setTimer] = useState(30);
//   const navigate = useNavigate(); // For navigation

//   const handleOtpChange = (e) => {
//     setOtp(e.target.value);
//   };

//   const verifyOtp = (e) => {
//     e.preventDefault();
//     const storedOtp = localStorage.getItem("otp");
//     if (otp === storedOtp) {
//       alert("OTP verified successfully!");
//       navigate("/dashboard");
//     } else {
//       alert("Invalid OTP. Please try again.");
//     }
//   };

//   const resendOtp = () => {
//     // sendOtp();
//     const randomOtp = Math.floor(1000 + Math.random() * 9000);
//     setGeneratedOtp(randomOtp);
//     localStorage.setItem("otp", randomOtp);
//     alert(`Your OTP is: ${randomOtp}`);
//     setIsOtpFieldVisible(true);
//     setIsResendVisible(false);
//     setTimer(30);

//     // Start the OTP timer
//     const countdown = setInterval(() => {
//       setTimer((prevTimer) => {
//         if (prevTimer <= 1) {
//           clearInterval(countdown);
//           setIsResendVisible(true);
//         }
//         return prevTimer - 1;
//       });
//     }, 1000);
//   };


//   return (
//     <div style={{backgroundColor:"#249DA1",maxWidth:"100%"}}>
//       <Header />
//       <div className="row justify-content-center align-items-center" style={{maxWidth:"100%"}}>
//         <div className="col-md-4 d-flex flex-column justify-content-center px-5" style={{minHeight:"350px", border:"3px solid #43757A",borderRadius:"20px 0px 0px 20px",backgroundColor:"#255E68"}}>
//           <h4 className="text-dark my-4">Sign In</h4>
//           <form onSubmit={verifyOtp}>
//               <div>
//                 <label htmlFor="otp">Enter OTP:</label>
//                 <input
//                   type="text"
//                   id="otp"
//                   value={otp}
//                   onChange={handleOtpChange}
//                   placeholder="Enter the OTP"
//                   style={{ marginLeft: "10px", padding: "5px" }}
//                 />
//                 <p style={{ marginTop: "10px" }}>
//                   {isResendVisible
//                     ? "OTP expired. Please resend the OTP."
//                     : `OTP valid for ${timer} seconds.`}
//                 </p>
//               </div>
//             <button
//               className="btn btn-success px-5 py-2 rounded-pill"
//               type="submit"
//               style={{ marginTop: "10px" }}
//             >
//               Validate 
//             </button>
            // {isOtpFieldVisible && isResendVisible && (
            //   <button
            //     type="button"
            //     onClick={resendOtp}
            //     style={{ marginTop: "10px", marginLeft: "10px" }}
            //   >
            //     Resend OTP
            //   </button>
            // )}
//             {errorMessage && (
//               <p style={{ color: "red", marginTop: "10px" }}>{errorMessage}</p>
//             )}
//           </form>
//         </div>
//         <div className="col-md-4 d-flex align-items-center" style={{minHeight:"350px",border:"3px solid #43757A",borderRadius:"0px 20px 20px 0px",backgroundColor:"#2D756F"}}>
//           <h5>Web Application With Analytical Dashboard</h5>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default Otppage;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const OtpPage = () => {
  const [otp, setOtp] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [timer, setTimer] = useState(30);
  const navigate = useNavigate();
  const [isResendVisible, setIsResendVisible] = useState(false);

  useEffect(() => {
    // Start the timer on page load
    const otpExpiry = localStorage.getItem("otpExpiry");
    const timeLeft = Math.max(0, Math.floor((otpExpiry - Date.now()) / 1000));

    setTimer(timeLeft);

    const countdown = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(countdown);
          setIsResendVisible(true);
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const verifyOtp = (e) => {
    e.preventDefault();
    const storedOtp = localStorage.getItem("otp");
    const otpExpiry = localStorage.getItem("otpExpiry");

    if (!storedOtp || Date.now() > otpExpiry) {
      setErrorMessage("OTP has expired. Please go back and resend the OTP.");
      return;
    }

    if (otp === storedOtp) {
      alert("OTP verified successfully!");
      navigate("/dashboard");
    } else {
      setErrorMessage("Invalid OTP. Please try again.");
    }
  };

  const resendOtp = () => {
    const randomOtp = Math.floor(1000 + Math.random() * 9000);
    const otpExpiry = Date.now() + 30 * 1000; // 30 seconds validity

    // Store OTP and expiry in localStorage
    localStorage.setItem("otp", randomOtp);
    localStorage.setItem("otpExpiry", otpExpiry);

    alert(`Your OTP is: ${randomOtp}`);
    setTimer(30);

    // Start the timer
    const countdown = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(countdown);
        }
        return prevTimer - 1;
      });
    }, 1000);
  };

  return (
    <div className="container">
      <h2>OTP Verification</h2>
      <form onSubmit={verifyOtp}>
        <div className="form-group">
          <label htmlFor="otp">Enter OTP:</label>
          <input
            type="text"
            id="otp"
            className="form-control"
            value={otp}
            onChange={handleOtpChange}
          />
          <p className="mt-2">
            {timer > 0
              ? `OTP valid for ${timer} seconds.`
              : "OTP expired. Please resend the OTP."}
          </p>
          { isResendVisible && (
              <button
                type="button"
                onClick={resendOtp}
                style={{ marginTop: "10px", marginLeft: "10px" }}
              >
                Resend OTP
              </button>
            )}
        </div>
        <button
          className="btn btn-success mt-3"
          type="submit"
          disabled={timer <= 0}
        >
          Verify OTP
        </button>
        {errorMessage && <p className="text-danger mt-2">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default OtpPage;
