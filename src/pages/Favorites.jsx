
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { removeFavorite } from "../features/favoriteSlice";
import MedicineVisual from "../components/MedicineVisual";

function Favorites() {
  const dispatch = useDispatch();

  const favorites = useSelector(
    state => state.favorites
  );

  const handleRemove = (id) => {
    dispatch(removeFavorite(id));
  };

  return (
    <div className="favorites-page">

      {/* Hero Section */}

      <section className="favorites-hero">

        <div className="hero-content">

          <span className="hero-eyebrow">
            ✦ YOUR PERSONAL HEALTH COLLECTION
          </span>

          <h1>
            Your Favorite
            <br />
            <span>Medicines.</span>
          </h1>

          <p>
            Keep your preferred healthcare essentials
            organized and easily accessible.
          </p>

          <Link to="/medicines" className="hero-action">
            Explore Medicines
            <span>→</span>
          </Link>

        </div>

        <div className="hero-illustration">
          <div className="hero-glass-circle">
            <span>💊</span>
          </div>

          <span className="floating-icon icon-one">✚</span>
          <span className="floating-icon icon-two">♥</span>
          <span className="floating-icon icon-three">✦</span>
        </div>

        <div className="hero-counter">
          <span>YOUR COLLECTION</span>
          <strong>{favorites.length}</strong>
          <p>Saved medicines</p>
        </div>

      </section>

      {/* Page Heading */}

      <section className="favorites-heading">

        <div>
          <span className="section-eyebrow">
            PERSONAL COLLECTION
          </span>

          <h2>Saved Medicines</h2>

          <p>
            Your selected medicines, all in one place.
          </p>
        </div>

        <div className="collection-badge">
          ♥ {favorites.length} Items
        </div>

      </section>

      {/* Favorites List */}

      {favorites.length === 0 ? (

        <div className="favorites-empty">

          <div className="empty-illustration">
            <span>♡</span>
            <i>✦</i>
          </div>

          <h2>Your collection is waiting!</h2>

          <p>
            You haven't saved any medicines yet.
            Explore your inventory and add your favorites.
          </p>

          <Link to="/medicines" className="empty-action">
            Browse Medicines →
          </Link>

        </div>

      ) : (

        <div className="favorites-grid">

          {favorites.map((medicine, index) => (

            <article
              className="favorite-card"
              key={medicine.id}
              style={{ "--card-index": index }}
            >

              {/* Medicine Image */}

              <div className="favorite-image-wrapper">

                <MedicineVisual medicine={medicine} />

                <span className="saved-label">
                  ♥ SAVED
                </span>

              </div>

              {/* Medicine Information */}

              <div className="favorite-card-content">

                <div className="favorite-card-category">
                  {medicine.category}
                </div>

                <h3>{medicine.name}</h3>

                <p className="favorite-brand">
                  {medicine.brand}
                </p>

                <div className="favorite-details">

                  <div>
                    <span>Price</span>
                    <strong>₹{medicine.price}</strong>
                  </div>

                  <div>
                    <span>Available Stock</span>
                    <strong>{medicine.quantity} Units</strong>
                  </div>

                </div>

                <div className="favorite-card-actions">

                  <Link
                    to={`/medicine/${medicine.id}`}
                    className="view-medicine-btn"
                  >
                    View Details →
                  </Link>

                  <button
                    className="remove-favorite-btn"
                    onClick={() => handleRemove(medicine.id)}
                    title="Remove from favorites"
                    aria-label={`Remove ${medicine.name} from favorites`}
                  >
                    ♥
                  </button>

                </div>

              </div>

            </article>

          ))}

        </div>

      )}

      {/* Bottom Information */}

      {favorites.length > 0 && (

        <div className="favorites-footer">

          <span>✦</span>

          <p>
            You have {favorites.length} medicine
            {favorites.length !== 1 ? "s" : ""} in your personal collection.
          </p>

          <Link to="/medicines">
            Discover More →
          </Link>

        </div>

      )}

    </div>
  );
}

export default Favorites;
