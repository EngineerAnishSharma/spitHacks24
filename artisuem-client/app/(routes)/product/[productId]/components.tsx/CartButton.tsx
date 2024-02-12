"use client"
import sendPurchase from '@/data-fetchers/set-purchases'
import useCart from '@/hooks/use-cart'
import { useAuth } from '@clerk/nextjs'
import { ShoppingCart } from 'lucide-react'
import React from 'react'

type CartButtonProps ={
    product:Products
}

const CartButton = ({
    product
}:CartButtonProps) => {
    const cart = useCart()
    const {userId} = useAuth()
    const HandleAdd =async () =>{
      await sendPurchase({id: product.id, userId:userId?userId:""})
        cart.addItem(product)
    }
  return (
    <button onClick={HandleAdd} className="btn-neutral rounded-full hover:btn-accent py-2  btn btn-sm   mt-4">
    Add to cart
    <ShoppingCart className="h-4 w-4" />
  </button>
  )
}

export default CartButton