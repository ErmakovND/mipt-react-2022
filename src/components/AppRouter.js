import React from 'react';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {ProductsPage} from "./ProductsPage";
import {ProductPage} from "./ProductPage";

const AppRouter = () => {
    return <BrowserRouter>
        <Routes>
            <Route path={"/"} element={<Navigate to={"/products"}/>}/>
            <Route path="/products" element={<ProductsPage/>}/>
            <Route path="/product/:usin" element={<ProductPage/>}/>
        </Routes>
    </BrowserRouter>
}

export default AppRouter;
