import Cart from "@/components/Cart";

const CartPage = ({ cartItems }) => {
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
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
      {/* <Cart cartItems={cartItems} /> */}
    </div>
  );
};

export default CartPage;
