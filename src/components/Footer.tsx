import React from 'react'
import Totals from './Totals'

const Footer = () => {

  const year: number = new Date().getFullYear() 
  return (
    <footer>
      <div className='container'>
        <ul>
          <Totals />
        </ul>
        <small>Shopping cart &copy; {year}</small>
      </div>
    </footer>
  )
}

export default Footer