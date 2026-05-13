import React, { useState, useEffect } from "react";

function LocationPrompt() {
  const [showPopup, setShowPopup] = useState(false);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    // Only show popup if user hasn't decided before
    const decision = localStorage.getItem("locationDecision");
    if (!decision) {
      setShowPopup(true);
    }
  }, []);

  const handleAllow = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocation({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
          localStorage.setItem("locationDecision", "allowed");
          setShowPopup(false);
        },
        (err) => {
          console.error("Error getting location:", err);
          localStorage.setItem("locationDecision", "denied");
          setShowPopup(false);
        }
      );
    }
  };

  const handleDeny = () => {
    localStorage.setItem("locationDecision", "denied");
    setShowPopup(false);
  };

  return (
    <>
      {showPopup && (
        <div style={popupStyle}>
          <p>Can we access your location to enable ease of delivery?</p>
          <button className="btn btn-warning me-2" onClick={handleAllow}>Allow</button>
          <button className="btn btn-danger" onClick={handleDeny}>Deny</button>
        </div>
      )}
      {location && (
        <p>
          Your location: Latitude {location.lat}, Longitude {location.lng}
        </p>
      )}
    </>
  );
}

const popupStyle = {
  position: "fixed",
  top: "30%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  background: "#0f0f0fff",
  padding: "20px",
  border: "1px solid #f8c316ff",
  borderRadius: "8px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
  zIndex: 9999,
};

export default LocationPrompt;
