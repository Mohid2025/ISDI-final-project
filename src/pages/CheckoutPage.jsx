import React, { useState } from 'react'
import { useCart } from '../context/CartContext'
import { useToast } from '../context/ToastContext'

export default function CheckoutPage() {
  const { state, totalPrice, dispatch } = useCart()
  const { showToast } = useToast()

  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (state.items.length === 0) {
      showToast('Your cart is empty!')
      return
    }

    if (!form.name || !form.email || !form.address) {
      showToast('Please fill in all fields!')
      return
    }

    // Log the order (replace with backend API call later)
    console.log('Order submitted:', {
      customer: form,
      items: state.items,
      total: totalPrice,
    })

    showToast('Order submitted successfully!')

    // Clear cart
    dispatch({ type: 'CLEAR_CART' })

    // Reset form
    setForm({ name: '', email: '', address: '' })
  }

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', padding: 16 }}>
      <h1>Checkout</h1>

      {/* Warning if cart is empty */}
      {state.items.length === 0 && (
        <p style={{ color: '#ef4444', fontWeight: 600 }}>Your cart is empty.</p>
      )}

      {/* Cart summary */}
      {state.items.length > 0 && (
        <div style={{ marginBottom: 24 }}>
          {state.items.map((i) => (
            <div
              key={i.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: 8,
              }}
            >
              <span>
                {i.product.name} x {i.qty}
              </span>
              <span>${(i.product.price * i.qty).toFixed(2)}</span>
            </div>
          ))}
          <div style={{ fontWeight: 700, marginTop: 8 }}>
            Total: ${totalPrice.toFixed(2)}
          </div>
        </div>
      )}

      {/* Checkout form */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
          style={{ padding: 8, borderRadius: 6, border: '1px solid #ccc' }}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          style={{ padding: 8, borderRadius: 6, border: '1px solid #ccc' }}
        />
        <textarea
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          required
          style={{ padding: 8, borderRadius: 6, border: '1px solid #ccc', minHeight: 80 }}
        />

        <button
          type="submit"
          disabled={state.items.length === 0}
          style={{
            backgroundColor: state.items.length === 0 ? '#9ca3af' : '#111827',
            color: '#fff',
            padding: 10,
            borderRadius: 6,
            border: 'none',
            cursor: state.items.length === 0 ? 'not-allowed' : 'pointer',
            fontWeight: 600,
          }}
        >
          Submit Order
        </button>
      </form>
    </div>
  )
}
