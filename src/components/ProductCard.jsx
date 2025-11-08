import React from 'react'
import { useCart } from '../context/CartContext'
import { Link } from 'react-router-dom'

export default function ProductCard({ product }) {
  const { dispatch } = useCart()

  const add = () => dispatch({ type: 'ADD_ITEM', payload: { product, qty: 1 } })

  return (
    <div className="card" style={{ padding: '1rem', border: '1px solid #ddd', borderRadius: 6 }}>
      <Link to={`/product/${product.id}`}>
        <img
          src={product.image}
          alt={product.name}
          style={{ width: '100%', height: 200, objectFit: 'cover', marginBottom: 8 }}
        />
        <h3>{product.name}</h3>
      </Link>
      <p>{product.short_description}</p>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="badge">${product.price.toFixed(2)}</div>
        <button onClick={add} style={{ padding: '0.5rem 1rem' }}>
          Add
        </button>
      </div>
    </div>
  )
}
