import { useSelector } from "react-redux"
import EmptyCart from "./EmptyCart"
import CartItem from "../components/CartItem"
import CartTotal from "../components/CartTotal"
import { Link } from "react-router-dom"
const Cart = () => {
  const items = useSelector(state => state.cart.value)
  

  if (items.length === 0) {
    return <EmptyCart />
  }

  return (
    <div className="container mx-auto my-10 ">
      <h2 className="text-2xl text-center mb-5 font-bold">Your Cart</h2>
      <div className="flex text-center pb-2 border-b px-5">
        <div className="w-1/4 md:text-left text-center">
          <p>Item</p>
        </div>
        <div className="w-1/4">
          <p>Price</p>
        </div>
        <div className="w-1/4">
          <p>Quantity</p>
        </div>
        <div className="w-1/4">
          <p>Remove</p>
        </div>
      </div>
      <div className="px-5">
        {
          items.map((item) => {
            return <CartItem key={item.idMeal} item={item} />
          })
        }
      </div>
     
      <div className="flex flex-wrap-reverse items-center mt-10">
       <CartTotal/>
        <div className="w-full lg:w-1/2 flex items-center justify-center px-5">
          <div className="w-full">
            <p className="mb-2 lg:px-5">If you have a promo code, enter it here</p>
            <div className="flex lg:px-5">
              <input type="text" placeholder="Promo code" className="px-4 py-2 w-full bg-gray-100" />
              <button className="px-2 py-2 bg-gray-800 text-white">Submit</button>
            </div>
          </div>
        </div>
           
      </div>
      <Link className="bg-orange-500 text-white ml-5 px-4 py-2 rounded-lg my-4 inline-block " to={"/order"}>PROCEED TO CHECKOUT</Link>   
    </div>
  )
}

export default Cart
