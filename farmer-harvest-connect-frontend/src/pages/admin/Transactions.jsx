import { PageHeader, Badge } from '../../components/common/UI';

const TRANSACTIONS = [
  {
    id: 1,
    user: 'Amit Traders',
    amount: '₹45,000',
    type: 'Crop Purchase',
    status: 'completed',
  },
  {
    id: 2,
    user: 'Ram Logistics',
    amount: '₹12,000',
    type: 'Service Payment',
    status: 'pending',
  },
];

export default function AdminTransactions() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Transactions"
        subtitle="Monitor platform payments."
      />

      <div className="space-y-4">
        {TRANSACTIONS.map((tx) => (
          <div
            key={tx.id}
            className="card flex justify-between items-center"
          >
            <div>
              <p className="font-bold">{tx.user}</p>
              <p className="text-sm text-gray-500">
                {tx.type} • {tx.amount}
              </p>
            </div>

            <Badge
              variant={
                tx.status === 'completed'
                  ? 'green'
                  : 'yellow'
              }
            >
              {tx.status}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );
}