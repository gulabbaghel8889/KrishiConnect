import { useState, useEffect } from 'react';
import { PageHeader, Badge, Button } from '../components/common/UI';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { HiOutlineCurrencyRupee, HiOutlineBookOpen, HiOutlineInformationCircle, HiOutlineShoppingCart, HiOutlineX } from 'react-icons/hi';
import { GiOakLeaf } from 'react-icons/gi';
import { API_URL as API_BASE } from '../config';

export default function TreeExplorer() {
  const { token, user } = useAuth();
  const [trees, setTrees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTree, setSelectedTree] = useState(null);
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [buyTree, setBuyTree] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const [requestForm, setRequestForm] = useState({
    quantity: 1,
    fullName: user?.name || '',
    phone: user?.phone || '',
    shippingAddress: '',
  });

  const fetchTrees = async () => {
    try {
      const res = await fetch(`${API_BASE}/trees`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setTrees(data.data);
      }
    } catch (error) {
      toast.error('Failed to fetch tree information');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrees();
  }, []);

  const handleBuyClick = (tree) => {
    setBuyTree(tree);
    setShowBuyModal(true);
    setRequestForm({
        ...requestForm,
        quantity: 1
    });
  };

  const handleRequestSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch(`${API_BASE}/trees/request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          treeId: buyTree._id,
          ...requestForm
        })
      });
      const data = await res.json();
      if (data.success) {
        toast.success('Tree purchase request submitted!');
        setShowBuyModal(false);
        setBuyTree(null);
      }
    } catch (error) {
      toast.error('Submission failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 py-8">
      <PageHeader
        title="Tree Explorer"
        subtitle="Discover tree species and send purchase requests directly to the platform."
      />

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-forest-600"></div>
        </div>
      ) : trees.length === 0 ? (
        <div className="card text-center py-20 bg-gray-50 border-dashed border-2">
          <GiOakLeaf className="mx-auto text-4xl text-gray-300 mb-4" />
          <p className="text-gray-500 font-medium">No tree information available yet. Check back later!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trees.map(tree => (
            <div key={tree._id} className="card group hover:shadow-2xl transition-all duration-500 border-none bg-white flex flex-col overflow-hidden ring-1 ring-gray-100">
              {tree.image ? (
                <div className="h-56 overflow-hidden relative">
                  <img src={tree.image} alt={tree.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-4 right-4">
                    <Badge variant="green" className="backdrop-blur-md bg-white/80">{tree.category}</Badge>
                  </div>
                </div>
              ) : (
                <div className="h-56 bg-forest-50 flex items-center justify-center text-forest-200">
                  <GiOakLeaf className="text-6xl" />
                </div>
              )}
              
              <div className="p-6 flex-1 flex flex-col">
                <div className="mb-4">
                  <h3 className="font-display font-bold text-2xl text-gray-900 group-hover:text-forest-600 transition-colors">{tree.name}</h3>
                  <p className="text-sm italic text-gray-500 font-medium">{tree.scientificName}</p>
                </div>

                <div className="flex items-center gap-2 text-forest-700 font-bold mb-4 bg-forest-50 w-fit px-3 py-1 rounded-lg">
                   <HiOutlineCurrencyRupee className="w-5 h-5" />
                   <span>MRP: ₹{tree.mrp || 0}</span>
                </div>

                <p className="text-sm text-gray-600 line-clamp-2 mb-6 leading-relaxed">
                  {tree.description}
                </p>

                <div className="mt-auto space-y-3">
                   <div className="flex gap-2">
                     <button 
                        onClick={() => setSelectedTree(tree)}
                        className="flex-1 py-2.5 bg-gray-50 text-gray-700 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-100 transition-all text-sm border border-gray-100"
                     >
                        <HiOutlineInformationCircle className="w-4 h-4" />
                        Details
                     </button>
                     {user?.role !== 'admin' && (
                        <button 
                           onClick={() => handleBuyClick(tree)}
                           className="flex-[2] py-2.5 bg-forest-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-forest-700 transition-all text-sm shadow-md shadow-forest-100"
                        >
                           <HiOutlineShoppingCart className="w-4 h-4" />
                           Buy Now
                        </button>
                     )}
                   </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Details Modal */}
      {selectedTree && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative animate-in zoom-in-95 duration-300">
            <button 
              onClick={() => setSelectedTree(null)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white z-10"
            >
              <HiOutlineX className="text-2xl" />
            </button>

            {selectedTree.image && (
              <div className="h-64 relative">
                <img src={selectedTree.image} alt={selectedTree.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 left-8 text-white">
                  <Badge variant="green" className="mb-2">{selectedTree.category}</Badge>
                  <h2 className="text-4xl font-display font-bold">{selectedTree.name}</h2>
                  <p className="italic opacity-80">{selectedTree.scientificName}</p>
                </div>
              </div>
            )}

            <div className="p-8 space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="font-bold text-gray-900 flex items-center gap-2">
                    <HiOutlineInformationCircle className="text-forest-600" />
                    Description
                  </h4>
                  <p className="text-gray-600 leading-relaxed">{selectedTree.description}</p>
                </div>
                <div className="space-y-4">
                  <h4 className="font-bold text-gray-900 flex items-center gap-2">
                    <HiOutlineInformationCircle className="text-forest-600" />
                    Key Benefits
                  </h4>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    {selectedTree.benefits?.map((b, i) => <li key={i}>{b}</li>)}
                  </ul>
                </div>
              </div>

              {selectedTree.plantationGuide && (
                <div className="p-6 bg-forest-50 rounded-2xl border border-forest-100">
                  <h4 className="font-bold text-forest-800 flex items-center gap-2 mb-3">
                    <HiOutlineBookOpen className="text-forest-600" />
                    Plantation & Care Guide
                  </h4>
                  <p className="text-forest-700 whitespace-pre-wrap leading-relaxed">{selectedTree.plantationGuide}</p>
                </div>
              )}

              <div className="flex justify-between items-center pt-6 border-t border-gray-100">
                <div className="text-2xl font-display font-bold text-forest-700">
                  ₹{selectedTree.mrp || 0}
                </div>
                <div className="flex gap-3">
                    <button 
                        onClick={() => setSelectedTree(null)}
                        className="px-8 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-all"
                    >
                        Close
                    </button>
                    {user?.role !== 'admin' && (
                        <button 
                            onClick={() => { setSelectedTree(null); handleBuyClick(selectedTree); }}
                            className="px-8 py-3 bg-forest-600 text-white rounded-xl font-bold hover:bg-forest-700 transition-all shadow-lg shadow-forest-100"
                        >
                            Buy Now
                        </button>
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Buy Request Modal */}
      {showBuyModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl relative p-8 animate-in zoom-in-95 duration-300">
            <div className="flex justify-between items-center mb-6">
               <h2 className="text-2xl font-display font-bold text-gray-900 flex items-center gap-2">
                  <HiOutlineShoppingCart className="text-forest-600" />
                  Tree Purchase Request
               </h2>
               <button onClick={() => setShowBuyModal(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <HiOutlineX className="text-xl text-gray-500" />
               </button>
            </div>

            <div className="mb-6 p-4 bg-forest-50 rounded-2xl flex gap-4 items-center border border-forest-100">
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-white shadow-sm flex-shrink-0">
                    <img src={buyTree?.image} alt="" className="w-full h-full object-cover" />
                </div>
                <div>
                    <h4 className="font-bold text-gray-900">{buyTree?.name}</h4>
                    <p className="text-sm text-forest-700 font-semibold">₹{buyTree?.mrp} / unit</p>
                </div>
            </div>

            <form onSubmit={handleRequestSubmit} className="space-y-4">
               <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                     <label className="text-xs font-bold text-gray-500 uppercase">Your Name</label>
                     <input 
                        required
                        className="form-input"
                        value={requestForm.fullName}
                        onChange={e => setRequestForm({...requestForm, fullName: e.target.value})}
                     />
                  </div>
                  <div className="space-y-1">
                     <label className="text-xs font-bold text-gray-500 uppercase">Contact Number</label>
                     <input 
                        required
                        className="form-input"
                        value={requestForm.phone}
                        onChange={e => setRequestForm({...requestForm, phone: e.target.value})}
                     />
                  </div>
               </div>

               <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase">Quantity (Units)</label>
                  <input 
                    type="number"
                    min="1"
                    required
                    className="form-input"
                    value={requestForm.quantity}
                    onChange={e => setRequestForm({...requestForm, quantity: parseInt(e.target.value) || 1})}
                  />
               </div>

               <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase">Shipping Address</label>
                  <textarea 
                    required
                    className="form-input min-h-[80px]"
                    placeholder="Enter your full address..."
                    value={requestForm.shippingAddress}
                    onChange={e => setRequestForm({...requestForm, shippingAddress: e.target.value})}
                  />
               </div>

               <div className="p-4 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                  <div className="flex justify-between items-center">
                     <span className="text-gray-600 font-medium">Total Price:</span>
                     <span className="text-2xl font-display font-extrabold text-forest-700">
                        ₹{(buyTree?.mrp || 0) * (requestForm.quantity || 1)}
                     </span>
                  </div>
               </div>

               <div className="pt-4 flex gap-3">
                  <Button type="button" variant="secondary" className="flex-1" onClick={() => setShowBuyModal(false)}>Cancel</Button>
                  <Button 
                    type="submit" 
                    loading={submitting}
                    className="flex-[2] bg-forest-600 hover:bg-forest-700"
                  >
                    Submit Request
                  </Button>
               </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
