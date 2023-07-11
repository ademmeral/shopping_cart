import { ReactElement, createContext, useEffect, useMemo, useState } from "react"

//======== STATE ===========
export type ProductType = {
  id: number,
  name: string,
  sku: string,
  price: number
}
export type ProductsType = ProductType[]
const initialState:ProductsType = [
  {
      "id": 1,
      "sku": "item0001",
      "name": "Widget",
      "price": 9.99
  },
  {
      "id" : 2,
      "sku": "item0002",
      "name": "Premium Widget",
      "price": 19.99
  },
  {
      "id" : 3,
      "sku": "item0003",
      "name": "Deluxe Widget",
      "price": 29.99
  }
]

export type ProductsContextType = {products: ProductType[]}
const initialProductsContext:ProductsContextType = {products: []}
export const ProductsContext = createContext<ProductsContextType>(initialProductsContext)
//======== CHILDREN ===========
export type ProductsContextProps = {
  children? : ReactElement | ReactElement[] | undefined 
}

function ProductsProvider({children} : ProductsContextProps) {
  const [state, setState] = useState<ProductsType>(initialState)
  /*
  useMemo(() => {
    const fetchProducts = async ():Promise<void> =>{
      fetch("http://localhost:3000/products")
        .then(data => data.json())
        .then(data => setState(data))
        .catch(console.log)
    }
    fetchProducts()
  }, [])
  */
  return (
    <ProductsContext.Provider value={{products: state}}>
      {children}
    </ProductsContext.Provider>
  )
}

export default ProductsProvider