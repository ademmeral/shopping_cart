import { useState } from "react";
import Cart from "./Cart";
import Products from "./Products";


const ProductsLayout = ({viewCart} : {viewCart: boolean}) => {

  const Component = viewCart
    ? <Cart />
    : <Products />

  return (
    <main>
      <div className="container">
        {Component}
      </div>
    </main>
  )
}

export default ProductsLayout