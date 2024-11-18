import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import { Route, Routes } from 'react-router-dom';
import Add from './pages/Add/Add';
import List from './pages/List/List';
import Orders from './pages/Orders/Orders';
import Admin from './pages/Admin/Admin';
import Customer from './pages/Customer/Customer';
import CustomerProfiles from "./pages/CustomerProfiles/CustomerProfiles"; // Import CustomerProfiles component
import SupplierManagement from './pages/SupplierManagement/SupplierManagement'; // Import SupplierManagement component
import RestockAlerts from './pages/RestockAlerts/RestockAlerts'; // Import RestockAlerts component
import CancellationsRefunds from './pages/CancellationsRefunds/CancellationsRefunds';
import FeedbackResponse from './pages/FeedbackResponse/FeedbackResponse';
import RevenueTracking from './pages/RevenueTracking/RevenueTracking';
import ProfitAnalysis from './pages/ProfitAnalysis/ProfitAnalysis';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div className="app">
      <ToastContainer />
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route path="/add" element={<Add />} />
          <Route path="/list" element={<List />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="/customer-profiles" element={<CustomerProfiles />} /> 
          <Route path="/supplier-management" element={<SupplierManagement />} /> 
          <Route path="/restock-alerts" element={<RestockAlerts />} /> 
          <Route path="/cancellations-refunds" element={<CancellationsRefunds />} />
          <Route path="/feedback-response" element={<FeedbackResponse />} />
          <Route path="/revenue-tracking" element={<RevenueTracking />} />
          <Route path="/profit-analysis" element={<ProfitAnalysis />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
