import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./Home";
import Details from "./Details";


const Catalogue = () => {
    const { pathname } = useLocation();

    return(
        <div>
            <h1>
                Shop
            </h1>
            <Routes>
                <Route index element={ <Home/>}/>
                <Route path="product/:productId" element={ <Details/> }/>
            </Routes>
        </div>
    )
}

export default Catalogue;