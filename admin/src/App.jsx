import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import DeliverySidebar from './components/Sidebar/DeliverySidebar';
import LoginPopup from './components/LoginPopup/LoginPopup';
import { Route, Routes } from 'react-router-dom';
import Add from './pages/Add/Add';
import List from './pages/List/List';
import Orders from './pages/Orders/Orders';
import Admin from './pages/Admin/Admin';
import Customer from './pages/Customer/Customer';
import CustomerProfiles from "./pages/CustomerProfiles/CustomerProfiles";
import SupplierManagement from './pages/SupplierManagement/SupplierManagement';
import RestockAlerts from './pages/RestockAlerts/RestockAlerts';
import CancellationsRefunds from './pages/CancellationsRefunds/CancellationsRefunds';
import FeedbackResponse from './pages/FeedbackResponse/FeedbackResponse';
import RevenueTracking from './pages/RevenueTracking/RevenueTracking';
import ProfitAnalysis from './pages/ProfitAnalysis/ProfitAnalysis';
import Delivery from './pages/Delivery';
import Tracking from './components/Tracking';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddDeliveryPartner from './pages/AddDeliveryPartner';
import UserHelpAndSupport from './pages/UserHelpAndSupport';
import ProductAnalysis from './components/ProductAnalysis';

const AppContent = () => {
  const location = useLocation();
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    // Check if login details are present in localStorage
    const isLoggedIn = localStorage.getItem("loggedInPartner");

    // Show the login popup only if the path includes '/delivery' and the user is not logged in
    if (location.pathname.startsWith('/delivery') && !isLoggedIn) {
      setShowLogin(true);
    } else {
      setShowLogin(false);
    }
  }, [location.pathname]);

  return (
    <div className="app">
      <ToastContainer />
      {showLogin && <LoginPopup className='fixed' onClose={() => setShowLogin(false)} />}
      <Navbar />
      <hr />
      <div className="app-content">
        <Routes>
          <Route path='/delivery/*' element={<DeliverySidebar />} />
          <Route path='*' element={<Sidebar />} />
        </Routes>
        
        <Routes>
          <Route path="/add" element={<Add />} />
          <Route path="/list" element={<List />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/productanalysis" element={<ProductAnalysis />} />
          <Route path="/userhelpandsupport" element={<UserHelpAndSupport />} />
          <Route path="/adddeliverypartner" element={<AddDeliveryPartner />} />
          <Route path="/delivery/tracking" element={<Tracking />} />
          <Route path="/delivery/orders" element={<Orders />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="/customer-profiles" element={<CustomerProfiles />} /> 
          <Route path="/supplier-management" element={<SupplierManagement />} /> 
          <Route path="/restock-alerts" element={<RestockAlerts />} /> 
          <Route path="/cancellations-refunds" element={<CancellationsRefunds />} />
          <Route path="/feedback-response" element={<FeedbackResponse />} />
          <Route path="/revenue-tracking" element={<RevenueTracking />} />
          <Route path="/profit-analysis" element={<ProfitAnalysis />} />
          <Route path="/delivery" element={<Delivery />} />
        </Routes>
      </div>
    </div>
  );
};

const App = () => (
  <AppContent />
);

export default App;
