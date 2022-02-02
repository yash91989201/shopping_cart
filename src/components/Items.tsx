// Importing types
import { ItemProps } from "../types";
// Importing material ui component

const Items:React.FC<ItemProps> = ({item,handleAddToCart}) => {
  return <div className="w-96 px-4  border-blue-500 border rounded-xl">
      <img className="h-60 m-auto my-4 object-contain" src={item.image} alt={item.description} />
      <div className="m-auto">
          <h3 className="text-xl font-medium">{item.title}</h3>
          <p className="py-2">{item.description.slice(0,100)}</p>
          <h2 className="my-2 text-2xl">${item.price}</h2>
      </div>
      <button 
      className=" 
        w-full p-3 my-2  
        rounded-xl
        bg-slate-100 text-stone-900 
        hover:bg-blue-500 hover:text-white hover:font-bold
        active:outline-blue-300
        focus:outline-blue-300
        "  
        onClick={()=>handleAddToCart(item)}>Add To Cart</button>
  </div>;
};

export default Items;
