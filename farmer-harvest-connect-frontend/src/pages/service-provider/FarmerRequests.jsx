import { PageHeader, Button } from '../../components/common/UI';
import toast from 'react-hot-toast';

const requests = [
  {
    id: 1,
    farmer: 'Ramesh Patel',
    crop: 'Wheat',
    qty: '150 Qtl',
    location: 'Indore',
  },
  {
    id: 2,
    farmer: 'Suresh Yadav',
    crop: 'Soybean',
    qty: '90 Qtl',
    location: 'Bhopal',
  },
];

export default function FarmerRequests() {
  const acceptRequest = (name) => {
    toast.success(`Accepted request from ${name}`);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Farmer Requests"
        subtitle="View service requests from farmers."
      />

      <div className="space-y-4">
        {requests.map((req) => (
          <div key={req.id} className="card flex justify-between items-center">
            <div>
              <p className="font-bold">{req.farmer}</p>
              <p>{req.crop} • {req.qty}</p>
              <p className="text-sm text-gray-500">{req.location}</p>
            </div>

            <Button onClick={() => acceptRequest(req.farmer)}>
              Accept
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}