import { useState } from 'react';
import toast from 'react-hot-toast';
import { PageHeader, Button, Badge } from '../../components/common/UI';
import { HiOutlineLocationMarker } from 'react-icons/hi';

const INITIAL = [
  {
    id: 1,
    provider: 'Ram Logistics',
    service: 'Truck (10 Ton)',
    price: '₹4200/day',
    location: 'Indore',
    status: 'pending',
  },
];

export default function FarmerOffers() {
  const [offers, setOffers] = useState(INITIAL);

  const updateStatus = (id, status) => {
    setOffers((prev) =>
      prev.map((offer) =>
        offer.id === id ? { ...offer, status } : offer
      )
    );

    toast.success(`Offer ${status}`);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Service Offers"
        subtitle="Review service provider offers."
      />

      {offers.map((offer) => (
        <div key={offer.id} className="card flex justify-between items-center">
          <div>
            <p className="font-bold">{offer.provider}</p>
            <p>{offer.service} • {offer.price}</p>

            <p className="text-sm text-gray-500 flex items-center gap-1">
              <HiOutlineLocationMarker />
              {offer.location}
            </p>
          </div>

          <div className="flex gap-2 items-center">
            <Badge variant="yellow">{offer.status}</Badge>

            <Button onClick={() => updateStatus(offer.id, 'accepted')}>
              Accept
            </Button>

            <button
              className="btn-ghost"
              onClick={() => updateStatus(offer.id, 'rejected')}
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}