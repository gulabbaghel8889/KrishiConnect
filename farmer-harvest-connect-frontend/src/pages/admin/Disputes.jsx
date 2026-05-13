import { PageHeader, Button, Badge } from '../../components/common/UI';
import toast from 'react-hot-toast';

const DISPUTES = [
  {
    id: 1,
    user: 'Ramesh Patel',
    issue: 'Payment not received',
    status: 'open',
  },
  {
    id: 2,
    user: 'Amit Traders',
    issue: 'Delivery issue',
    status: 'open',
  },
];

export default function AdminDisputes() {
  const resolveDispute = (user) => {
    toast.success(`Dispute resolved for ${user}`);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Disputes"
        subtitle="Resolve user complaints."
      />

      <div className="space-y-4">
        {DISPUTES.map((dispute) => (
          <div
            key={dispute.id}
            className="card flex justify-between items-center"
          >
            <div>
              <p className="font-bold">{dispute.user}</p>
              <p className="text-sm text-gray-500">
                {dispute.issue}
              </p>
            </div>

            <div className="flex gap-3 items-center">
              <Badge variant="red">
                {dispute.status}
              </Badge>

              <Button
                onClick={() => resolveDispute(dispute.user)}
              >
                Resolve
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}