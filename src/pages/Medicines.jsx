
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../services/api";
import MedicineCard from "../components/MedicineCard";

function Medicines() {
  const [medicines, setMedicines] = useState([]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState("All");
  const [sort, setSort] = useState("default");

  const fetchMedicines = async () => {
    try {
      const response = await api.get("/medicines");
      setMedicines(response.data);
    } catch (error) {
      console.error("Error fetching medicines:", error);
    }
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  const deleteMedicine = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this medicine?"
    );

    if (confirmDelete) {
      try {
        await api.delete(`/medicines/${id}`);
        await fetchMedicines();
        alert("Medicine deleted successfully!");
      } catch (error) {
        console.error(error);
        alert("Unable to delete medicine.");
      }
    }
  };

  // Search by medicine name and brand
  let filteredMedicines = medicines.filter((medicine) => {
    const searchMatch =
      medicine.name.toLowerCase().includes(search.toLowerCase()) ||
      medicine.brand.toLowerCase().includes(search.toLowerCase());

    return searchMatch;
  });

  // Category filter
  if (category !== "All") {
    filteredMedicines = filteredMedicines.filter(
      medicine => medicine.category === category
    );
  }

  // Price filter
  if (maxPrice !== "All") {
    filteredMedicines = filteredMedicines.filter(
      medicine => medicine.price <= Number(maxPrice)
    );
  }

  // Sorting
  if (sort === "low-high") {
    filteredMedicines.sort(
      (a, b) => a.price - b.price
    );
  }

  if (sort === "high-low") {
    filteredMedicines.sort(
      (a, b) => b.price - a.price
    );
  }

  if (sort === "name") {
    filteredMedicines.sort(
      (a, b) => a.name.localeCompare(b.name)
    );
  }

  const resetFilters = () => {
    setSearch("");
    setCategory("All");
    setMaxPrice("All");
    setSort("default");
  };

  return (
    <div className="page-container">

      <div className="page-heading">
        <div>
          <h1>Medicine Inventory</h1>
          <p>Search, filter and manage your medicines.</p>
        </div>

        <Link to="/add-medicine" className="primary-btn">
          + Add Medicine
        </Link>
      </div>

      {/* Search and Filters */}

      <div className="filter-container">

        <div className="search-box">
          <span>🔍</span>

          <input
            type="text"
            placeholder="Search medicine name or brand..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="Pain Relief">Pain Relief</option>
          <option value="Vitamins">Vitamins</option>
          <option value="Allergy">Allergy</option>
          <option value="Digestive Health">Digestive Health</option>
          <option value="First Aid">First Aid</option>
          <option value="Other">Other</option>
        </select>

        <select
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        >
          <option value="All">All Prices</option>
          <option value="50">Under ₹50</option>
          <option value="100">Under ₹100</option>
          <option value="200">Under ₹200</option>
          <option value="500">Under ₹500</option>
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="default">Sort By</option>
          <option value="low-high">Price: Low to High</option>
          <option value="high-low">Price: High to Low</option>
          <option value="name">Name: A to Z</option>
        </select>

        <button
          className="reset-btn"
          onClick={resetFilters}
        >
          Reset
        </button>

      </div>

      {/* Results */}

      <div className="results-heading">
        <h3>Available Medicines</h3>

        <span>
          {filteredMedicines.length} medicines found
        </span>
      </div>

      <div className="medicine-grid">

        {filteredMedicines.map((medicine) => (
          <MedicineCard
            key={medicine.id}
            medicine={medicine}
            onDelete={deleteMedicine}
          />
        ))}

      </div>

      {filteredMedicines.length === 0 && (
        <div className="empty-state">
          <h2>No Medicines Found</h2>
          <p>Try changing your search or filters.</p>

          <button
            className="primary-btn"
            onClick={resetFilters}
          >
            Clear Filters
          </button>
        </div>
      )}

    </div>
  );
}

export default Medicines;
