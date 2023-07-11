import { useState } from "react"
import Footer from "./components/Footer"
import Header from "./components/Header"
import ProductsLayout from "./components/ProductsLayout"

export type AppStateType = { 
  viewCart: boolean; setViewCart: React.Dispatch<React.SetStateAction<boolean>>; 
}

function App() {
  const [viewCart, setViewCart] = useState(false)

  return (
    <div className="App">
        <Header viewCart={viewCart} setViewCart={setViewCart} />
        <ProductsLayout viewCart={viewCart} />
        <Footer />
    </div>
  );
}

export default App