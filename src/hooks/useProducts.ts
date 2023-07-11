import { ProductsContext } from "../contexts/ProductsProvider"
import { useContext } from "react";

const useProducts = () => {
  const state = useContext(ProductsContext)
  return state;
}

export default useProducts