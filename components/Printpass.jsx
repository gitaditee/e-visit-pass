import QRCode from "react-qr-code";
import { useState,useEffect } from "react";
import axios from "axios";
function Printpass(){
  const [email, setEmail] = useState('');
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  // Handle input change
  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  // Fetch user data from server
  const fetchUserData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/get_pass/${email}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = response.data;
      console.log('Data received:', data); // For debugging

      if (data.success) {
        setUserData(data.data[0]); // Assuming the first result is the relevant one
        setError(null);
      } else {
        setError(data.message);
        setUserData(null);
      }
    } catch (err) {
      console.log('Error response:', err.response); // For debugging
      setError('Error fetching data from server');
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Format as 'MM/DD/YYYY'
  };

  return (
    <>
      <h1 style={{ color: "white" }}>Gate Pass Print</h1>

      <div className="col mb-5 w-50 mb-5">
        <label className="form-label">User Email</label>
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={handleInputChange}
          placeholder="Enter your email"
        />
        <button className="btn btn-primary mt-2" onClick={fetchUserData}>
          Fetch Details
        </button>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {userData && (
        <div className="card mb-3 col mb-5 w-50 mb-5 mt-5 border border-secondary border-4 rounded shadow-lg p-3 mb-5 bg-body-tertiary rounded" style={{ maxWidth: "540px", marginLeft: "250px" }}>
          <div className="row g-0">
            <div className="col-md-4">
              <img src="./public/images/user.png" className="img-fluid rounded-start ms-5 mt-3" alt="User" />
              <div className="row g-0" style={{ height: "auto", margin: "0 auto", maxWidth: 64, width: "100%" }}>
                <QRCode
                  size={256}
                  bgColor="white"
                  fgColor="black"
                  value={`User Details: ${email}`}
                  className="mt-3"
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                />
              </div>
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">E-Visitor Pass</h5>
                <p className="card-text">Name: {userData.firstn} {userData.lastn}</p>
                <p className="card-text">Contact Person: {userData.employeename}</p>
                <p className="card-text">Time: {userData.timeofvisit}</p>
                <p className="card-text">Date: {formatDate(userData.dateofvisit)}</p>
                <p className="card-text"><small className="text-body-secondary">Last updated just now</small></p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
    

  
  }
 export default Printpass;