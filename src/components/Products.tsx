import useCart from "../hooks/useCart"
import useProducts from "../hooks/useProducts"
import Product from "./Product"

const Products = () => {
  const {products} = useProducts()
  const {dispatch, cart} = useCart()

  return (
    <main>
      <div className="container">
        <ul>
          {
            products.map(product => (
              <Product 
                key={product.id}
                product={product}
                dispatch={dispatch}
                cart={cart}
              />
            ))
          }
        </ul>
      </div>
    </main>
  )
}

export default Products