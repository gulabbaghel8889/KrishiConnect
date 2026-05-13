import { useState } from 'react';
import toast from 'react-hot-toast';
import { PageHeader, Button } from '../../components/common/UI';

export default function PostService() {
  const [form, setForm] = useState({
    serviceType: '',
    price: '',
    location: '',
    availability: '',
  });

  const submit = (e) => {
    e.preventDefault();

    if (!form.serviceType || !form.price || !form.location) {
      toast.error('Please fill all fields');
      return;
    }

    toast.success('Service posted successfully');

    setForm({
      serviceType: '',
      price: '',
      location: '',
      availability: '',
    });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Post Service"
        subtitle="Offer transport, labour, or machinery services."
      />

      <form onSubmit={submit} className="card space-y-4">
        <input
          className="form-input"
          placeholder="Service Type"
          value={form.serviceType}
          onChange={(e) =>
            setForm({ ...form, serviceType: e.target.value })
          }
        />

        <input
          className="form-input"
          placeholder="Price"
          value={form.price}
          onChange={(e) =>
            setForm({ ...form, price: e.target.value })
          }
        />

        <input
          className="form-input"
          placeholder="Location"
          value={form.location}
          onChange={(e) =>
            setForm({ ...form, location: e.target.value })
          }
        />

        <input
          className="form-input"
          placeholder="Availability"
          value={form.availability}
          onChange={(e) =>
            setForm({ ...form, availability: e.target.value })
          }
        />

        <Button type="submit">Post Service</Button>
      </form>
    </div>
  );
}