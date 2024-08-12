import "./MyProfile.css";
import { useState } from "react";
function Myprofile(){

  const [formData, setFormData] = useState({
    first_name: "",
    second_name: "",
    father_name: "",
    date_of_birth: "",
    gender: "",
    blood_group: "",
    mobile_number: "",
    landline_number: "",
    email: "",
    password: "",
    address: "",
    city: "",
    state: "",
    photo: null,
    check_me_out: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "file") {
      setFormData({
        ...formData,
        [name]: e.target.files[0],
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

    const formDataToSend = new FormData();

    // Append each field to formDataToSend
    Object.keys(formData).forEach((key) => {
      if (key === "photo") {
        if (formData.photo) {
          formDataToSend.append("photo", formData.photo);
        }
      } else {
        formDataToSend.append(key, formData[key]);
      }
    });

    try {
      const response = await fetch("http://localhost:5000/api/profile", {
        method: "POST",
        body: formDataToSend,
      });
      if (response.ok) {
        console.log("Data submitted successfully");
        // Optionally, reset the form
        setFormData({
          first_name: "",
          second_name: "",
          father_name: "",
          date_of_birth: "",
          gender: "",
          blood_group: "",
          mobile_number: "",
          landline_number: "",
          email: "",
          password: "",
          address: "",
          city: "",
          state: "",
          photo: null,
          check_me_out: false,
        });
      } else {
        console.log("Error submitting data");
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
            <label htmlFor="first_name" className="form-label">First Name</label>
            <input
              type="text"
              className="form-control"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              placeholder="First name"
              aria-label="First name"
            />
          </div>
          <div className="col">
            <label htmlFor="second_name" className="form-label">Second Name</label>
            <input
              type="text"
              className="form-control"
              name="second_name"
              value={formData.second_name}
              onChange={handleChange}
              placeholder="Last name"
              aria-label="Last name"
            />
          </div>
          <div className="col">
            <label htmlFor="father_name" className="form-label">Father's Name</label>
            <input
              type="text"
              className="form-control"
              name="father_name"
              value={formData.father_name}
              onChange={handleChange}
              placeholder="Father's name"
              aria-label="Father's name"
            />
          </div>
          <div className="col">
            <label htmlFor="date_of_birth" className="form-label">Date Of Birth</label>
            <input
              type="date"
              className="form-control"
              name="date_of_birth"
              value={formData.date_of_birth}
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
            <label htmlFor="blood_group" className="form-label">Blood Group</label>
            <input
              type="text"
              className="form-control"
              name="blood_group"
              value={formData.blood_group}
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
              name="mobile_number"
              value={formData.mobile_number}
              onChange={handleChange}
              placeholder="Mobile Number"
              aria-label="Mobile number"
            />
          </div>
          <div className="col">
            <label htmlFor="landline_number" className="form-label">Landline No.</label>
            <input
              type="number"
              className="form-control"
              name="landline_number"
              value={formData.landline_number}
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
          </div>
        </div>
      </div>
    </form>
        </>
    );
}
export default Myprofile;