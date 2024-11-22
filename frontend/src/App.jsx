import React, { useState } from 'react';
import Home from './pages/Home/Home';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Cart from './pages/Cart/Cart';
import LoginPopup from './components/LoginPopup/LoginPopup';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import MyOrders from './pages/MyOrders/MyOrders';
import DeliveryDetails from './pages/DeliveryDetails/DeliveryDetails';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './pages/Verify/Verify';
import About from './pages/About/About';
import Delivery from './pages/Delivery/Delivery';
import PrivacyPolicy from './pages/PrivacyPolicy/PrivacyPolicy';
import SearchResults from './pages/SearchResults/SearchResults';
import PromoCode from './components/PromoCode/PromoCode';
import { ThemeProvider } from './Context/ThemeContext';
import ThemeToggleButton from './components/ThemeToggleButton/ThemeToggleButton';
import TermsConditions from './pages/TermsConditions/TermsConditions';
import CookiePolicy from './pages/CookiePolicy/CookiePolicy';
import TrackOrder from './pages/TrackOrder/TrackOrder';
import ChatBot from './pages/HelpSupport/ChatBot'; // Import ChatBot component
import './App.css';
import HelpAndSupport from './pages/HelpAndSupport';

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  // Food items array
  const foodList = [
    { id: 1, name: 'Samosa', category: 'Snacks' },
    { id: 2, name: 'Vada Pav', category: 'Snacks' },
    { id: 3, name: 'Dhokla', category: 'Snacks' },
    { id: 4, name: 'Poha', category: 'Snacks' },
    { id: 5, name: 'Pav Bhaji', category: 'Main Dishes' },
    { id: 6, name: 'Chole Bhature', category: 'Main Dishes' },
    { id: 7, name: 'Dosa', category: 'Main Dishes' },
    { id: 8, name: 'Pulao', category: 'Main Dishes' },
    { id: 9, name: 'Gulab Jamun', category: 'Desserts' },
    { id: 10, name: 'Fruit Custard', category: 'Desserts' },
    { id: 11, name: 'Sooji Halva', category: 'Desserts' },
    { id: 12, name: 'Vanilla Ice Cream', category: 'Desserts' },
    { id: 13, name: 'Maggie', category: 'Fast Food' },
    { id: 14, name: 'Pasta', category: 'Fast Food' },
    { id: 15, name: 'Grilled Sandwich', category: 'Fast Food' },
    { id: 16, name: 'Pizza', category: 'Fast Food' },
    { id: 17, name: 'Tea', category: 'Beverages' },
    { id: 18, name: 'Coffee', category: 'Beverages' },
    { id: 19, name: 'Lemonade', category: 'Beverages' },
    { id: 20, name: 'Milkshake', category: 'Beverages' },
    { id: 21, name: 'Chapati Bhaji', category: 'Healthy Options' },
    { id: 22, name: 'Aloo Paratha', category: 'Healthy Options' },
    { id: 23, name: 'Paneer Roll', category: 'Healthy Options' },
    { id: 24, name: 'Rajma Chawal', category: 'Healthy Options' },
    { id: 25, name: 'Aloo Tikki', category: 'Street Food' },
    { id: 26, name: 'Pani Puri', category: 'Street Food' },
    { id: 27, name: 'Misal Pav', category: 'Street Food' },
    { id: 28, name: 'Ragda Pattice', category: 'Street Food' },
    { id: 29, name: 'Dal Makhni', category: 'Indian Cuisine' },
    { id: 30, name: 'Kadhi Pakora', category: 'Indian Cuisine' },
    { id: 31, name: 'Kofta', category: 'Indian Cuisine' },
    { id: 32, name: 'Paneer Lababdar', category: 'Indian Cuisine' },
  ];

  return (
    <ThemeProvider>
      <ToastContainer />
      {/* <div className='relative'> */}



        {showLogin && (
          <div className="fixed z-50 w-[100vw]">
            <LoginPopup setShowLogin={setShowLogin} />
          </div>
        )}
        <div className="app relative z-20">
          <Navbar setShowLogin={setShowLogin} items={foodList} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order" element={<PlaceOrder />} />
            <Route path="/myorders" element={<MyOrders />} />
            <Route path="/myorders/delivery-details/:orderId" element={<DeliveryDetails />} />
            {/* <Route path="/track-order/:orderId" element={<TrackOrder />} /> */}
            <Route path="/track-order/:orderId" element={<DeliveryDetails />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/about" element={<About />} />
            <Route path="/delivery" element={<Delivery />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/search" element={<SearchResults items={foodList} />} />
            <Route path="/promo-code" element={<PromoCode />} />
            <Route path="/terms-conditions" element={<TermsConditions />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />
            <Route path="/help" element={<HelpAndSupport />} /> {/* ChatBot route */}
          </Routes>
        </div>
        <Footer />
      {/* </div> */}
      {/* {showLogin && <LoginPopup setShowLogin={setShowLogin} />} */}
    </ThemeProvider>
  );
};

export default App;
