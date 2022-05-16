import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {ProductListPage} from "./pages/ProductListPage";
import {ProductAddPage} from "./pages/ProductAddPage";
import React from "react";
import {ProductCardPage} from "./pages/ProductCardPage";
import {ProductEditPage} from "./pages/ProductEditPage";

export const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/products/:usin/edit" element={
                    <ProductEditPage/>
                }/>
                <Route path="/products/:usin" element={
                    <ProductCardPage/>
                }/>
                <Route path="/products/add" element={<ProductAddPage/>}/>
                <Route path="/products" element={<ProductListPage/>}/>
                <Route path="*" element={<Navigate to="/products"/>}/>
            </Routes>
        </BrowserRouter>
    )
}