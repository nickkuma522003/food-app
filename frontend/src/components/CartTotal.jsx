import React from 'react'
import { useSelector } from 'react-redux'


const CartTotal = () => {
    const items = useSelector(state => state.cart.value)
    const deliveryFee = 0

    const subtotal = items.reduce((acc, item) => acc + item.price, 0)
    const total = subtotal + deliveryFee
    return (
        <div className="lg:w-1/2 w-full p-5">
            <h2 className="text-2xl font-bold mb-3">Cart Totals</h2>
            <div className="border-b py-2 flex items-center justify-between">
                <p>Subtotal</p>
                <p>₹{subtotal.toFixed(2)}</p>
            </div>
            <div className="border-b py-2 flex items-center justify-between">
                <p>Delivery fee</p>
                <p>₹{deliveryFee.toFixed(2)}</p>
            </div>
            <div className="border-b py-2 flex items-center justify-between">
                <p>Total</p>
                <p>₹{total.toFixed(2)}</p>
            </div>

        </div>
    )
}

export default CartTotal
