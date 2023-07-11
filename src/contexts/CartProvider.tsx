import { createContext, useReducer, ReactElement } from "react"

//======= CONTEXT ==========
export type CartItemType = {
  sku: string,
  name: string,
  id: number,
  qty: number,
  price: number
}
export type CartItemsType = CartItemType[]
//======= REDUCER ==========
export type ReducerActionType = {
  type: number,
  payload?: CartItemType
}

function reducer(state: CartItemsType, action: ReducerActionType ) : CartItemsType
{
  switch(action.type) {
    case 1 : {
      if (!action.payload) throw new Error('Payload is required!');

      const {id} = action.payload
      const itemExists = state.find(item => item.id === id)

      if (itemExists) {

        const filteredCart = state.filter(item => item.id !== id)
        return filteredCart.concat({...itemExists, qty : itemExists.qty + 1})

      } else {
        return [...state, action.payload]
      }
    }
    case 2 : {
      if (!action.payload) throw new Error('Payload is required!');
      const {id} = action.payload
      const filteredCart = state.filter(item => item.id !== id)
      return filteredCart
    }
    case 3 : {
      if (!action.payload) throw new Error('Payload is required!');
      const {id} = action.payload
      const filteredCart = state.filter(item => item.id !== id)
      const itemExists = state.find(item => item.id === id)
      if (itemExists) return filteredCart.concat({
          ...itemExists, qty : action.payload.qty
        })
    }
    case 4 : {
      return []
    }
    case 5 : {
      if (!action.payload) throw new Error('Payload is required!');
      const {id} = action.payload
      const filteredCart = state.filter(item => item.id !== id)
      return filteredCart
    }
    default : {
      throw new Error('Unexpedted operation!')
    }
  }
}
//======= HOOK ==========
const useCartContext = (initState: CartItemsType) => {
  const [state, dispatch] = useReducer(reducer, initState)

  const totalItems = state.reduce((acc, curr) => {
    return acc + curr.qty
  }, 0)
  const totalPrice = state.reduce((acc, curr) => {
    return acc + (curr.price * curr.qty)
  }, 0)

  const sortedState = state.sort((a,b) => {
    return a.id - b.id
  })

  return {cart : sortedState, dispatch, totalItems, totalPrice}
}
type UseCartContextHookType = ReturnType<typeof useCartContext>
//======= CONTEXT ==========
const initialCartContext = {
  cart : [],
  dispatch : () => { },
  totalItems : 0,
  totalPrice : 0,
}
export const CartContext = createContext<UseCartContextHookType>(initialCartContext)
//======= CHILDREN ==========

type ItemsContextProps = {
  children? : ReactElement | ReactElement[] | undefined 
}

function CartProvider({children} : ItemsContextProps): ReactElement {
  return (
    <CartContext.Provider value={useCartContext([])}>
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider