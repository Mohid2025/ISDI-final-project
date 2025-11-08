import React from 'react'
import { useCart } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'

export default function CartDrawer({ open, onClose }) {
  const { state, dispatch, totalPrice } = useCart()

  if (!open) return null

  const updateQty = (id, qty) => dispatch({ type: 'UPDATE_QTY', payload: { id, qty } })
  const remove = (id) => dispatch({ type: 'REMOVE_ITEM', payload: { id } })
  const navigate = useNavigate()

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      right: 0,
      height: '100%',
      width: '350px',
      background: '#fff',
      boxShadow: '-2px 0 12px rgba(0,0,0,0.2)',
      zIndex: 1000,
      padding: '16px',
      display: 'flex',
      flexDirection: 'column',
      transform: open ? 'translateX(0)' : 'translateX(100%)',
      transition: 'transform 0.3s ease',
    }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
        <h2>Your Cart</h2>
        <button onClick={onClose} style={{ fontSize:18, fontWeight:600 }}>✕</button>
      </div>

      {state.items.length === 0 ? (
        <div style={{ marginTop:50, textAlign:'center', color:'#6b7280' }}>Cart is empty</div>
      ) : (
        <div style={{ flex:1, overflowY:'auto' }}>
          {state.items.map(i => (
            <div key={i.id} style={{ display:'flex', gap:12, alignItems:'center', marginBottom:12 }}>
              <img src={i.product.image} alt="" style={{ width:60, height:50, objectFit:'cover', borderRadius:6 }} />
              <div style={{ flex:1 }}>
                <div style={{ fontWeight:600 }}>{i.product.name}</div>
                <div style={{ color:'#6b7280', fontSize:13 }}>${i.product.price.toFixed(2)}</div>
              </div>
              <input
                type="number"
                min="1"
                value={i.qty}
                onChange={e => updateQty(i.id, Math.max(1, Number(e.target.value)||1))}
                style={{ width:50, padding:4 }}
              />
              <button onClick={() => remove(i.id)} style={{ background:'#ef4444', color:'#fff', border:'none', padding:'4px 8px', borderRadius:6 }}>Remove</button>
            <button
  onClick={() => {
    onClose()
    navigate('/checkout')
  }}
  style={{ width:'100%', padding:10, background:'#111827', color:'#fff', border:'none', borderRadius:6 }}
>
  Proceed to Checkout
</button>
            </div>
          ))}
        </div>
      )}

      {state.items.length > 0 && (
        <div style={{ marginTop:16 }}>
          <div style={{ fontWeight:700, fontSize:16, marginBottom:8 }}>Total: ${totalPrice.toFixed(2)}</div>
          <button className="btn" style={{ width:'100%' }}>Proceed to Checkout</button>
        </div>
      )}
    </div>
  )
}
