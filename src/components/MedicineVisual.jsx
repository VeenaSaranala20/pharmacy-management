
import { useEffect, useState } from "react";

const medicineStyles = [
  {
    keywords: ["paracetamol", "pain relief"],
    icon: "💊",
    label: "PAIN RELIEF",
    theme: "blue"
  },
  {
    keywords: ["vitamin"],
    icon: "🍊",
    label: "VITAMINS & WELLNESS",
    theme: "orange"
  },
  {
    keywords: ["cetirizine", "allergy"],
    icon: "🌿",
    label: "ALLERGY CARE",
    theme: "green"
  },
  {
    keywords: ["omeprazole", "digestive"],
    icon: "🫧",
    label: "DIGESTIVE HEALTH",
    theme: "purple"
  },
  {
    keywords: ["first aid", "antiseptic"],
    icon: "🧴",
    label: "FIRST AID",
    theme: "pink"
  }
];

const fallbackStyles = [
  { icon: "🩺", label: "HEALTHCARE", theme: "blue" },
  { icon: "🌼", label: "WELLNESS", theme: "orange" },
  { icon: "🧪", label: "MEDICAL CARE", theme: "green" },
  { icon: "🧴", label: "PERSONAL CARE", theme: "pink" },
  { icon: "💠", label: "HEALTH ESSENTIALS", theme: "purple" }
];

function MedicineVisual({ medicine, compact = false }) {
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    setImageFailed(false);
  }, [medicine.image]);

  const searchText =
    `${medicine.name} ${medicine.category}`.toLowerCase();

  const matched = medicineStyles.find(item =>
    item.keywords.some(keyword =>
      searchText.includes(keyword)
    )
  );

  const hash = String(medicine.id)
    .split("")
    .reduce((sum, char) => sum + char.charCodeAt(0), 0);

  const visual =
    matched || fallbackStyles[hash % fallbackStyles.length];

  const showImage = Boolean(medicine.image) && !imageFailed;

  return (
    <div
      className={`pm-visual pm-${visual.theme} ${
        compact ? "pm-visual-compact" : ""
      }`}
    >
      {showImage ? (
        <img
          src={medicine.image}
          alt={medicine.name}
          onError={() => setImageFailed(true)}
          className="pm-real-image"
        />
      ) : (
        <>
          <div className="pm-art-circle pm-circle-one" />
          <div className="pm-art-circle pm-circle-two" />

          <div className="pm-product-art">
            <span className="pm-art-symbol">
              {visual.icon}
            </span>
          </div>

          {!compact && (
            <>
              <span className="pm-art-label">
                {visual.label}
              </span>

              <span className="pm-art-brand">
                {medicine.brand}
              </span>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default MedicineVisual;
