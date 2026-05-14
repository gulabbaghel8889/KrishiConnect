import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { PageHeader, Button, Badge } from '../../components/common/UI';
import ChatModal from '../../components/common/ChatModal';
import RatingModal from '../../components/common/RatingModal';
import { useAuth } from '../../context/AuthContext';
import { HiOutlineUser, HiOutlinePhone, HiOutlineCube, HiOutlineCash, HiOutlineCalendar, HiOutlineChatAlt2, HiOutlineStar } from 'react-icons/hi';
import { API_URL } from '../../config';

export default function FarmerOrders() {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Chat Modal State
  const [showChatModal, setShowChatModal] = useState(false);
  const [chatTarget, setChatTarget] = useState(null);

  // Rating Modal State
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [ratingTarget, setRatingTarget] = useState(null);

  const fetchOrders = async () => {
    try {
      const res = await fetch(
        `${API_URL}/farmer-orders`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      const data = await res.json();

      if (data.success) {
        setOrders(data.requests);
      }
    } catch (error) {
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchOrders();
  }, [token]);

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(
        `${API_URL}/farmer-orders/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ status }),
        }
      );

      const data = await res.json();

      if (data.success) {
        toast.success(`Order ${status}`);
        fetchOrders();
      }
    } catch (error) {
      toast.error('Action failed');
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto px-4 py-8">
      <PageHeader
        title="Purchase Requests"
        subtitle="Manage incoming buyer requests and verify payments."
      />

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-forest-600"></div>
        </div>
      ) : orders.length === 0 ? (
        <div className="card text-center py-20 bg-gray-50 border-dashed">
           <div className="text-4xl mb-4">📄</div>
           <h3 className="text-lg font-bold text-gray-900">No requests yet</h3>
           <p className="text-gray-500">Your crop listings haven't received any orders yet.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <div key={order._id} className="card border-t-4 border-forest-500 hover:shadow-xl transition-all duration-300 flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-display font-bold text-lg text-gray-900">
                    {order.listingId?.cropName || 'Deleted Crop'}
                  </h3>
                  <p className="text-xs text-gray-400">ID: {order._id.slice(-8).toUpperCase()}</p>
                </div>

                <Badge
                  variant={
                    order.paymentStatus === 'verified'
                      ? 'green'
                      : order.paymentStatus === 'disputed'
                      ? 'red'
                      : 'yellow'
                  }
                >
                  {order.paymentStatus}
                </Badge>
              </div>

              <div className="space-y-3 mb-6 flex-1">
                <div className="flex items-center gap-3 text-sm">
                   <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-forest-600">
                      <HiOutlineUser />
                   </div>
                   <div>
                     <p className="text-xs text-gray-400">Buyer</p>
                     <p className="font-semibold text-gray-800">{order.buyerId?.name || 'Unknown Buyer'}</p>
                   </div>
                </div>

                <div className="flex items-center gap-3 text-sm">
                   <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-forest-600">
                      <HiOutlinePhone />
                   </div>
                   <div>
                     <p className="text-xs text-gray-400">Contact</p>
                     <p className="font-medium text-gray-800">{order.buyerId?.phone || 'No phone'}</p>
                   </div>
                </div>

                <div className="flex items-center gap-3 text-sm">
                   <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-forest-600">
                      <HiOutlineCube />
                   </div>
                   <div>
                     <p className="text-xs text-gray-400">Order Quantity</p>
                     <p className="font-semibold text-gray-900">{order.quantity?.amount} {order.quantity?.unit}</p>
                   </div>
                </div>

                <div className="flex items-center gap-3 text-sm">
                   <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-forest-600">
                      <HiOutlineCash />
                   </div>
                   <div>
                     <p className="text-xs text-gray-400">Total Price</p>
                     <p className="font-bold text-forest-700 text-lg">₹{order.totalAmount?.toLocaleString('en-IN')}</p>
                   </div>
                </div>

                <div className="flex items-center gap-3 text-sm">
                   <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-forest-600">
                      <HiOutlineCalendar />
                   </div>
                   <div>
                     <p className="text-xs text-gray-400">Requested On</p>
                     <p className="font-medium text-gray-800">{new Date(order.createdAt).toLocaleDateString()}</p>
                   </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100">
                {order.paymentStatus === 'pending' && (
                  <>
                    <Button
                      className="flex-1"
                      onClick={() => updateStatus(order._id, 'accepted')}
                    >
                      Accept
                    </Button>
                    <button
                      className="btn-ghost flex-1 text-red-600 hover:bg-red-50"
                      onClick={() => updateStatus(order._id, 'rejected')}
                    >
                      Reject
                    </button>
                  </>
                )}
                
                {order.paymentStatus === 'verified' && (
                   <button 
                      onClick={() => {
                        setRatingTarget({
                          targetId: order.buyerId?._id,
                          targetType: 'user',
                          purchaseId: order._id,
                          title: `Rate Buyer: ${order.buyerId?.name}`
                        });
                        setShowRatingModal(true);
                      }}
                      className="btn-outline border-yellow-500 text-yellow-600 hover:bg-yellow-50 text-xs py-2 px-3 flex items-center gap-1 flex-1"
                   >
                     <HiOutlineStar /> Rate Buyer
                   </button>
                )}

                <button
                  onClick={() => {
                    setChatTarget(order);
                    setShowChatModal(true);
                  }}
                  className="w-10 h-10 rounded-xl bg-gray-100 text-forest-600 flex items-center justify-center hover:bg-forest-100 transition-colors"
                  title="Chat with Buyer"
                >
                  <HiOutlineChatAlt2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Chat Modal */}
      {chatTarget && (
        <ChatModal
          open={showChatModal}
          onClose={() => setShowChatModal(false)}
          otherUserId={chatTarget.buyerId?._id}
          cropId={chatTarget.listingId?._id}
          cropName={chatTarget.listingId?.cropName}
          otherUserName={chatTarget.buyerId?.name}
        />
      )}

      {/* Rating Modal */}
      {ratingTarget && (
        <RatingModal
          open={showRatingModal}
          onClose={() => setShowRatingModal(false)}
          {...ratingTarget}
        />
      )}
    </div>
  );
}