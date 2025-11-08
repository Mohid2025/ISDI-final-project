import React, { createContext, useContext, useReducer, useEffect } from 'react'

const CartContext = createContext()

const initialState = {
  items: JSON.parse(localStorage.getItem('cart_items') || '[]')
}

function reducer(state, action){
  switch(action.type){
    case 'ADD_ITEM': {
      const { product, qty = 1 } = action.payload
      const found = state.items.find(i => i.id === product.id)
      let items
      if(found){
        items = state.items.map(i => i.id === product.id ? { ...i, qty: i.qty + qty } : i)
      } else {
        items = [...state.items, { id: product.id, product, qty }]
      }
      return { ...state, items }
    }
    case 'UPDATE_QTY': {
      const { id, qty } = action.payload
      const items = state.items.map(i => i.id === id ? { ...i, qty } : i).filter(i => i.qty > 0)
      return { ...state, items }
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(i => i.id !== action.payload.id) }
    case 'CLEAR_CART':
      return { ...state, items: [] }
    default:
      return state
  }
}

export function CartProvider({ children }){
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    localStorage.setItem('cart_items', JSON.stringify(state.items))
  }, [state.items])

  const totalQty = state.items.reduce((s, i) => s + i.qty, 0)
  const totalPrice = state.items.reduce((s, i) => s + i.qty * i.product.price, 0)

  return (
    <CartContext.Provider value={{ state, dispatch, totalQty, totalPrice }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
