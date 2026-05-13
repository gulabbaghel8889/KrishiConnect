import { useState } from 'react';
import toast from 'react-hot-toast';
import { PageHeader, Button } from '../../components/common/UI';

export default function FarmerCrops() {
  const [form, setForm] = useState({
    crop: '',
    qty: '',
    price: '',
    location: '',
  });

  const [list, setList] = useState([]);

  const submit = (e) => {
    e.preventDefault();

    if (!form.crop || !form.qty || !form.price || !form.location) {
      toast.error('Please fill all fields');
      return;
    }

    setList((prev) => [...prev, { ...form, id: Date.now() }]);

    setForm({
      crop: '',
      qty: '',
      price: '',
      location: '',
    });

    toast.success('Crop listed successfully');
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Post Crops"
        subtitle="List your crops for buyers."
      />

      <form onSubmit={submit} className="card space-y-4">
        <input
          className="form-input"
          placeholder="Crop Name"
          value={form.crop}
          onChange={(e) => setForm({ ...form, crop: e.target.value })}
        />

        <input
          className="form-input"
          placeholder="Quantity"
          value={form.qty}
          onChange={(e) => setForm({ ...form, qty: e.target.value })}
        />

        <input
          className="form-input"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />

        <input
          className="form-input"
          placeholder="Location"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
        />

        <Button type="submit">Post Crop</Button>
      </form>

      {list.map((crop) => (
        <div key={crop.id} className="card">
          {crop.crop} • {crop.qty} • {crop.price} • {crop.location}
        </div>
      ))}
    </div>
  );
}