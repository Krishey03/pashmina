import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import ProductsListingPage from './Pages/ProductListing';
import AdminAddProductPage from './Admin-Pages/AdminProducts';
import ProductDetail from './Pages/ProductDetail';
import TestPage from './Pages/test';
import AdminHandpickedManager from './Admin-Pages/AdminHandpick';
import ContactSection from './Pages/Contact';
import AboutPage from './Pages/About';
import ScrollToTop from './Components/ScrollToTop';
import TermsAndPolicies from './Pages/TermsAndPolicies.jsx';
import Privacy from './Pages/Privacy.jsx';

function App() {

  return (
    <BrowserRouter>
    <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/products" element={<ProductsListingPage />} />
        <Route path="/admin/add-product" element={<AdminAddProductPage />} />
        <Route path="/admin/handpick" element={<AdminHandpickedManager />} />
        <Route path="/contact" element={<ContactSection />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/terms" element={<TermsAndPolicies />} />
        <Route path="/policy" element={<Privacy />} />
        <Route path="/test" element={<TestPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
