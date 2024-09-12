import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
function Applypass() {
  const [formData, setFormData] = useState({
    firstn: "",
    lastn: "",
    employeename: "",
    city: "",
    state: "",
    email: "",
    dateofvisit:"",
    timeofvisit:"",
    purpose:""
  });
  
  
  const notifySuccess = () => toast.success("Applied Succesfully!");
  const notifyError = () => toast.error("Fill All Entries!");
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

 const submitdata=async(e)=>{
  e.preventDefault();
  const jsonData = JSON.stringify(formData);

  try {
      const response = await fetch("http://localhost:5000/apply_pass", {
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
            lastn: "",
            employeename: "",
            city: "",
            state: "",
            email: "",
            dateofvisit:"",
            timeofvisit:"",
            purpose:""
          });
      } else {
        notifyError();
          console.log("Error submitting data:", response.statusText);
      }
  } catch (error) {
      console.error("Error:", error);
  }
 }
  return (
    <>
      <form class="row g-3" novalidate onSubmit={submitdata}>
      <div className="col-md-4 position-relative">
          <label className="form-label">First name</label>
          <input
            type="text"
            className="form-control"
            name="firstn"
            placeholder="Mark"
            value={formData.firstn}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-4 position-relative">
          <label className="form-label">Last name</label>
          <input
            type="text"
            className="form-control"
            name="lastn"
            placeholder="Otto"
            value={formData.lastn}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
        </div>

        <div className="col-md-4 position-relative">
          <label className="form-label">Employee Name</label>
          <input
            type="text"
            className="form-control"
            name="employeename"
            value={formData.employeename}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6 position-relative">
          <label className="form-label">City</label>
          <input
            type="text"
            className="form-control"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-3 position-relative">
          <label className="form-label">State</label>
          <select
            className="form-select"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Choose...
            </option>
            <option value="Rajasthan">Rajasthan</option>
            <option value="Bihar">Bihar</option>
            <option value="Jharkhand">Jharkhand</option>
          </select>
        </div>

        <div className="col mb-3">
  <label className="form-label">Date of Visit</label>
  <input
    type="date"
    className="form-control"
    name="dateofvisit"
    value={formData.dateofvisit}
    onChange={handleChange}
    required
  />
</div>

<div className="col mb-3">
  <label className="form-label">Time of Visit</label>
  <select
    className="form-select"
    name="timeofvisit"
    value={formData.timeofvisit}
    onChange={handleChange}
    required
  >
    <option value="" disabled>
      Time Of Visit
    </option>
    <option >12:00 pm</option>
    <option >1:00 pm</option>
    <option >2:00 pm</option>
    <option >3:00 pm</option>
  </select>
</div>


        <div className="mb-3">
          <label className="form-label">Purpose of Meeting</label>
          <textarea
            className="form-control"
            name="purpose"
            rows="3"
            value={formData.purpose}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-12">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="termsCheckbox"
              name="terms"
              onChange={handleChange}
              required
            />
            <label className="form-check-label" htmlFor="termsCheckbox">
              Agree to terms and conditions
            </label>
          </div>
        </div>

        <div className="col-12">
          <button className="btn btn-primary" type="submit">
            Submit form
          </button>
          <ToastContainer />
        </div>
       
      </form>
      </>
  )
}

export default Applypass;
