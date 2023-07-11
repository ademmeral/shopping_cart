import { useState } from "react"
import useCart from "../hooks/useCart"
import CartItem from "./CartItem"


const Cart = () => {
  const [checkout, setCheckout] = useState(false)
  const {dispatch, cart} = useCart()
  

  function handleClick(){
    setCheckout(true)
    dispatch({type: 4})
  }

  const Component = !checkout ? (
    <>
      <ul className="cart__items">
        {cart.map((item) => (
          <CartItem key={item.id} item={item} dispatch={dispatch} />
        ))}
      </ul>
      <button 
        className="checkout btn"
        onClick={handleClick}
        disabled={cart.length ? false : true}
      >Checkout</button>
    </>
  ) : (
    <h1>Thanks for your order.</h1>
  );

  return Component
}

export default Cart