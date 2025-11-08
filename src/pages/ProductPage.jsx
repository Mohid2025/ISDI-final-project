import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchProductById } from '../services/productService'
import { useCart } from '../context/CartContext'
import { useToast } from '../context/ToastContext'

export default function ProductPage() {
  const { id } = useParams()
  const { dispatch } = useCart()
  const { showToast } = useToast()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getProduct = async () => {
      try {
        const data = await fetchProductById(id)
        setProduct(data)
      } catch (err) {
        console.error(err)
        showToast('Failed to load product.')
      } finally {
        setLoading(false)
      }
    }
    getProduct()
  }, [id])

  if (loading) return <p style={{ padding: '2rem' }}>Loading...</p>
  if (!product) return <p style={{ padding: '2rem' }}>Product not found.</p>

  const addToCart = () => {
    dispatch({ type: 'ADD_ITEM', payload: { product, qty: 1 } })
    showToast(`${product.name} added to cart!`)
  }

  return (
    <div style={{ maxWidth: 800, margin: '2rem auto' }}>
      <img
        src={product.image}
        alt={product.name}
        style={{ width: '100%', height: 400, objectFit: 'cover', marginBottom: 16 }}
      />
      <h1>{product.name}</h1>
      <p>{product.short_description}</p>
      <p style={{ fontWeight: 700, fontSize: '1.2rem' }}>${product.price.toFixed(2)}</p>
      <button onClick={addToCart} style={{ padding: '0.5rem 1rem', marginTop: 12 }}>
        Add to Cart
      </button>
    </div>
  )
}
