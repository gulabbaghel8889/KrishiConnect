import { useState, useEffect } from 'react';
import { PageHeader, Badge, Button } from '../../components/common/UI';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import { HiOutlineCheck, HiOutlineX, HiOutlineTruck, HiOutlineClock, HiOutlinePhone, HiOutlineLocationMarker } from 'react-icons/hi';

const API_BASE = 'http://localhost:5001/api';

export default function AdminTreeRequests() {
  const { token } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      const res = await fetch(`${API_BASE}/admin/tree-requests`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setRequests(data.data);
      }
    } catch (error) {
      toast.error('Failed to fetch requests');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleUpdateStatus = async (id, status) => {
    try {
      const res = await fetch(`${API_BASE}/admin/tree-requests/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });
      const data = await res.json();
      if (data.success) {
        toast.success(`Request marked as ${status}`);
        fetchRequests();
      }
    } catch (error) {
      toast.error('Update failed');
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Pending':   return <Badge variant="warning">{status}</Badge>;
      case 'Approved':  return <Badge variant="info">{status}</Badge>;
      case 'Shipped':   return <Badge variant="purple">{status}</Badge>;
      case 'Delivered': return <Badge variant="success">{status}</Badge>;
      case 'Cancelled': return <Badge variant="danger">{status}</Badge>;
      default:          return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 py-8">
      <PageHeader
        title="Tree Purchase Requests"
        subtitle="Manage and fulfill tree purchase requests from farmers and buyers."
      />

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
      ) : requests.length === 0 ? (
        <div className="card text-center py-20 bg-gray-50 border-dashed border-2">
          <HiOutlineClock className="mx-auto text-4xl text-gray-300 mb-4" />
          <p className="text-gray-500 font-medium">No purchase requests found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {requests.map(request => (
            <div key={request._id} className="card bg-white hover:shadow-xl transition-all duration-300 border-l-4 border-purple-500 overflow-hidden">
               <div className="flex flex-col md:flex-row gap-6">
                  {/* Tree Info */}
                  <div className="w-full md:w-48 h-48 md:h-auto flex-shrink-0 relative overflow-hidden rounded-xl">
                      <img src={request.tree?.image} alt="" className="w-full h-full object-cover" />
                      <div className="absolute top-2 left-2">
                         {getStatusBadge(request.status)}
                      </div>
                  </div>

                  {/* Request Details */}
                  <div className="flex-1 space-y-4 py-2">
                     <div className="flex justify-between items-start">
                        <div>
                           <h3 className="text-xl font-bold text-gray-900">{request.tree?.name}</h3>
                           <p className="text-sm text-gray-500">Requested on {new Date(request.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div className="text-right">
                           <p className="text-2xl font-display font-black text-purple-700">₹{request.totalPrice}</p>
                           <p className="text-sm font-semibold text-gray-600">{request.quantity} Units</p>
                        </div>
                     </div>

                     <div className="grid md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                        <div className="space-y-2">
                           <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Customer Details</p>
                           <p className="font-bold text-gray-800">{request.fullName}</p>
                           <p className="text-sm flex items-center gap-2 text-gray-600">
                              <HiOutlinePhone className="text-purple-500" /> {request.phone}
                           </p>
                           <p className="text-sm text-gray-500 italic">User Role: {request.user?.role || 'User'}</p>
                        </div>
                        <div className="space-y-2">
                           <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Shipping Address</p>
                           <p className="text-sm flex items-start gap-2 text-gray-600 leading-relaxed">
                              <HiOutlineLocationMarker className="text-purple-500 mt-1 flex-shrink-0" />
                              {request.shippingAddress}
                           </p>
                        </div>
                     </div>

                     {/* Actions */}
                     <div className="flex flex-wrap gap-2 pt-2">
                        {request.status === 'Pending' && (
                           <button 
                            onClick={() => handleUpdateStatus(request._id, 'Approved')}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-green-700 transition-all"
                           >
                              <HiOutlineCheck /> Approve
                           </button>
                        )}
                        {request.status === 'Approved' && (
                           <button 
                            onClick={() => handleUpdateStatus(request._id, 'Shipped')}
                            className="px-4 py-2 bg-purple-600 text-white rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-purple-700 transition-all"
                           >
                              <HiOutlineTruck /> Mark Shipped
                           </button>
                        )}
                        {request.status === 'Shipped' && (
                           <button 
                            onClick={() => handleUpdateStatus(request._id, 'Delivered')}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-blue-700 transition-all"
                           >
                              <HiOutlineCheck /> Mark Delivered
                           </button>
                        )}
                        {request.status !== 'Cancelled' && request.status !== 'Delivered' && (
                           <button 
                            onClick={() => handleUpdateStatus(request._id, 'Cancelled')}
                            className="px-4 py-2 bg-red-50 text-red-600 rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-red-100 transition-all"
                           >
                              <HiOutlineX /> Cancel
                           </button>
                        )}
                     </div>
                  </div>
               </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
