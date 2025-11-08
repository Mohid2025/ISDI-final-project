import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import CartPage from './pages/CartPage'
import ProductPage from './pages/ProductPage'
import Header from './components/Header'
import CheckoutPage from './pages/CheckoutPage'

export default function App() {
  return (
    <div className="app-root">
      <Header />
      <main style={{ padding: '1rem', maxWidth: 1100, margin: '0 auto' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
      </main>
    </div>
  )
}
