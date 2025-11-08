import React from 'react'
import products from '../data/products'
import ProductCard from '../components/ProductCard'

export default function Home(){
  return (
    <div>
      <h1 style={{ marginBottom: '1rem' }}>Products</h1>
      <section className="grid">
        {products.map(p => <ProductCard key={p.id} product={p} />)}
      </section>
    </div>
  )
}
