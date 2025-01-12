// import Login from "./component/Login";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import "./App.css";
// import Dashboard from "./component/Dashboard";
// import Otppage from "./component/Otppage";
// // import 'bootstrap/dist/css/bootstrap.min.css';


// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/otp-page" element={<Otppage />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./component/Login";
import Otppage from "./component/Otppage";
import Dashboard from "./component/Dashboard";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/otp" element={<Otppage />} />
        <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
    </Router>
  );
}

export default App;
