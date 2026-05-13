import { PageHeader, Badge, Button } from '../../components/common/UI';
import toast from 'react-hot-toast';

const USERS = [
  {
    id: 1,
    name: 'Ramesh Patel',
    role: 'Farmer',
    email: 'ramesh@gmail.com',
    status: 'active',
  },
  {
    id: 2,
    name: 'Amit Traders',
    role: 'Buyer',
    email: 'amit@gmail.com',
    status: 'active',
  },
  {
    id: 3,
    name: 'Ram Logistics',
    role: 'Provider',
    email: 'ram@gmail.com',
    status: 'blocked',
  },
];

export default function AdminUsers() {
  const blockUser = (name) => {
    toast.success(`${name} status updated`);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Users"
        subtitle="Manage all platform users."
      />

      <div className="space-y-4">
        {USERS.map((user) => (
          <div
            key={user.id}
            className="card flex justify-between items-center"
          >
            <div>
              <p className="font-bold">{user.name}</p>
              <p className="text-sm text-gray-500">
                {user.role} • {user.email}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Badge
                variant={
                  user.status === 'active'
                    ? 'green'
                    : 'red'
                }
              >
                {user.status}
              </Badge>

              <Button onClick={() => blockUser(user.name)}>
                Update
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}