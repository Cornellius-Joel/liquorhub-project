import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";   // ✅ import useNavigate
import { CartContext } from "../components/CartContext";   // ✅ correct path

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);
  const navigate = useNavigate();   // ✅ create navigate

  const calculateTotal = () =>
    cartItems.reduce((acc, item) => acc + item.product_cost * item.quantity, 0);

  return (
    <div className="container mt-4">
      <h2 className="text-warning">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-info">Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.id} className="d-flex align-items-center mb-3">
              <img
                src={`https://cornellius.alwaysdata.net/static/images/${item.product_photo}`}
                alt={item.product_name}
                width="80"
                className="me-3"
              />
              <div>
                <h5 className="text-info">{item.product_name}</h5>
                <p className="text-warning">ksh {item.product_cost}</p>
                <div className="d-flex align-items-center">
                  <button
                    className="btn btn-sm btn-outline-warning me-2"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    className="btn btn-sm btn-outline-warning ms-2"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <button
                  className="btn btn-danger btn-sm mt-2"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <h3 className="text-warning">Total: ksh {calculateTotal()}</h3>

          {/* ✅ Proceed to Checkout with cartItems */}
          <button
            className="btn btn-dark text-warning"
            onClick={() => navigate("/makepayment", { state: { cartItems } })}
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
