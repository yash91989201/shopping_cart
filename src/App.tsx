import { useState } from "react";
import { useQuery } from "react-query";
// Importing types
import { CartItemType } from "./types";
// Importing material ui components
import {Grid,LinearProgress} from "@material-ui/core";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
// Importing components
import Items from "./components/Items";

// Fetch product data from API endpoint
const fetchProductData = async (): Promise<CartItemType[]> => {
  const res = await fetch("https://fakestoreapi.com/products");
  return await res.json();
}


function App() {
  const { data, isLoading, error } = useQuery<CartItemType[]>("products", fetchProductData);
  const [cartItem,setCartItem] =useState([] as CartItemType[]);
  const handleAddToCart=(clickedItem:CartItemType)=>{
    setCartItem(previous=>{
      // 1. For items already in cart
      const isItemInCart=previous.find(item=>item.id === clickedItem.id);
      if(isItemInCart) 
        return previous.map(
          (item)=>
            item.id === clickedItem.id ? 
            {...item,amount:item.amount+1}:
            item
          )
          // 2. For an item added for the first time in the cart
          return [...previous,{...clickedItem,amount:1}]
        });
  }; 

  if (isLoading)
    return <div className="w-1/2 h-screen m-auto py-80 text-center">  
      <h3 className="pb-4 text-lg font-medium">Hang On! Getting Products</h3>
      <LinearProgress />
    </div>
  if (error) 
  return <div className="w-1/2 h-screen m-auto py-80 text-center">
     <h3 className="pb-4 text-lg font-medium">Unable to reach the store ! Try again later ...</h3>
    </div>;
  return (
    <div className="App container flex ">
      <div>
       <div className="p-12 grid grid-cols-1 ">
        {data?.map(item=>
              <div 
              key={item.id}
              className=""
              >
                <Items item={item} handleAddToCart={handleAddToCart}/>
              </div> 
        )
        }
       </div>
      </div>
    </div>
  );
}

export default App;
