
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./MedicineCard.css";

import {
  addFavorite,
  removeFavorite
} from "../features/favoriteSlice";

import MedicineVisual from "./MedicineVisual";

function MedicineCard({ medicine, onDelete }) {
  const dispatch = useDispatch();

  const favorites = useSelector(
    state => state.favorites || []
  );

  const isFavorite = favorites.some(
    item => String(item.id) === String(medicine.id)
  );

  const quantity = Number(medicine.quantity) || 0;
  const price = Number(medicine.price) || 0;

  // Stock status
  const stockStatus =
    quantity === 0
      ? "Out of Stock"
      : quantity <= 10
      ? "Low Stock"
      : "In Stock";

  const stockClass =
    quantity === 0
      ? "pm-stock-out"
      : quantity <= 10
      ? "pm-stock-low"
      : "pm-stock-good";

  // Toggle Favorites
  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite(medicine.id));
    } else {
      dispatch(addFavorite(medicine));
    }
  };

  // Delete Medicine
  const handleDelete = () => {
    if (
      window.confirm(
        `Are you sure you want to delete ${medicine.name}?`
      )
    ) {
      onDelete?.(medicine.id);
    }
  };

  return (
    <article className="pm-card">

      {/* Medicine Image Section */}

      <div className="pm-card-image">

        <MedicineVisual medicine={medicine} />

        {/* Stock Status */}

        <span className={`pm-stock-badge ${stockClass}`}>
          <span className="pm-status-dot" />
          {stockStatus}
        </span>

        {/* Favorite Heart */}

        <button
          type="button"
          className={`pm-heart ${
            isFavorite ? "pm-heart-active" : ""
          }`}
          onClick={toggleFavorite}
          aria-label={
            isFavorite
              ? "Remove from favorites"
              : "Add to favorites"
          }
          title={
            isFavorite
              ? "Remove from Favorites"
              : "Add to Favorites"
          }
        >
          {isFavorite ? "♥" : "♡"}
        </button>

      </div>

      {/* Medicine Information */}

      <div className="pm-card-body">

        <span className="pm-category">
          {medicine.category || "General Medicine"}
        </span>

        <h3>{medicine.name}</h3>

        <p className="pm-brand">
          {medicine.brand || "Unknown Brand"}
        </p>

        <p className="pm-description">
          {medicine.description || "Healthcare essential"}
        </p>

        {/* Price and Quantity */}

        <div className="pm-card-info">

          <div>
            <span>Medicine Price</span>

            <strong className="pm-price">
              ₹{price.toLocaleString("en-IN")}
            </strong>
          </div>

          <div>
            <span>Available Stock</span>

            <strong>{quantity} Units</strong>
          </div>

        </div>

        {/* Action Buttons */}

        <div className="pm-card-actions">

          <Link
            to={`/medicine/${medicine.id}`}
            className="pm-view-btn"
          >
            View Details
          </Link>

          <Link
            to={`/edit-medicine/${medicine.id}`}
            className="pm-edit-btn"
          >
            Edit
          </Link>

          <button
            type="button"
            className="pm-delete-btn"
            onClick={handleDelete}
          >
            Delete
          </button>

        </div>

        {/* Favorite Action */}

        <button
          type="button"
          className={`pm-favorite-action ${
            isFavorite ? "pm-is-saved" : ""
          }`}
          onClick={toggleFavorite}
        >
          {isFavorite
            ? "♥ Added to Favorites"
            : "♡ Add to Favorites"}
        </button>

      </div>

    </article>
  );
}

export default MedicineCard;
