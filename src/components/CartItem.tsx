import { ChangeEvent, memo } from "react"
import { CartItemType, ReducerActionType } from "../contexts/CartProvider"
import priceFormatter from "../modules/priceFormatter"


export type CartItemPropsType = {
  item : CartItemType,
  dispatch: React.Dispatch<ReducerActionType>
}

const CartItem = ({item, dispatch} : CartItemPropsType) => {

  const src: string = 
    new URL(`../images/${item.sku}.jpg`, import.meta.url).href


  const handleChange = (e:ChangeEvent<HTMLSelectElement>) => {
    dispatch({
      type: 3, payload : {...item, qty: +e.target.value}
    })
  }

  return (
    <li>
      <figure>
        <img src={src} alt={item.name} />
        <figcaption>
          <h3>{item.name}</h3>
        </figcaption>
      </figure>
      <select value={item.qty} onChange={handleChange}>
        {
          [...Array(11).keys()].slice(1)
            .map(key => (
              <option key={key} value={key}>{key}</option>
            ))
        } 
      </select>
      <p>{priceFormatter(item.price, item.qty)}</p>
      <button
        onClick={() => dispatch({type: 5, payload: item})}
      >❌</button>
    </li>
  )
}

function areEqual ({
  item: prevItem}: CartItemPropsType, 
  {item : nextItem}: CartItemPropsType 
): boolean {
  return Object.keys(prevItem).every(key => (
    JSON.stringify(prevItem[key as keyof CartItemType]) === 
      JSON.stringify(nextItem[key as keyof CartItemType])
  ))
}

const MemoizedCartItem = memo<typeof CartItem>(CartItem, areEqual)
export default MemoizedCartItem

// export default CartItem