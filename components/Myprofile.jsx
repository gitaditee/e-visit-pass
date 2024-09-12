import "./MyProfile.css";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
function Myprofile(){

  
  const notifySuccess = () => toast.success("Applied Succesfully!");
  const notifyError = () => toast.error("Fill All Entries!");
  const [formData, setFormData] = useState({
    firstn: "",
    secondn: "",
    fathern: "",
    dob: "",
    gender: "",
    bloodgrup: "",
    mobileno: "",
    landline: "",
    email: "",
    password: "",
    address: "",
    city: "",
    state: ""
  });

  
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file") {
      setFormData({
        ...formData,
        [name]: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare JSON data
    const jsonData = JSON.stringify(formData);

    try {
        const response = await fetch("http://localhost:5000/home", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: jsonData
        });

        if (response.ok) {
          notifySuccess();
            console.log("Profile data received and stored successfully");

            // Optionally, reset the form
            setFormData({
                firstn: "",
                secondn: "",
                fathern: "",
                dob: "",
                gender: "",
                bloodgrup: "",
                mobileno: "",
                landline: "",
                email: "",
                password: "",
                address: "",
                city: "",
                state: ""
            });
        } else {
          notifyError();
            console.log("Error submitting data:", response.statusText);
        }
    } catch (error) {
        console.error("Error:", error);
    }
};


 
    return (
        <>
        <form onSubmit={handleSubmit}>
      <div className="submitform">
        <div className="row">
          <div className="col">
            <label htmlFor="firstn" className="form-label">First Name</label>
            <input
              type="text"
              className="form-control"
              name="firstn"
              value={formData.firstn}
              onChange={handleChange}
              placeholder="First name"
              aria-label="First name"
            />
          </div>
          <div className="col">
            <label htmlFor="secondn" className="form-label">Second Name</label>
            <input
              type="text"
              className="form-control"
              name="secondn"
              value={formData.secondn}
              onChange={handleChange}
              placeholder="Last name"
              aria-label="Last name"
            />
          </div>
          <div className="col">
            <label htmlFor="fathern" className="form-label">Father's Name</label>
            <input
              type="text"
              className="form-control"
              name="fathern"
              value={formData.fathern}
              onChange={handleChange}
              placeholder="Father's name"
              aria-label="Father's name"
            />
          </div>
          <div className="col">
            <label htmlFor="dob" className="form-label">Date Of Birth</label>
            <input
              type="date"
              className="form-control"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              placeholder="dd/mm/yyyy"
              aria-label="Date of birth"
            />
          </div>
        </div>
        <br />
        <br />
        <div className="row">
          <div className="col">
            <label htmlFor="gender" className="form-label">Gender</label>
            <select
              className="form-select"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              aria-label="Gender select"
            >
              <option value="" disabled selected>Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="NAN">NAN</option>
            </select>
          </div>
          <div className="col">
            <label htmlFor="bloodgrup" className="form-label">Blood Group</label>
            <input
              type="text"
              className="form-control"
              name="bloodgrup"
              value={formData.bloodgrup}
              onChange={handleChange}
              placeholder="Blood Group"
              aria-label="Blood group"
            />
          </div>
          <div className="col">
            <label htmlFor="mobile_number" className="form-label">Mobile Number</label>
            <input
              type="number"
              className="form-control"
              name="mobileno"
              value={formData.mobileno}
              onChange={handleChange}
              placeholder="Mobile Number"
              aria-label="Mobile number"
            />
          </div>
          <div className="col">
            <label htmlFor="landline" className="form-label">Landline No.</label>
            <input
              type="number"
              className="form-control"
              name="landline"
              value={formData.landline}
              onChange={handleChange}
              placeholder="Landline No."
              aria-label="Landline number"
            />
          </div>
        </div>
        <br />
        <br />
        <div className="row g-3">
          <div className="col-md-6">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              id="inputEmail4"
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              id="inputPassword4"
            />
          </div>
          <br />
          <br />
          <div className="col-12">
            <label htmlFor="address" className="form-label">Address</label>
            <input
              type="text"
              className="form-control"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="1234 Main St"
              id="inputAddress"
            />
          </div>
          <br />
          <br />
          <div className="col-md-4">
            <label htmlFor="city" className="form-label">City</label>
            <input
              type="text"
              className="form-control"
              name="city"
              value={formData.city}
              onChange={handleChange}
              id="inputCity"
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="state" className="form-label">State</label>
            <select
              className="form-select"
              name="state"
              value={formData.state}
              onChange={handleChange}
              id="inputState"
            >
              <option value="Rajasthan">Rajasthan</option>
              <option value="Bihar">Bihar</option>
              <option value="Jharkhand">Jharkhand</option>
            </select>
          </div>
          <div className="col-12">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="check_me_out"
                checked={formData.check_me_out}
                onChange={handleChange}
                id="gridCheck"
              />
              <label className="form-check-label" htmlFor="gridCheck">
                Check me out
              </label>
            </div>
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary">Update</button>
            <ToastContainer></ToastContainer>
          </div>
        </div>
      </div>
    </form>
        </>
    );
}
export default Myprofile;