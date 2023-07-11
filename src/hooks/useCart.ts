import { CartContext } from "../contexts/CartProvider"
import { useContext } from "react";

const useCart = () => {
  const state = useContext(CartContext)
  return state;
}

export default useCart