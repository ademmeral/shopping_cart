import { AppStateType } from "../App"
import Totals from "./Totals"

const Header = ({viewCart, setViewCart} : AppStateType) => {
  return (
    <header>
      <nav className="container">
        <h1 className="logo">Logo</h1>
        <ul>
          <Totals />
          <li>
            <button 
              onClick={() => setViewCart(p => !p)}
            >{viewCart ? 'View Products' : 'View Cart'}
            </button>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header