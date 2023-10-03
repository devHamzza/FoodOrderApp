import react, { useState } from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import CartProvider from "./Store/CartProvider";

function App() {
  const [CartState, setCartState] = useState(false);

  const showCartHanlder = () => {
    setCartState(true);
  };

  const hideCartHanlder = () => {
    setCartState(false);
  };

  return (
    <CartProvider>
      {CartState && <Cart onClose={hideCartHanlder} />}
      <Header onClick={showCartHanlder}/>
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
