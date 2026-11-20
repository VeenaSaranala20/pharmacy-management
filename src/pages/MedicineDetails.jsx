
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";

function MedicineDetails() {
  const { id } = useParams();
  const [medicine, setMedicine] = useState(null);

  useEffect(() => {
    api.get(`/medicines/${id}`)
      .then(response => setMedicine(response.data))
      .catch(error => console.error(error));
  }, [id]);

  if (!medicine) return <p>Loading medicine details...</p>;

  return (
    <div className="details-container">
      <div className="details-image">
        {medicine.image ? (
          <img src={medicine.image} alt={medicine.name} />
        ) : (
          <span>💊</span>
        )}
      </div>

      <div className="details-info">
        <span className="category-tag">{medicine.category}</span>
        <h1>{medicine.name}</h1>
        <h3>{medicine.brand}</h3>
        <p>{medicine.description}</p>

        <h2>₹{medicine.price}</h2>
        <p>Available Quantity: {medicine.quantity}</p>
        <p>Expiry Date: {medicine.expiryDate}</p>

        <Link to={`/edit-medicine/${medicine.id}`}
          className="primary-btn">
          Edit Medicine
        </Link>

        <Link to="/medicines" className="back-link">
          Back to Medicines
        </Link>
      </div>
    </div>
  );
}

export default MedicineDetails;
