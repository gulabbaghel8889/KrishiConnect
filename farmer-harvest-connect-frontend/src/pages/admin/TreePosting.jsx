import { useState, useEffect } from 'react';
import { PageHeader, Button, Badge } from '../../components/common/UI';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import { HiOutlinePlus, HiOutlineTrash, HiOutlinePhotograph, HiOutlineBookOpen, HiOutlineCurrencyRupee, HiOutlineCloudUpload } from 'react-icons/hi';
import { GiOakLeaf } from 'react-icons/gi';
import { API_URL as API_BASE } from '../../config';

export default function TreePosting() {
  const { token } = useAuth();
  const [trees, setTrees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    scientificName: '',
    description: '',
    category: 'Other',
    mrp: '',
    benefits: '',
    plantationGuide: '',
  });
  
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const fetchTrees = async () => {
    try {
      const res = await fetch(`${API_BASE}/admin/trees`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setTrees(data.data);
      }
    } catch (error) {
      toast.error('Failed to fetch trees');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrees();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const data = new FormData();
      Object.keys(formData).forEach(key => {
        data.append(key, formData[key]);
      });
      if (imageFile) {
        data.append('image', imageFile);
      }

      const res = await fetch(`${API_BASE}/admin/trees`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: data
      });

      const resData = await res.json();
      if (resData.success) {
        toast.success('Tree information posted with image!');
        setFormData({
          name: '',
          scientificName: '',
          description: '',
          category: 'Other',
          mrp: '',
          benefits: '',
          plantationGuide: '',
        });
        setImageFile(null);
        setImagePreview(null);
        setShowForm(false);
        fetchTrees();
      } else {
        toast.error(resData.message || 'Post failed');
      }
    } catch (error) {
      toast.error('Failed to post tree');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this tree post?')) return;
    try {
      const res = await fetch(`${API_BASE}/admin/trees/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        toast.success('Tree removed');
        fetchTrees();
      }
    } catch (error) {
      toast.error('Delete failed');
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center">
        <PageHeader
          title="Tree Information Management"
          subtitle="Add and manage educational content about trees with Cloudinary image hosting."
        />
        <Button 
          onClick={() => setShowForm(!showForm)}
          icon={showForm ? null : HiOutlinePlus}
          variant={showForm ? 'secondary' : 'primary'}
        >
          {showForm ? 'Close Form' : 'Add New Tree'}
        </Button>
      </div>

      {showForm && (
        <div className="card border-2 border-purple-100 shadow-xl animate-in slide-in-from-top duration-300">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="form-label">Tree Common Name *</label>
                <input
                  required
                  className="form-input"
                  placeholder="e.g. Neem, Mango, Teak"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="form-label">Scientific Name</label>
                <input
                  className="form-input"
                  placeholder="e.g. Azadirachta indica"
                  value={formData.scientificName}
                  onChange={e => setFormData({...formData, scientificName: e.target.value})}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
               <div className="space-y-2">
                <label className="form-label">Category</label>
                <select
                  className="form-input"
                  value={formData.category}
                  onChange={e => setFormData({...formData, category: e.target.value})}
                >
                  <option value="Fruit">Fruit</option>
                  <option value="Timber">Timber</option>
                  <option value="Medicinal">Medicinal</option>
                  <option value="Ornamental">Ornamental</option>
                  <option value="Shade">Shade</option>
                  <option value="Environmental">Environmental</option>
                  <option value="Eco">Eco</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="form-label">MRP (₹)</label>
                <div className="relative">
                  <HiOutlineCurrencyRupee className="absolute left-3 top-3.5 text-gray-400" />
                  <input
                    type="number"
                    className="form-input pl-10"
                    placeholder="e.g. 150"
                    value={formData.mrp}
                    onChange={e => setFormData({...formData, mrp: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="form-label font-bold text-purple-700">Upload Tree Image *</label>
                <div className="relative">
                   <label className="flex items-center justify-center gap-2 w-full p-3 border-2 border-dashed border-purple-200 rounded-xl cursor-pointer hover:bg-purple-50 transition-colors">
                      <HiOutlineCloudUpload className="text-purple-600 text-xl" />
                      <span className="text-sm font-medium text-purple-700">Choose Photo</span>
                      <input 
                        type="file" 
                        className="hidden" 
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                   </label>
                </div>
              </div>
            </div>

            {imagePreview && (
              <div className="relative w-40 h-40 rounded-2xl overflow-hidden border-2 border-purple-100 shadow-md">
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                <button 
                  type="button"
                  onClick={() => {setImageFile(null); setImagePreview(null);}}
                  className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full text-xs"
                >
                  &times;
                </button>
              </div>
            )}

            <div className="space-y-2">
              <label className="form-label">Benefits (Comma separated)</label>
              <input
                className="form-input"
                placeholder="e.g. Air purification, Soil health, Medicine"
                value={formData.benefits}
                onChange={e => setFormData({...formData, benefits: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="form-label">Description *</label>
              <textarea
                required
                className="form-input min-h-[100px]"
                placeholder="Describe the tree and its importance..."
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="form-label">Plantation & Care Guide</label>
              <textarea
                className="form-input min-h-[100px]"
                placeholder="How to plant and maintain this tree..."
                value={formData.plantationGuide}
                onChange={e => setFormData({...formData, plantationGuide: e.target.value})}
              />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
               <Button type="button" variant="secondary" onClick={() => setShowForm(false)}>Cancel</Button>
               <Button 
                type="submit" 
                loading={submitting}
                className="bg-purple-600 hover:bg-purple-700"
               >
                 Post Tree to Cloudinary
               </Button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
      ) : trees.length === 0 ? (
        <div className="card text-center py-20 bg-gray-50 border-dashed border-2">
          <GiOakLeaf className="mx-auto text-4xl text-gray-300 mb-4" />
          <p className="text-gray-500 font-medium">No trees posted yet. Start adding tree information for farmers.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trees.map(tree => (
            <div key={tree._id} className="card group hover:shadow-2xl transition-all duration-300 border-t-4 border-purple-500 flex flex-col">
              {tree.image && (
                <div className="h-40 -mx-6 -mt-6 mb-4 overflow-hidden">
                  <img src={tree.image} alt={tree.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
              )}
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-xl text-gray-900">{tree.name}</h3>
                  <p className="text-sm italic text-gray-500">{tree.scientificName}</p>
                </div>
                <Badge variant="purple">{tree.category}</Badge>
              </div>
              
              <div className="flex items-center gap-1 text-purple-700 font-bold mb-3">
                 <HiOutlineCurrencyRupee className="w-5 h-5" />
                 <span>MRP: ₹{tree.mrp || 0}</span>
              </div>

              <p className="text-sm text-gray-600 line-clamp-3 mb-4 flex-1">
                {tree.description}
              </p>

              <div className="space-y-3 pt-4 border-t border-gray-50">
                 <div className="flex flex-wrap gap-1">
                    {tree.benefits?.map((benefit, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 bg-purple-50 text-purple-600 rounded-full font-bold uppercase">
                        {benefit}
                      </span>
                    ))}
                 </div>
                 <div className="flex justify-between items-center pt-2">
                    <button className="text-purple-600 text-xs font-bold hover:underline flex items-center gap-1">
                       <HiOutlineBookOpen /> View Guide
                    </button>
                    <button 
                      onClick={() => handleDelete(tree._id)}
                      className="text-red-400 hover:text-red-600 transition-colors p-2 rounded-lg hover:bg-red-50"
                    >
                       <HiOutlineTrash className="w-5 h-5" />
                    </button>
                 </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
