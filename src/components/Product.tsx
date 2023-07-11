import { ProductType } from "../contexts/ProductsProvider"
import { ReducerActionType } from "../contexts/CartProvider"
import { PointerEvent, memo, useEffect, useRef, useState } from "react"
import { CartItemsType } from "../contexts/CartProvider"
import priceFormatter from "../modules/priceFormatter"

export type ProductPropsType = {
  product : ProductType,
  cart: CartItemsType
  dispatch: React.Dispatch<ReducerActionType>
} 

const Product = ({product, cart, dispatch} : ProductPropsType) => {
  const [inCart, setInCart] = useState(
    cart.some(item => item.id === product.id)
  )
  const [disabled, setDisabled] = useState(false)
  const timeout = useRef<number>(0)

  const src: string = 
    new URL(`../images/${product.sku}.jpg`, import.meta.url).href

  const handleClick = (e:PointerEvent<HTMLButtonElement>) => {
    setDisabled(() => true)
    dispatch({type: 1, payload: {...product, qty: 1}})
    if (!inCart) setInCart(true);
    timeout.current = setTimeout(() => {
      setDisabled(() => false)
    }, 2000)
  }

  useEffect(() => {
    return () => clearTimeout(timeout.current)
  }, [])

  return (
    <li>
      <h3>{product.name}</h3>
      <figure>
        <img src={src} alt={product.name} />
        <figcaption>
          <span>{priceFormatter(product.price)}</span>
          <span>{inCart ? "→ Item in Cart: ✔️" : ''}</span>
        </figcaption>
      </figure>
      <button 
        onClick={handleClick}
        disabled={disabled}
      >Add to Cart
      </button>
    </li>
  )
}

function areEqual ({
  product: prevItem}: ProductPropsType, 
  {product : nextItem}: ProductPropsType 
): boolean {
  return Object.keys(prevItem).every(key => (
    prevItem[key as keyof ProductType] === nextItem[key as keyof ProductType]
  ))
}

const MemoizedProduct = memo<typeof Product>(Product, areEqual)
export default MemoizedProduct

// export default Product