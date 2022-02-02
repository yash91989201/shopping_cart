// importing prop types
import { CartItemType,CartProps } from "../types";
// importing component
import CartItem from "./CartItem";

const Cart:React.FC<CartProps> = ({cartItems,addToCart,removeFromCart}) => {
    const calcCartTotal=(items:CartItemType[])=>{
        return items.reduce((ack:number,item)=>ack+item.amount*item.price,0)
    }
  return( 
    <div className="w-[450px] p-4 overflow-x-hidden">
        <h2 className="py-4 font-semibold text-2xl">Your Shopping Cart</h2>
        {cartItems.length === 0 ?<p>No Items in your cart</p> : null }
        {
          cartItems.map(item=>
            <CartItem 
              key={item.id}
              item={item} 
              addToCart={addToCart} 
              removeFromCart={removeFromCart}  
            /> 
          )
        }
        <h2 className="font-bold text-2xl">Your Cart Total : ${calcCartTotal(cartItems).toFixed(2)}</h2>
    </div>
  );
};

export default Cart;