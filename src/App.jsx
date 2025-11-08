import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import CartPage from './pages/CartPage'
import Header from './components/Header'

export default function App() {
  return (
    <div className="app-root">
      <Header />
      <main style={{ padding: '1rem', maxWidth: 1100, margin: '0 auto' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </main>
    </div>
  )
}
