import { PageHeader, Button, Badge } from '../../components/common/UI';
import toast from 'react-hot-toast';

const LISTINGS = [
  {
    id: 1,
    crop: 'Wheat',
    owner: 'Ramesh Patel',
    status: 'active',
  },
  {
    id: 2,
    crop: 'Soybean',
    owner: 'Suresh Yadav',
    status: 'flagged',
  },
];

export default function AdminListings() {
  const moderateListing = (crop) => {
    toast.success(`${crop} listing reviewed`);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Listings"
        subtitle="Moderate crop listings."
      />

      <div className="space-y-4">
        {LISTINGS.map((listing) => (
          <div
            key={listing.id}
            className="card flex justify-between items-center"
          >
            <div>
              <p className="font-bold">{listing.crop}</p>
              <p className="text-sm text-gray-500">
                {listing.owner}
              </p>
            </div>

            <div className="flex gap-3 items-center">
              <Badge
                variant={
                  listing.status === 'active'
                    ? 'green'
                    : 'yellow'
                }
              >
                {listing.status}
              </Badge>

              <Button
                onClick={() => moderateListing(listing.crop)}
              >
                Review
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}