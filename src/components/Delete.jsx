import React, { useState } from "react";

const DeleteProduct = ({ productId, onDeleteSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        onDeleteSuccess(productId); // callback to update UI
      } else {
        const data = await response.json();
        setError(data.message || "Failed to delete product");
      }
    } catch (err) {
      setError("Error deleting product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleDelete} disabled={loading}>
        {loading ? "Deleting..." : "Delete Product"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default DeleteProduct;
