
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function EditMedicine() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [medicine, setMedicine] = useState(null);

  useEffect(() => {
    const fetchMedicine = async () => {
      try {
        const response = await api.get(`/medicines/${id}`);
        setMedicine(response.data);
      } catch (error) {
        console.error(error);
        alert("Medicine not found.");
        navigate("/medicines");
      }
    };

    fetchMedicine();
  }, [id, navigate]);

  const handleChange = (e) => {
    setMedicine({
      ...medicine,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/medicines/${id}`, {
        ...medicine,
        price: Number(medicine.price),
        quantity: Number(medicine.quantity)
      });

      alert("Medicine updated successfully!");
      navigate("/medicines");
    } catch (error) {
      console.error(error);
      alert("Unable to update medicine.");
    }
  };

  if (!medicine) return <p>Loading medicine...</p>;

  return (
    <div className="form-container">
      <h1>Edit Medicine</h1>
      <p>Update your medicine information.</p>

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
          {["Pain Relief", "Vitamins", "Allergy",
            "Digestive Health", "First Aid", "Other"].map(
            category => (
              <option key={category}>{category}</option>
            )
          )}
        </select>

        <label>Description</label>
        <textarea name="description"
          value={medicine.description}
          onChange={handleChange} required />

        <label>Price (₹)</label>
        <input type="number" name="price" min="0.01"
          step="0.01" value={medicine.price}
          onChange={handleChange} required />

        <label>Quantity</label>
        <input type="number" name="quantity" min="0"
          value={medicine.quantity}
          onChange={handleChange} required />

        <label>Image URL</label>
        <input name="image" value={medicine.image || ""}
          onChange={handleChange} />

        <label>Expiry Date</label>
        <input type="date" name="expiryDate"
          value={medicine.expiryDate}
          onChange={handleChange} required />

        <button type="submit" className="primary-btn">
          Update Medicine
        </button>
      </form>
    </div>
  );
}

export default EditMedicine;
