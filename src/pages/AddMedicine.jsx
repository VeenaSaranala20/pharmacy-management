
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function AddMedicine() {
  const navigate = useNavigate();

  const [medicine, setMedicine] = useState({
    name: "",
    brand: "",
    category: "Pain Relief",
    description: "",
    price: "",
    quantity: "",
    image: "",
    expiryDate: ""
  });

  const handleChange = (e) => {
    setMedicine({
      ...medicine,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/medicines", {
        ...medicine,
        price: Number(medicine.price),
        quantity: Number(medicine.quantity)
      });

      alert("Medicine added successfully!");
      navigate("/medicines");
    } catch (error) {
      console.error(error);
      alert("Unable to add medicine.");
    }
  };

  return (
    <div className="form-container">
      <h1>Add New Medicine</h1>
      <p>Enter the medicine details below.</p>

      <form onSubmit={handleSubmit} className="medicine-form">
        <label>Medicine Name</label>
        <input name="name" value={medicine.name}
          onChange={handleChange} required />

        <label>Brand</label>
        <input name="brand" value={medicine.brand}
          onChange={handleChange} required />

        <label>Category</label>
        <select name="category" value={medicine.category}
          onChange={handleChange}>
          <option>Pain Relief</option>
          <option>Vitamins</option>
          <option>Allergy</option>
          <option>Digestive Health</option>
          <option>First Aid</option>
          <option>Other</option>
        </select>

        <label>Description</label>
        <textarea name="description" value={medicine.description}
          onChange={handleChange} required />

        <label>Price (₹)</label>
        <input type="number" name="price" min="0.01"
          step="0.01" value={medicine.price}
          onChange={handleChange} required />

        <label>Quantity</label>
        <input type="number" name="quantity" min="0"
          value={medicine.quantity}
          onChange={handleChange} required />

        <label>Image URL (Optional)</label>
        <input name="image" value={medicine.image}
          onChange={handleChange} />

        <label>Expiry Date</label>
        <input type="date" name="expiryDate"
          value={medicine.expiryDate}
          onChange={handleChange} required />

        <button type="submit" className="primary-btn">
          Save Medicine
        </button>
      </form>
    </div>
  );
}

export default AddMedicine;
