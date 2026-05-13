import { PageHeader, Badge } from '../../components/common/UI';

const bookings = [
  {
    id: 1,
    farmer: 'Ramesh Patel',
    service: 'Truck Transport',
    date: '12 May 2026',
    status: 'Confirmed',
  },
];

export default function Bookings() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Bookings"
        subtitle="Manage confirmed service bookings."
      />

      <div className="space-y-4">
        {bookings.map((booking) => (
          <div key={booking.id} className="card flex justify-between items-center">
            <div>
              <p className="font-bold">{booking.farmer}</p>
              <p>{booking.service}</p>
              <p className="text-sm text-gray-500">{booking.date}</p>
            </div>

            <Badge variant="green">
              {booking.status}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );
}