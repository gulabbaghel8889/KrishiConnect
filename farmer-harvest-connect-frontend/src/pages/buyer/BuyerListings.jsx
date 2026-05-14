import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { PageHeader, Button, Badge, Modal, Input } from '../../components/common/UI';
import ChatModal from '../../components/common/ChatModal';
import { useAuth } from '../../context/AuthContext';
import { HiOutlineLocationMarker, HiOutlinePhone, HiOutlineScale, HiOutlineCash, HiOutlineClipboardList, HiOutlineChatAlt2 } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { API_URL as API_BASE } from '../../config';

export default function BuyerListings() {
  const { token, user } = useAuth();
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  // Order Modal State
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);
  const [orderQuantity, setOrderQuantity] = useState('');
  const [orderLoading, setOrderLoading] = useState(false);

  // Chat Modal State
  const [showChatModal, setShowChatModal] = useState(false);
  const [chatTarget, setChatTarget] = useState(null);

  const fetchListings = async () => {
    try {
      const url = search 
        ? `${API_BASE}/buyer/listings?search=${encodeURIComponent(search)}`
        : `${API_BASE}/buyer/listings`;
        
      const res = await fetch(url);
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || 'Failed to load listings');
        return;
      }

      setListings(data);
    } catch (error) {
      toast.error('Server error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchListings();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  const handleOrderClick = (item) => {
    if (!token) {
      toast.error('Please login as a buyer to place an order');
      return;
    }
    setSelectedListing(item);
    setOrderQuantity('');
    setShowOrderModal(true);
  };

  const submitOrder = async (e) => {
    e.preventDefault();
    if (!orderQuantity || orderQuantity <= 0) {
      toast.error('Please enter a valid quantity');
      return;
    }

    if (orderQuantity > selectedListing.quantity.amount) {
      toast.error(`Only ${selectedListing.quantity.amount} ${selectedListing.quantity.unit} available`);
      return;
    }

    setOrderLoading(true);
    try {
      const res = await fetch(`${API_BASE}/buyer/direct-purchase`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          listingId: selectedListing._id,
          quantityAmount: Number(orderQuantity),
          notes: `Direct order for ${selectedListing.cropName}`
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Order failed');
      }

      toast.success('Purchase Order created successfully! 📄');
      setShowOrderModal(false);
      navigate('/buyer/orders');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setOrderLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PageHeader
        title="Marketplace"
        subtitle="Browse fresh crops directly from farmers across India. Get the best prices with zero middleman."
      />

      {/* Search Bar */}
      <div className="relative max-w-2xl mx-auto mb-8">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          className="form-input pl-10 py-3 text-lg shadow-sm focus:ring-forest-500 focus:border-forest-500 block w-full rounded-2xl"
          placeholder="Search for crops (e.g. Wheat, Rice) or location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-forest-600"></div>
          <p className="mt-4 text-gray-500 font-medium">Fetching fresh listings...</p>
        </div>
      ) : listings.length === 0 ? (
        <div className="text-center py-20 card bg-gray-50 border-dashed">
          <div className="text-5xl mb-4">🌾</div>
          <h3 className="text-xl font-bold text-gray-900">No crops listed yet</h3>
          <p className="text-gray-500 mt-2">Check back later or try adjusting your search.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((item) => (
            <div key={item._id} className="card hover:shadow-xl transition-all duration-300 border-t-4 border-forest-500 group">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-display font-bold text-xl text-gray-900 group-hover:text-forest-700 transition-colors">
                    {item.cropName}
                  </h3>
                  <p className="text-sm text-forest-600 font-medium bg-forest-50 inline-block px-2 py-0.5 rounded-full mt-1">
                    {item.category || 'Other'}
                  </p>
                </div>
                <Badge variant={item.status === 'active' ? 'green' : 'yellow'}>
                  {item.status}
                </Badge>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-gray-600">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                    <HiOutlineScale className="text-forest-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Available Quantity</p>
                    <p className="font-semibold text-gray-900">{item.quantity?.amount} {item.quantity?.unit}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-gray-600">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                    <HiOutlineCash className="text-forest-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Price Expectation</p>
                    <p className="font-bold text-forest-700 text-lg">₹{item.price?.amount} <span className="text-sm font-normal text-gray-500">{item.price?.unit}</span></p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-gray-600">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                    <HiOutlineLocationMarker className="text-forest-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Location</p>
                    <p className="text-sm font-medium text-gray-800 line-clamp-1">
                      {item.location?.district ? `${item.location.district}, ${item.location.state}` : item.location?.address}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-100">
                   <p className="text-xs text-gray-400 mb-1">Farmer</p>
                   <div className="flex items-center justify-between">
                     <p className="font-medium text-gray-900">{item.farmerId?.name || 'Local Farmer'}</p>
                     {(item.contactPhone || item.farmerId?.phone) && (
                       <a href={`tel:${item.contactPhone || item.farmerId.phone}`} className="text-forest-600 hover:text-forest-700">
                         <HiOutlinePhone className="w-5 h-5" />
                       </a>
                     )}
                   </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button 
                  onClick={() => handleOrderClick(item)}
                  className="flex-1 shadow-lg shadow-forest-100 group-hover:scale-[1.02] transition-transform"
                >
                  Buy Now
                </Button>
                <button
                  onClick={() => {
                    setChatTarget(item);
                    setShowChatModal(true);
                  }}
                  className="w-12 h-12 rounded-2xl bg-white border-2 border-forest-100 text-forest-600 flex items-center justify-center hover:bg-forest-50 transition-colors shadow-sm"
                  title="Chat with Farmer"
                >
                  <HiOutlineChatAlt2 className="w-6 h-6" />
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
          otherUserId={chatTarget.farmerId?._id}
          cropId={chatTarget._id}
          cropName={chatTarget.cropName}
          otherUserName={chatTarget.farmerId?.name}
        />
      )}

      {/* Purchase Order Modal */}
      <Modal
        open={showOrderModal}
        onClose={() => setShowOrderModal(false)}
        title={`Place Purchase Order: ${selectedListing?.cropName}`}
      >
        <form onSubmit={submitOrder} className="space-y-6">
          <div className="p-4 bg-forest-50 rounded-2xl border border-forest-100 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Price:</span>
              <span className="font-bold text-forest-700">₹{selectedListing?.price?.amount} {selectedListing?.price?.unit}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Available:</span>
              <span className="font-medium text-gray-700">{selectedListing?.quantity?.amount} {selectedListing?.quantity?.unit}</span>
            </div>
          </div>

          <div className="space-y-2">
             <label className="form-label flex items-center gap-2">
                <HiOutlineScale className="text-forest-600" />
                Quantity you want to buy ({selectedListing?.quantity?.unit})
             </label>
             <input
                type="number"
                className="form-input text-lg font-bold"
                placeholder={`Enter amount in ${selectedListing?.quantity?.unit}`}
                value={orderQuantity}
                onChange={(e) => setOrderQuantity(e.target.value)}
                min="1"
                max={selectedListing?.quantity?.amount}
                required
             />
          </div>

          <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
            <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-2">Farmer Contact Info</p>
            <div className="flex items-center justify-between">
               <div>
                 <p className="font-bold text-gray-900">{selectedListing?.farmerId?.name}</p>
                 <p className="text-sm text-forest-600 font-medium">{selectedListing?.contactPhone || selectedListing?.farmerId?.phone}</p>
               </div>
               <div className="w-10 h-10 rounded-full bg-forest-100 flex items-center justify-center text-forest-600">
                  <HiOutlinePhone className="w-6 h-6" />
               </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              loading={orderLoading}
              className="flex-1 py-4 text-lg"
              icon={HiOutlineClipboardList}
            >
              Confirm Purchase Order
            </Button>
            <button
              type="button"
              onClick={() => setShowOrderModal(false)}
              className="btn-ghost px-6"
            >
              Cancel
            </button>
          </div>
          
          <p className="text-[10px] text-gray-400 text-center uppercase tracking-widest font-bold">
            Note: This will create a formal purchase order. The farmer will be notified.
          </p>
        </form>
      </Modal>
    </div>
  );
}