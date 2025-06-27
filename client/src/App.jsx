import './App.css'
import Header from './pages/Header'
import Home from './pages/Home'
import AuthForm from './pages/Login'
import { Routes, Route } from 'react-router-dom'
import Wishlist from './pages/Wishlist'
import Cart from './pages/Cart'
import Seller from './pages/Seller'
import UploadForm from './pages/UploadForm'
import MyProducts from './pages/MyProducts'
import ProductDetailPage from './pages/ProductDetailPage'
import Filter from './pages/Filter'
import FilteredProductsPage from './pages/FilteredProductPage'
import PaymentForm from './pages/Payment'
function App() {
  return (
    <>
      <Routes>
        <Route path='/login' element={<AuthForm />}></Route>
        <Route path='/' element={<Home />} />
        <Route path='/wish' element={<Wishlist />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/seller' element={<Seller />} />
        <Route path="/seller/upload" element={<UploadForm />} />
        <Route path="/seller/my-products" element={<MyProducts />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path='/filter' element={<Filter />} />
        <Route path="/products/:category" element={<FilteredProductsPage />} />
        <Route path='/payment' element={<PaymentForm />} />
      </Routes>

    </>
  )
}

export default App
