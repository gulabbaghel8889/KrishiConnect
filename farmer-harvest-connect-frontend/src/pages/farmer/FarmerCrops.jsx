import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { PageHeader, Button, Badge } from '../../components/common/UI';
import { useAuth } from '../../context/AuthContext';
import { HiOutlineLocationMarker, HiOutlineTag, HiOutlineCash, HiOutlineCube, HiOutlinePhone } from 'react-icons/hi';

const API_BASE = 'http://localhost:5001/api';

export default function FarmerCrops() {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [list, setList] = useState([]);
  
  const [form, setForm] = useState({
    cropName: '',
    category: 'Cereals',
    quantityAmount: '',
    quantityUnit: 'Quintal',
    priceAmount: '',
    priceUnit: 'per Quintal',
    locationAddress: '',
    contactPhone: '',
    description: ''
  });

  const fetchMyListings = async () => {
    try {
      const res = await fetch(`${API_BASE}/farmer/crop-listing/my`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        setList(data.data || []);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    if (token) fetchMyListings();
  }, [token]);

  const submit = async (e) => {
    e.preventDefault();

    if (!form.cropName || !form.quantityAmount || !form.priceAmount || !form.locationAddress) {
      toast.error('Please fill all required fields');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        cropName: form.cropName,
        category: form.category,
        quantity: {
          amount: Number(form.quantityAmount),
          unit: form.quantityUnit
        },
        price: {
          amount: Number(form.priceAmount),
          unit: form.priceUnit
        },
        location: {
          address: form.locationAddress
        },
        contactPhone: form.contactPhone,
        description: form.description
      };

      const res = await fetch(`${API_BASE}/farmer/crop-listing`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to post crop');
      }

      toast.success('Crop listed successfully! 🌾');
      setForm({
        cropName: '',
        category: 'Cereals',
        quantityAmount: '',
        quantityUnit: 'Quintal',
        priceAmount: '',
        priceUnit: 'per Quintal',
        locationAddress: '',
        contactPhone: '',
        description: ''
      });
      fetchMyListings();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteListing = async (id) => {
    if (!window.confirm('Are you sure you want to delete this listing?')) return;
    
    try {
      const res = await fetch(`${API_BASE}/farmer/crop-listing/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        toast.success('Listing deleted');
        fetchMyListings();
      } else {
        toast.error('Failed to delete');
      }
    } catch (error) {
      toast.error('Server error');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <PageHeader
        title="Post Crops for Sale"
        subtitle="List your harvest to reach thousands of potential buyers across the country."
      />

      <div className="grid lg:grid-cols-5 gap-8">
        {/* Form Section */}
        <form onSubmit={submit} className="lg:col-span-3 card space-y-5">
          <h3 className="text-lg font-bold text-gray-900 border-b pb-2">Listing Details</h3>
          
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="form-label flex items-center gap-1.5"><HiOutlineTag className="text-forest-600" /> Crop Name</label>
              <input
                className="form-input"
                placeholder="e.g. Wheat (Sarbati)"
                value={form.cropName}
                onChange={(e) => setForm({ ...form, cropName: e.target.value })}
              />
            </div>

            <div className="space-y-1">
              <label className="form-label">Category</label>
              <select 
                className="form-select"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              >
                {['Cereals', 'Pulses', 'Oilseeds', 'Vegetables', 'Fruits', 'Cash Crops', 'Other'].map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="form-label flex items-center gap-1.5"><HiOutlineCube className="text-forest-600" /> Quantity</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  className="form-input flex-1"
                  placeholder="Amount"
                  value={form.quantityAmount}
                  onChange={(e) => setForm({ ...form, quantityAmount: e.target.value })}
                />
                <select 
                  className="form-select w-28"
                  value={form.quantityUnit}
                  onChange={(e) => setForm({ ...form, quantityUnit: e.target.value })}
                >
                  <option>Quintal</option>
                  <option>Ton</option>
                  <option>Kg</option>
                  <option>Bag</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="form-label flex items-center gap-1.5"><HiOutlineCash className="text-forest-600" /> Price</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  className="form-input flex-1"
                  placeholder="Price"
                  value={form.priceAmount}
                  onChange={(e) => setForm({ ...form, priceAmount: e.target.value })}
                />
                <select 
                  className="form-select w-32 text-sm"
                  value={form.priceUnit}
                  onChange={(e) => setForm({ ...form, priceUnit: e.target.value })}
                >
                  <option>per Quintal</option>
                  <option>per Ton</option>
                  <option>per Kg</option>
                  <option>per Bag</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="form-label flex items-center gap-1.5"><HiOutlineLocationMarker className="text-forest-600" /> Pickup Location</label>
              <input
                className="form-input"
                placeholder="Full address where crop is stored"
                value={form.locationAddress}
                onChange={(e) => setForm({ ...form, locationAddress: e.target.value })}
              />
            </div>

            <div className="space-y-1">
              <label className="form-label flex items-center gap-1.5"><HiOutlinePhone className="text-forest-600" /> Contact Phone</label>
              <input
                className="form-input"
                placeholder="Mobile number for buyers"
                value={form.contactPhone}
                onChange={(e) => setForm({ ...form, contactPhone: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="form-label text-sm font-medium text-gray-700">Description (Optional)</label>
            <textarea
              className="form-input min-h-[100px] resize-none"
              placeholder="Describe quality, moisture content, or harvest date..."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>

          <Button type="submit" loading={loading} className="w-full py-3 text-lg">
            🚀 Post Listing
          </Button>
        </form>

        {/* Listings Sidebar */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-lg font-bold text-gray-900 flex items-center justify-between">
            Your Active Listings
            <Badge variant="blue">{list.length}</Badge>
          </h3>

          {fetching ? (
            <div className="flex flex-col items-center py-10 text-gray-400">
              <div className="animate-spin h-6 w-6 border-2 border-forest-500 border-t-transparent rounded-full mb-2"></div>
              <p>Loading listings...</p>
            </div>
          ) : list.length === 0 ? (
            <div className="card text-center py-10 bg-gray-50 border-dashed">
              <p className="text-gray-500 italic">No listings yet.</p>
            </div>
          ) : (
            <div className="space-y-3 overflow-y-auto max-h-[600px] pr-2">
              {list.map((item) => (
                <div key={item._id} className="card p-4 hover:shadow-md transition-shadow group relative">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-gray-900 capitalize">{item.cropName}</h4>
                    <Badge variant={item.status === 'active' ? 'green' : 'yellow'}>{item.status}</Badge>
                  </div>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p className="flex justify-between">
                      <span>Quantity:</span>
                      <span className="font-medium text-gray-900">{item.quantity?.amount} {item.quantity?.unit}</span>
                    </p>
                    <p className="flex justify-between">
                      <span>Price:</span>
                      <span className="font-medium text-forest-700">₹{item.price?.amount} {item.price?.unit}</span>
                    </p>
                    <p className="text-xs text-gray-400 mt-2 line-clamp-1">
                      📍 {item.location?.address}
                    </p>
                    {item.contactPhone && (
                      <p className="text-xs text-forest-600 font-medium mt-1">
                        📞 {item.contactPhone}
                      </p>
                    )}
                  </div>
                  <button 
                    onClick={() => deleteListing(item._id)}
                    className="absolute top-2 right-2 p-1 text-red-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Delete listing"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}