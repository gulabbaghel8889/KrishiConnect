import { PageHeader, Badge } from '../../components/common/UI';

const ORDERS = [
  {
    id: 1,
    crop: 'Wheat',
    farmer: 'Ramesh Patel',
    qty: '100 Qtl',
    status: 'Delivered',
  },
  {
    id: 2,
    crop: 'Soybean',
    farmer: 'Suresh Yadav',
    qty: '50 Qtl',
    status: 'Processing',
  },
];

export default function BuyerOrders() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="My Orders"
        subtitle="Track your crop purchases."
      />

      <div className="space-y-4">
        {ORDERS.map((order) => (
          <div
            key={order.id}
            className="card flex justify-between items-center"
          >
            <div>
              <p className="font-bold">{order.crop}</p>
              <p className="text-sm text-gray-500">
                Farmer: {order.farmer}
              </p>
              <p className="text-sm text-gray-500">
                Quantity: {order.qty}
              </p>
            </div>

            <Badge
              variant={
                order.status === 'Delivered'
                  ? 'green'
                  : 'yellow'
              }
            >
              {order.status}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );
}