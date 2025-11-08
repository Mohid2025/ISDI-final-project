import React from 'react'
import { useCart } from '../context/CartContext'

export default function CartPage(){
  const { state, dispatch, totalPrice } = useCart()

  if (state.items.length === 0) {
    return <div className="empty"><h3>Your cart is empty</h3><p>Add items from the product list.</p></div>
  }

  const updateQty = (id, qty) => dispatch({ type: 'UPDATE_QTY', payload: { id, qty } })
  const remove = (id) => dispatch({ type: 'REMOVE_ITEM', payload: { id } })

  return (
    <div>
      <h1 style={{ marginBottom:'1rem' }}>Your Cart</h1>
      <div style={{ display:'grid', gap:12 }}>
        {state.items.map(i => (
          <div key={i.id} style={{ display:'flex', gap:12, alignItems:'center', background:'white', padding:12, borderRadius:8 }}>
            <img src={i.product.image} alt="" style={{ width:90, height:65, objectFit:'cover', borderRadius:6 }} />
            <div style={{ flex:1 }}>
              <div style={{ fontWeight:600 }}>{i.product.name}</div>
              <div style={{ color:'#6b7280', fontSize:13 }}>${i.product.price.toFixed(2)}</div>
            </div>
            <div style={{ display:'flex', gap:8, alignItems:'center' }}>
              <input type="number" min="1" value={i.qty} onChange={(e)=> updateQty(i.id, Math.max(1, Number(e.target.value)||1))} style={{ width:60, padding:6 }} />
              <button onClick={()=> remove(i.id)} className="btn" style={{ background:'#ef4444' }}>Remove</button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop:20, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <div style={{ fontSize:18, fontWeight:700 }}>Total: ${totalPrice.toFixed(2)}</div>
        <button className="btn">Proceed to Checkout</button>
      </div>
    </div>
  )
}
