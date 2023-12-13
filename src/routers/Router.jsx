import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/FrontOffice/Home';
import LayoutComponent from '../layout/LayoutComponent';
import Login from '../pages/Login';
import Signup from '../pages/FrontOffice/Signup';
import Products from '../pages/FrontOffice/Products';
import Carts from '../pages/FrontOffice/Carts';
import NotFound from '../pages/NotFound';
import Recipes from '../pages/FrontOffice/Recipes';
import ProductDetail from '../pages/FrontOffice/ProductDetail';
import RecipeDetail from '../pages/FrontOffice/RecipeDetail';
import PurchaseList from '../pages/FrontOffice/PurchaseList';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LayoutComponent />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/products" element={<Products />} />
          <Route path="/products/:productId" element={<ProductDetail />} />
          <Route path="/carts" element={<Carts />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/recipes/:recipeId" element={<RecipeDetail />} />
          <Route path="/purchase_list" element={<PurchaseList />} />

          {/* <Route path="about" element={<About />} /> */}
          {/* <Route path="contact" element={<Contact />} /> */}
          {/* <Route path="works" element={<Works />} /> */}
        </Route>
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
