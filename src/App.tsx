import {useState} from "react";
import {useQuery} from "react-query";
// Importing types
import { CartItemType } from "./types";
// Importing styled components
import { LoadingComponent } from "./App.styles";
// Importing material ui components
import { LinearProgress } from "@material-ui/core";

// Fetch product data from API endpoint
const fetchProductData=async ():Promise<CartItemType[]> =>{
  const res=await fetch("https://fakestoreapi.com/products");
  return await res.json();
}


function App() {
  const {data,isLoading,error}=useQuery<CartItemType[]>("products",fetchProductData);
  if(isLoading) 
  return <LoadingComponent>
    <h3>Hang On ! Getting Products</h3>
    <LinearProgress/>
  </LoadingComponent>
  if(error) return <div>Error in fetching data ...</div>;
  console.log(data);
  return (
    <div className="App">
    </div>
  );
}

export default App;
