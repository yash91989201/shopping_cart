import { CartItemType,CartProps } from "../types";

const Cart:React.FC<CartProps> = ({cartItems,addToCart,removeFromCart}) => {
    const calcCartTotal=(items:CartItemType[])=>{
        return items.reduce((ack:number,item)=>ack+item.amount*item.price,0)
    }
  return( 
    <div className="w-[450px] px-6 py-8 border-red-700 border-1">
        <h2 className="font-semibold text-xl">Your Shopping Cart</h2>
        {cartItems.length === 0 ?<p className="font-medium text-lg py-4">No items in your cart</p> : <p>display cart items</p> }
        <h2 className="font-bold text-2xl">Your Cart Total: $0</h2>
    </div>
  );
};

export default Cart;