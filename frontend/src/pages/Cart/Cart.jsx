import React, { useContext, useState } from 'react';
import './Cart.css';
import { StoreContext } from '../../Context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const {
    cartItems,
    food_list,
    removeFromCart,
    updateCartQuantity,
    getTotalCartAmount,
    url,
    currency,
    deliveryCharge,
  } = useContext(StoreContext);

  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [error, setError] = useState('');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false); // Popup state
  const navigate = useNavigate();

  // List of valid promo codes and their discounts
  const validPromoCodes = {
    DISCOUNT10: 0.1, // 10% discount
    SAVE50: 50, // Flat ₹50 discount
  };

  // Apply promo code logic
  const handlePromoCode = () => {
    if (promoApplied) {
      setError('Promo code already applied!');
      return;
    }

    if (promoCode in validPromoCodes) {
      const discountValue =
        validPromoCodes[promoCode] < 1
          ? getTotalCartAmount() * validPromoCodes[promoCode]
          : validPromoCodes[promoCode];
      setDiscount(discountValue);
      setPromoApplied(true);
      setError('');
      setShowSuccessPopup(true); // Show the popup
      setTimeout(() => {
        setShowSuccessPopup(false); // Hide the popup after 3 seconds
      }, 3000);
    } else {
      setError('Invalid promo code!');
      setPromoApplied(false);
      setDiscount(0);
    }
  };

  // Calculate final total
  const finalTotal =
    getTotalCartAmount() === 0
      ? 0
      : getTotalCartAmount() + deliveryCharge - discount;

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={index}>
                <div className="cart-items-title cart-items-item">
                  <img src={`${url}/images/${item.image}`} alt={item.name} />
                  <p>{item.name}</p>
                  <p>{currency}{item.price}</p>
                  <div className="cart-quantity">
                    <button
                      onClick={() =>
                        updateCartQuantity(item._id, cartItems[item._id] - 1)
                      }
                    >
                      -
                    </button>
                    <span>{cartItems[item._id]}</span>
                    <button
                      onClick={() =>
                        updateCartQuantity(item._id, cartItems[item._id] + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                  <p>{currency}{item.price * cartItems[item._id]}</p>
                  <p
                    className="cart-items-remove-icon"
                    onClick={() => removeFromCart(item._id)}
                  >
                    x
                  </p>
                </div>
                <hr />
              </div>
            );
          }
          return null;
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>{currency}{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>{currency}{getTotalCartAmount() === 0 ? 0 : deliveryCharge}</p>
            </div>
            {promoApplied && (
              <div className="cart-total-details">
                <p>Promo Discount</p>
                <p>-{currency}{discount}</p>
              </div>
            )}
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>{currency}{finalTotal}</b>
            </div>
          </div>
          <button
            onClick={() => {
              if (getTotalCartAmount() > 0) navigate('/order');
              else alert('Your cart is empty!');
            }}
          >
            PROCEED TO CHECKOUT
          </button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, enter it here</p>
            <div className="cart-promocode-input">
              <input
                type="text"
                placeholder="promo code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
              />
              <button onClick={handlePromoCode}>Apply</button>
            </div>
            {error && <p className="promo-error">{error}</p>}
          </div>
        </div>
      </div>

      {/* Popup for promo code success */}
      {showSuccessPopup && (
        <div className="promo-success-popup">
          <p>Promo code applied successfully!</p>
        </div>
      )}
    </div>
  );
};

export default Cart;
