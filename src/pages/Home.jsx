
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../services/api";

import MedicineVisual from "../components/MedicineVisual";
import "../components/MedicineCard.css";

function Home() {
  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    try {
      const response = await api.get("/medicines");
      setMedicines(response.data);
    } catch (error) {
      console.error("Error fetching medicines:", error);
    }
  };

  const totalMedicines = medicines.length;

  const inStock = medicines.filter(
    medicine => Number(medicine.quantity) > 10
  ).length;

  const lowStock = medicines.filter(
    medicine =>
      Number(medicine.quantity) > 0 &&
      Number(medicine.quantity) <= 10
  ).length;

  const outOfStock = medicines.filter(
    medicine => Number(medicine.quantity) === 0
  ).length;

  const recentMedicines = [...medicines]
    .reverse()
    .slice(0, 3);

  return (
    <div className="dashboard">

      {/* Welcome Section */}

      <section className="welcome-section">

        <div className="welcome-content">

          <p className="welcome-tag">
            HEALTHCARE MANAGEMENT
          </p>

          <h1>Welcome to MediCare Pharmacy</h1>

          <p>
            Manage your medicines easily with your smart
            pharmacy management system.
          </p>

          <Link to="/medicines" className="primary-btn">
            Explore Medicines →
          </Link>

        </div>

        <div className="welcome-icon">
          ✚
        </div>

      </section>

      {/* Dashboard Statistics */}

      <h2 className="section-title">
        Dashboard Overview
      </h2>

      <div className="stats-grid">

        <div className="stat-card blue">
          <span>💊</span>
          <h2>{totalMedicines}</h2>
          <p>Total Medicines</p>
        </div>

        <div className="stat-card green">
          <span>📦</span>
          <h2>{inStock}</h2>
          <p>In Stock</p>
        </div>

        <div className="stat-card orange">
          <span>⚠️</span>
          <h2>{lowStock}</h2>
          <p>Low Stock</p>
        </div>

        <div className="stat-card red">
          <span>❌</span>
          <h2>{outOfStock}</h2>
          <p>Out of Stock</p>
        </div>

      </div>

      {/* Manage Pharmacy */}

      <div className="dashboard-bottom">

        <div>
          <h2>Manage Your Pharmacy</h2>

          <p>
            Add new medicines, update existing records
            and monitor your inventory.
          </p>
        </div>

        <Link to="/add-medicine" className="primary-btn">
          + Add Medicine
        </Link>

      </div>

      {/* Recently Added Medicines */}

      <div className="recent-heading">

        <div>
          <h2 className="section-title">
            Recently Added Medicines
          </h2>

          <p>
            Quick overview of your latest medicine records.
          </p>
        </div>

        <Link to="/medicines" className="view-all-link">
          View All →
        </Link>

      </div>

      <div className="recent-list">

        {recentMedicines.map(medicine => (

          <Link
            to={`/medicine/${medicine.id}`}
            className="recent-item"
            key={medicine.id}
          >

            {/* Different Medicine Visual */}

            <div className="pm-recent-image">

              <MedicineVisual
                medicine={medicine}
                compact
              />

            </div>

            {/* Medicine Information */}

            <div className="recent-medicine-info">

              <h3>{medicine.name}</h3>

              <p>
                {medicine.brand} · {medicine.category}
              </p>

            </div>

            <div className="recent-price">
              ₹{medicine.price}
            </div>

            <span className="recent-arrow">
              →
            </span>

          </Link>

        ))}

        {medicines.length === 0 && (

          <div className="recent-empty">
            <span>💊</span>

            <h3>No Medicines Added Yet</h3>

            <p>
              Start managing your pharmacy by adding
              your first medicine.
            </p>

            <Link
              to="/add-medicine"
              className="primary-btn"
            >
              + Add Your First Medicine
            </Link>

          </div>

        )}

      </div>

    </div>
  );
}

export default Home;
