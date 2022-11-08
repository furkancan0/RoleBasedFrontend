
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { Button, Input, message, Notification } from "antd";
import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
const PRODUCT_URL = '/Products';

const AddProduct = () => {

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [stock, setStock] = useState(0);

    const axiosPrivate = useAxiosPrivate();
    
    const joinRoom = async () =>{
      try {
          const connection = new HubConnectionBuilder()
          .withUrl("https://localhost:7043/products-hub")
          .build();

          connection.on("receiveProductAddedMessage",message => {
              console.log("message received====>", message);
          });

          await connection.start();
      } catch (error) {
          
      }
  }


    useEffect(()=>{
      joinRoom();
    },[])
    
    const handleProduct = async(e) =>{
      e.preventDefault();
      try {
        const response = await axiosPrivate.post("/Products",
          JSON.stringify({ name, stock, price }),
          {
              headers: { 'Content-Type': 'application/json' },
              withCredentials: true
          }
          );
        } 
      catch (error) { 
        console.log(error);
      }
    }

  return (
    <>
    
    <form onSubmit={handleProduct}>
        <input value={name} onChange={(e)=> setName(e.target.value)}/>
        <input value={price} onChange={(e)=> setPrice(e.target.value)}/>
        <input value={stock} onChange={(e)=> setStock(e.target.value)}/>
        <button>Add Product</button>
    </form>
    </>
  );

};
export default AddProduct