import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import ProductsProvider from './contexts/ProductsProvider'
import CartProvider from './contexts/CartProvider'
import './index.sass'

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ProductsProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </ProductsProvider>
  </React.StrictMode>
);
