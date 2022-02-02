// Importing cart item props
import { CartItemProps } from "../types";

const CartItem:React.FC<CartItemProps> = ({item,addToCart,removeFromCart}) => {
  return( 
  <div className="w-full my-4 flex border-blue-700 border-b">
    <div className="w-9/12 py-2 flex flex-col">
        <h3 className="text-lg font-semibold">{item.title}</h3>
        <h3 className="py-4 text-xl font-semibold">${item.price}</h3>
        <div className="w-full py-4 flex flex-row justify-between items-center">
            <button 
                className="cartButton"
                onClick={()=>removeFromCart(item.id)} 
            > &minus; </button>
            <h4 className="">{item.amount}</h4>
            <button 
                className="cartButton"
                onClick={()=>addToCart(item)} 
            > &#43; </button>
        </div>
    </div>
    <img
        className="w-3/12 p-4 object-contain" 
        src={item.image} 
        alt={item.description} 
    />
  </div>
  );
};

export default CartItem;