import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { PageHeader, Button, Badge } from '../../components/common/UI';

export default function FarmerOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await fetch(
        'http://localhost:5000/api/farmer-orders'
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
    fetchOrders();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/farmer-orders/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
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
    <div className="space-y-6">
      <PageHeader
        title="Purchase Requests"
        subtitle="Manage incoming buyer requests"
      />

      {loading ? (
        <p>Loading requests...</p>
      ) : orders.length === 0 ? (
        <p>No purchase requests found.</p>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="card space-y-4"
            >
              <div className="flex justify-between">
                <h3 className="font-bold text-lg">
                  {order.cropName}
                </h3>

                <Badge
                  variant={
                    order.status === 'accepted'
                      ? 'green'
                      : order.status === 'rejected'
                      ? 'red'
                      : 'yellow'
                  }
                >
                  {order.status}
                </Badge>
              </div>

              <div className="space-y-2 text-sm text-gray-600">
                <p>
                  Buyer: {order.buyerName}
                </p>

                <p>
                  Phone: {order.buyerPhone}
                </p>

                <p>
                  Quantity: {order.quantity}
                </p>
              </div>

              {order.status === 'pending' && (
                <div className="flex gap-2">
                  <Button
                    onClick={() =>
                      updateStatus(
                        order._id,
                        'accepted'
                      )
                    }
                  >
                    Accept
                  </Button>

                  <Button
                    variant="danger"
                    onClick={() =>
                      updateStatus(
                        order._id,
                        'rejected'
                      )
                    }
                  >
                    Reject
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}