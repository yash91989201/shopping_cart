import { useState } from "react";
import { useQuery } from "react-query";
// Importing types
import { CartItemType } from "./types";
// Importing material ui components
import {LinearProgress,Drawer} from "@material-ui/core";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
// Importing components
import Items from "./components/Items";
import Cart from "./components/Cart";

// Fetch product data from API endpoint
const fetchProductData = async (): Promise<CartItemType[]> => {
  const res = await fetch("https://fakestoreapi.com/products");
  return await res.json();
}

function App() {
  const { data, isLoading, error } = useQuery<CartItemType[]>("products", fetchProductData);
  const [cartItems,setCartItem] =useState([] as CartItemType[]);
  const [cartOpen ,setCartOpen] =useState(true);
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

  const handleRemoveFromCart = (id: number) => {
    setCartItem(prev =>
      prev.reduce((accumulator, item) => {
        if (item.id === id) {
          if (item.amount === 1) 
             return accumulator;
          return [...accumulator, { ...item, amount: item.amount - 1 }];
        } else {
          return [...accumulator, item];
        }
      }, [] as CartItemType[])
    );
  };

  if (isLoading)
    return <div className="w-1/2 h-screen m-auto py-80 text-center">  
      <h3 className="pb-4 text-lg font-medium">Hang On! Getting Products ...</h3>
      <LinearProgress />
    </div>
  if (error) 
  return <div className="w-1/2 h-screen m-auto py-80 text-center">
     <h3 className="pb-4 text-lg font-medium">Unable to reach the store ! Try again later ...</h3>
    </div>;
  return (
    <div className="App container flex flex-col">
      {/* Header Start */}
      <div 
        className="sticky top-0 left-0 py-6 px-12
          flex flex-row justify-between items-center
        bg-stone-100/80"
      >
        <h1 className="text-3xl font-semibold">Clothes Mart</h1>
        <AddShoppingCartIcon style={{fontSize:"2rem",cursor:"pointer",}} onClick={()=>setCartOpen(true)} />
      </div>
      {/* Header End */}
      {/* Cart Sidebar Start */}
      <Drawer anchor="right" open={cartOpen} onClose={()=>setCartOpen(false)} >
        <Cart 
        cartItems={cartItems} 
        addToCart={handleAddToCart}
        removeFromCart={handleRemoveFromCart}
        />
      </Drawer>
      {/* Cart Sidebar end */}
      {/* Items Grid Start */}
      <div 
        className="p-12 grid  grid-cols-3 gap-14 place-content-center">
        {data?.map(item=><Items key={item.id} item={item} handleAddToCart={handleAddToCart}/>)}
      </div>
      {/* Items Grid End */}
    </div>
  );
}

export default App;
