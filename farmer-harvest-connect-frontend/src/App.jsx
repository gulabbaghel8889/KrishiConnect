
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Layouts
import PublicLayout   from './layouts/PublicLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Public Pages
import Home    from './pages/public/Home';
import About   from './pages/public/About';
import Contact from './pages/public/Contact';

// Auth Pages
import FarmerAuth   from './pages/auth/FarmerAuth';
import BuyerAuth    from './pages/auth/BuyerAuth';
import ProviderAuth from './pages/auth/ProviderAuth';
import AdminLogin   from './pages/auth/AdminLogin';

// Farmer Dashboard
import FarmerDashboard  from './pages/farmer/Dashboard';
import PostHarvest      from './pages/farmer/PostHarvest';
import FarmerOffers from './pages/farmer/FarmerOffers';
import FarmerCrops from './pages/farmer/FarmerCrops';
import FarmerBuyerOffers from './pages/farmer/FarmerBuyerOffers';
import FarmerFeedback from './pages/farmer/FarmerFeedback';
import FarmerProfile from './pages/farmer/FarmerProfile';
import PostService from './pages/service-provider/PostService';
import FarmerRequests from './pages/service-provider/FarmerRequests';
import Bookings from './pages/service-provider/Bookings';
import ProviderFeedback from './pages/service-provider/Feedback';
import ProviderProfile from './pages/service-provider/Profile';
import ProviderDashboard from './pages/service-provider/Dashboard';
import BuyerDashboard from './pages/buyer/Dashboard';
import BuyerListings from './pages/buyer/BuyerListings';
import BuyerChat from './pages/buyer/BuyerChat';
import BuyerOrders from './pages/buyer/BuyerOrders';
import BuyerReviews from './pages/buyer/BuyerReviews';
import BuyerProfile from './pages/buyer/BuyerProfile';
import AdminDashboard from './pages/admin/Dashboard';
import AdminUsers from './pages/admin/Users';
import AdminTransactions from './pages/admin/Transactions';
import AdminDisputes from './pages/admin/Disputes';
import AdminListings from './pages/admin/Listings';
import AdminTrees from './pages/admin/TreePosting';
import TreeExplorer from './pages/TreeExplorer';
import FarmerOrders from './pages/farmer/FarmerOrders';
import ChatPage from './pages/chat/ChatPage';
const ProtectedRoute = ({ children, role }) => {
  const { user, isAuthenticated } = useAuth();
  
  console.log('ProtectedRoute Check:', { 
    path: window.location.pathname,
    isAuthenticated, 
    requiredRole: role, 
    userRole: user?.role 
  });

  if (!isAuthenticated) {
    console.warn('ProtectedRoute: Not authenticated, redirecting to /');
    return <Navigate to="/" replace />;
  }
  
  if (role && user?.role !== role) {
    console.warn(`ProtectedRoute: Role mismatch (expected ${role}, got ${user?.role}), redirecting to /`);
    return <Navigate to="/" replace />;
  }
  
  return children;
};

export default function App() {
  return (
    <Routes>
      {/* Public */}
      <Route element={<PublicLayout />}>
        <Route path="/"        element={<Home />} />
        <Route path="/about"   element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      {/* Auth */}
      <Route path="/auth/farmer"   element={<FarmerAuth />} />
      <Route path="/auth/buyer"    element={<BuyerAuth />} />
      <Route path="/auth/provider" element={<ProviderAuth />} />
      <Route path="/auth/admin"    element={<AdminLogin />} />

      {/* Farmer Dashboard */}
      <Route path="/farmer" element={
        <ProtectedRoute role="farmer"><DashboardLayout role="farmer" /></ProtectedRoute>
      }>
        <Route index             element={<FarmerDashboard />} />
        <Route path="harvest"    element={<PostHarvest />} />
         <Route path="offers" element={<FarmerOffers />} />
         <Route path="crops" element={<FarmerCrops />} />
         <Route path="buyerOffers" element={<FarmerBuyerOffers />} />
         <Route path="feedback" element={<FarmerFeedback />} />
         <Route path="profile" element={<FarmerProfile />} />
         <Route path="orders" element={<FarmerOrders />} />
         <Route path="tree-explorer" element={<TreeExplorer />} />
      </Route>

        {/* Provider Dashboard */}
        <Route
          path="/provider"
          element={
            <ProtectedRoute role="provider">
              <DashboardLayout role="provider" />
            </ProtectedRoute>
          }
        >
          <Route index element={<ProviderDashboard />} />
          <Route path="service" element={<PostService />} />
          <Route path="requests" element={<FarmerRequests />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="feedback" element={<ProviderFeedback />} />
           <Route path="profile" element={<ProviderProfile />} />
           <Route path="tree-explorer" element={<TreeExplorer />} />
          
        </Route>

        {/* Buyer Dashboard */}
        <Route
          path="/buyer"
          element={
            <ProtectedRoute role="buyer">
              <DashboardLayout role="buyer" />
            </ProtectedRoute>
          }
        >
  <Route index element={<BuyerDashboard />} />
  <Route path="listings" element={<BuyerListings />} />
  <Route path="chat" element={<BuyerChat />} />
<Route path="orders" element={<BuyerOrders />} />
  <Route path="reviews" element={<BuyerReviews />} />
  <Route path="profile" element={<BuyerProfile />} />
  <Route path="tree-explorer" element={<TreeExplorer />} />
</Route>  

<Route
  path="/admin"
  element={
    <ProtectedRoute role="admin">
      <DashboardLayout role="admin" />
    </ProtectedRoute>
  }
>
  <Route index element={<AdminDashboard />} />
  <Route path="users" element={<AdminUsers />} />
  <Route path="transactions" element={<AdminTransactions />} />
  <Route path="disputes" element={<AdminDisputes />} />
  <Route path="listings" element={<AdminListings />} />
  <Route path="trees" element={<AdminTrees />} />
  <Route path="tree-explorer" element={<TreeExplorer />} />
</Route>

<Route path="/chat" element={<ChatPage />} />


      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
