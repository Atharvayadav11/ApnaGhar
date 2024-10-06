import React from 'react';
import { Button } from "@/components/ui/button"
import { Navigate, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate()
    const handleProd=()=>{
        navigate('/products')
    }
  return (
    <nav className="flex items-center justify-between px-4 py-2 mx-8">
      <div className="flex ">
        <h1 className="text-3xl font-bold mr-2 mt-0">ApnaGhar
            <sup>®</sup></h1>
      </div>
      <div className="flex items-center  bg-gray-100 rounded-full px-1 py-1 border border-black h-14">
        <Button variant="ghost" className="rounded-full text-xl hover:bg-black hover:text-white h-13">PRICING</Button>
        <Button variant="ghost" className="rounded-full text-xl hover:bg-black hover:text-white h-13" onClick={handleProd}>PRODUCTS</Button>
        <Button variant="ghost" className="rounded-full text-xl hover:bg-black hover:text-white h-13">FEATURES</Button>
        <Button variant="ghost" className="rounded-full text-xl hover:bg-black hover:text-white h-13">DOCS</Button>
        <Button variant="ghost" className="rounded-full text-xl hover:bg-black hover:text-white h-13">BLOG</Button>
      </div>
      <Button variant="default" className="bg-black text-white hover:bg-gray-800 text-xl h-14 rounded-full hover:rounded-lg">
        Register
      </Button>
    </nav>
  );
};

export default Navbar;