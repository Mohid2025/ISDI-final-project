import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import CartDrawer from './CartDrawer'
import { useToast } from '../context/ToastContext'

export default function Header(){
  const { totalQty, state } = useCart()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const { showToast } = useToast()

  const handleCartClick = () => setDrawerOpen(true)

  // Show toast when cart updates
  React.useEffect(() => {
    if(state.items.length > 0){
      const lastItem = state.items[state.items.length - 1]
      showToast(`${lastItem.qty} x ${lastItem.product.name} added to cart!`)
    }
  }, [state.items])

  return (
    <>
      <header className="header">
        <div style={{ display:'flex', gap:12, alignItems:'center' }}>
          <Link to="/" className="brand">MyShop</Link>
        </div>

        <nav className="nav-links">
          <Link to="/">Home</Link>
          <button onClick={handleCartClick} style={{ display:'flex', alignItems:'center', position:'relative', background:'none', border:'none', cursor:'pointer' }}>
            <span>Cart</span>
            {totalQty > 0 && <span className="cart-count">{totalQty}</span>}
          </button>
        </nav>
      </header>

      <CartDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  )
}
