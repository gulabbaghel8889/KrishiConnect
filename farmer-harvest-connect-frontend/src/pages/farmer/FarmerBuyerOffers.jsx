import { PageHeader, Button } from '../../components/common/UI';
import toast from 'react-hot-toast';

const buyers = [
  {
    id: 1,
    name: 'Amit Traders',
    crop: 'Wheat',
    qty: '100 Qtl',
    price: '₹2200/Qtl',
    location: 'Indore',
  },
  {
    id: 2,
    name: 'Sharma Agro',
    crop: 'Soybean',
    qty: '80 Qtl',
    price: '₹4700/Qtl',
    location: 'Bhopal',
  },
];

export default function FarmerBuyerOffers() {
  const acceptOffer = (buyerName) => {
    toast.success(`Accepted offer from ${buyerName}`);
  };

  const rejectOffer = (buyerName) => {
    toast.error(`Rejected offer from ${buyerName}`);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Buyer Offers"
        subtitle="Review purchase requests from buyers."
      />

      <div className="space-y-4">
        {buyers.map((buyer) => (
          <div
            key={buyer.id}
            className="card flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            <div>
              <p className="font-bold text-gray-800">{buyer.name}</p>
              <p className="text-gray-600">
                {buyer.crop} • {buyer.qty} • {buyer.price}
              </p>
              <p className="text-sm text-gray-500">
                Location: {buyer.location}
              </p>
            </div>

            <div className="flex gap-2">
              <Button onClick={() => acceptOffer(buyer.name)}>
                Accept
              </Button>

              <button
                className="btn-ghost"
                onClick={() => rejectOffer(buyer.name)}
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}