import React from 'react'
import { useCart } from '../context/CartContext'

export default function ProductCard({ product }){
  const { dispatch } = useCart()

  const add = () => dispatch({ type: 'ADD_ITEM', payload: { product, qty: 1 } })

  return (
    <div className="card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.short_description}</p>
      <div className="row">
        <div>
          <div className="badge">${product.price.toFixed(2)}</div>
        </div>
        <div>
          <button className="btn" onClick={add}>Add</button>
        </div>
      </div>
    </div>
  )
}
