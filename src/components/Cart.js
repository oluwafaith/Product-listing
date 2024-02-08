const Cart = ({ cartItems }) => {
  return (
    <div>
      {cartItems && cartItems.length > 0 ? (
        <div>
          {cartItems.map((item) => (
            <div key={item.id}>
              <p>
                {item.title} - Quantity: {item.quantity}
              </p>
            </div>
          ))}

          <button>Proceed to Checkout</button>
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;
