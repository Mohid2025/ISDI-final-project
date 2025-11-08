import React from 'react'
import { useCart } from '../context/CartContext'
import { Link, useNavigate } from 'react-router-dom'

export default function CartPage() {
  const { state, dispatch, totalPrice } = useCart()
  const navigate = useNavigate()

  const updateQty = (id, qty) => dispatch({ type: 'UPDATE_QTY', payload: { id, qty } })
  const removeItem = (id) => dispatch({ type: 'REMOVE_ITEM', payload: { id } })

  if (state.items.length === 0)
    return (
      <div style={{ padding: '2rem' }}>
        <p>Your cart is empty.</p>
        <Link to="/">Back to Home</Link>
      </div>
    )

  return (
    <div style={{ maxWidth: 800, margin: '2rem auto' }}>
      <h1>Your Cart</h1>
      {state.items.map((i) => (
        <div
          key={i.id}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 8,
          }}
        >
          <span>{i.product.name}</span>
          <div>
            <button onClick={() => updateQty(i.id, i.qty - 1)} disabled={i.qty <= 1}>
              -
            </button>
            <span style={{ margin: '0 8px' }}>{i.qty}</span>
            <button onClick={() => updateQty(i.id, i.qty + 1)}>+</button>
            <button onClick={() => removeItem(i.id)} style={{ marginLeft: 8 }}>
              Remove
            </button>
          </div>
          <span>${(i.qty * i.product.price).toFixed(2)}</span>
        </div>
      ))}
      <div style={{ fontWeight: 700, marginTop: 16 }}>Total: ${totalPrice.toFixed(2)}</div>
      <button
        onClick={() => navigate('/checkout')}
        style={{ marginTop: 16, padding: '0.5rem 1rem' }}
      >
        Proceed to Checkout
      </button>
    </div>
  )
}
