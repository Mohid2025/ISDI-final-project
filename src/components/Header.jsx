import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function Header(){
  const { totalQty } = useCart()
  return (
    <header className="header">
      <div style={{ display:'flex', gap:12, alignItems:'center' }}>
        <Link to="/" className="brand">MyShop</Link>
        <div style={{ color:'#6b7280', fontSize:13 }}>A simple ecommerce demo</div>
      </div>

      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/cart" style={{ display:'flex', alignItems:'center' }}>
          <span>Cart</span>
          {totalQty > 0 && <span className="cart-count">{totalQty}</span>}
        </Link>
      </nav>
    </header>
  )
}
