// // // import { useState } from 'react';
// // // import { PageHeader, Button, Badge } from '../../components/common/UI';
// // // import toast from 'react-hot-toast';

// // // const INITIAL_LISTINGS = [
// // //   {
// // //     id: 1,
// // //     farmer: 'Ramesh Patel',
// // //     crop: 'Wheat',
// // //     qty: '150 Qtl',
// // //     price: '₹2200/Qtl',
// // //     location: 'Indore',
// // //     status: 'available',
// // //   },
// // //   {
// // //     id: 2,
// // //     farmer: 'Suresh Yadav',
// // //     crop: 'Soybean',
// // //     qty: '80 Qtl',
// // //     price: '₹4800/Qtl',
// // //     location: 'Bhopal',
// // //     status: 'available',
// // //   },
// // //   {
// // //     id: 3,
// // //     farmer: 'Rajesh Verma',
// // //     crop: 'Rice',
// // //     qty: '120 Qtl',
// // //     price: '₹3100/Qtl',
// // //     location: 'Jabalpur',
// // //     status: 'limited',
// // //   },
// // // ];

// // // export default function BuyerListings() {
// // //   const [listings] = useState(INITIAL_LISTINGS);

// // //   const buyNow = (crop) => {
// // //     toast.success(`${crop} added for purchase`);
// // //   };

// // //   return (
// // //     <div className="space-y-6">
// // //       <PageHeader
// // //         title="Crop Listings"
// // //         subtitle="Browse crops available from farmers."
// // //       />

// // //       <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
// // //         {listings.map((item) => (
// // //           <div key={item.id} className="card space-y-4">
// // //             <div className="flex justify-between items-start">
// // //               <div>
// // //                 <h3 className="font-bold text-gray-900 text-lg">
// // //                   {item.crop}
// // //                 </h3>
// // //                 <p className="text-sm text-gray-500">
// // //                   Farmer: {item.farmer}
// // //                 </p>
// // //               </div>

// // //               <Badge
// // //                 variant={
// // //                   item.status === 'available'
// // //                     ? 'green'
// // //                     : 'yellow'
// // //                 }
// // //               >
// // //                 {item.status}
// // //               </Badge>
// // //             </div>

// // //             <div className="space-y-2 text-sm text-gray-600">
// // //               <p>Quantity: {item.qty}</p>
// // //               <p>Price: {item.price}</p>
// // //               <p>Location: {item.location}</p>
// // //             </div>

// // //             <Button onClick={() => buyNow(item.crop)}>
// // //               Buy Now
// // //             </Button>
// // //           </div>
// // //         ))}
// // //       </div>
// // //     </div>
// // //   );
// // // }


// // import { useEffect, useState } from 'react';
// // import toast from 'react-hot-toast';
// // import { PageHeader, Button, Badge } from '../../components/common/UI';

// // export default function BuyerListings() {
// //   const [listings, setListings] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   const token = localStorage.getItem('token');

// //   const fetchListings = async () => {
// //     try {
// //       const res = await fetch(
// //         'http://localhost:5000/api/buyer/listings',
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         }
// //       );

// //       const data = await res.json();

// //       if (!res.ok) {
// //         toast.error(data.message || 'Failed to load listings');
// //         return;
// //       }

// //       setListings(data);
// //     } catch (error) {
// //       toast.error('Server error');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchListings();
// //   }, []);

// //   return (
// //     <div className="space-y-6">
// //       <PageHeader
// //         title="Crop Listings"
// //         subtitle="Browse crops available from farmers."
// //       />

// //       {loading ? (
// //         <p>Loading listings...</p>
// //       ) : (
// //         <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
// //           {listings.map((item) => (
// //             <div key={item._id} className="card space-y-4">
// //               <div className="flex justify-between items-start">
// //                 <div>
// //                   <h3 className="font-bold text-lg">
// //                     {item.cropName}
// //                   </h3>

// //                   <p className="text-sm text-gray-500">
// //                     Farmer: {item.farmerId?.name}
// //                   </p>
// //                 </div>

// //                 <Badge variant="green">
// //                   {item.status}
// //                 </Badge>
// //               </div>

// //               <div className="space-y-2 text-sm text-gray-600">
// //                 <p>
// //                   Quantity: {item.quantity.amount}{' '}
// //                   {item.quantity.unit}
// //                 </p>

// //                 <p>
// //                   Price: ₹{item.price.amount}{' '}
// //                   {item.price.unit}
// //                 </p>

// //                 <p>
// //                   Location: {item.location.district},{' '}
// //                   {item.location.state}
// //                 </p>

// //                 <p>
// //                   Contact: {item.farmerId?.phone}
// //                 </p>
// //               </div>

// //               <Button>
// //                 Buy Now
// //               </Button>
// //             </div>
// //           ))}
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// import { useEffect, useState } from 'react';
// import toast from 'react-hot-toast';
// import { PageHeader, Button, Badge } from '../../components/common/UI';

// export default function BuyerListings() {
//   const [listings, setListings] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchListings = async () => {
//     try {
//       const res = await fetch(
//         'http://localhost:5000/api/buyer/listings'
//       );

//       const data = await res.json();

//       if (!res.ok) {
//         toast.error(data.message || 'Failed to load listings');
//         return;
//       }

//       setListings(data);
//     } catch (error) {
//       toast.error('Server error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchListings();
//   }, []);

//   return (
//     <div className="space-y-6">
//       <PageHeader
//         title="Crop Listings"
//         subtitle="Browse crops available from farmers."
//       />

//       {loading ? (
//         <p>Loading listings...</p>
//       ) : (
//         <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
//           {listings.map((item) => (
//             <div key={item._id} className="card space-y-4">
//               <div className="flex justify-between items-start">
//                 <div>
//                   <h3 className="font-bold text-lg">
//                     {item.cropName}
//                   </h3>

//                   <p className="text-sm text-gray-500">
//                     Farmer: {item.farmerId?.name}
//                   </p>
//                 </div>

//                 <Badge variant="green">
//                   {item.status}
//                 </Badge>
//               </div>

//               <div className="space-y-2 text-sm text-gray-600">
//                 <p>
//                   Quantity: {item.quantity.amount}{' '}
//                   {item.quantity.unit}
//                 </p>

//                 <p>
//                   Price: ₹{item.price.amount}{' '}
//                   {item.price.unit}
//                 </p>

//                 <p>
//                   Location: {item.location.district},{' '}
//                   {item.location.state}
//                 </p>

//                 <p>
//                   Contact: {item.farmerId?.phone}
//                 </p>
//               </div>

//               <Button>
//                 Buy Now
//               </Button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// import { useEffect, useState } from 'react';
// import toast from 'react-hot-toast';
// import { PageHeader, Button, Badge } from '../../components/common/UI';

// export default function BuyerListings() {
//   const [listings, setListings] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchListings = async () => {
//     try {
//       const res = await fetch(
//         'http://localhost:5000/api/buyer/listings'
//       );

//       const data = await res.json();

//       if (!res.ok) {
//         toast.error(data.message || 'Failed to load listings');
//         return;
//       }

//       setListings(data);
//     } catch (error) {
//       toast.error('Server error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchListings();
//   }, []);

//   const buyNow = async (item) => {
//     try {
//       const res = await fetch(
//         'http://localhost:5000/api/notifications/test-buy',
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             farmerId: item.farmerId._id,
//             cropName: item.cropName,
//           }),
//         }
//       );

//       const data = await res.json();

//       if (!res.ok) {
//         toast.error(data.message || 'Purchase failed');
//         return;
//       }

//       toast.success('Purchase request sent');
//     } catch (error) {
//       toast.error('Server error');
//     }
//   };

//   return (
//     <div className="space-y-6">
//       <PageHeader
//         title="Crop Listings"
//         subtitle="Browse crops available from farmers."
//       />

//       {loading ? (
//         <p>Loading listings...</p>
//       ) : (
//         <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
//           {listings.map((item) => (
//             <div key={item._id} className="card space-y-4">
//               <div className="flex justify-between items-start">
//                 <div>
//                   <h3 className="font-bold text-lg">
//                     {item.cropName}
//                   </h3>

//                   <p className="text-sm text-gray-500">
//                     Farmer: {item.farmerId?.name}
//                   </p>
//                 </div>

//                 <Badge variant="green">
//                   {item.status}
//                 </Badge>
//               </div>

//               <div className="space-y-2 text-sm text-gray-600">
//                 <p>
//                   Quantity: {item.quantity.amount}{' '}
//                   {item.quantity.unit}
//                 </p>

//                 <p>
//                   Price: ₹{item.price.amount}{' '}
//                   {item.price.unit}
//                 </p>

//                 <p>
//                   Location: {item.location.district},{' '}
//                   {item.location.state}
//                 </p>

//                 <p>
//                   Contact: {item.farmerId?.phone}
//                 </p>
//               </div>

//               <Button onClick={() => buyNow(item)}>
//                 Buy Now
//               </Button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }



import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { PageHeader, Button, Badge } from '../../components/common/UI';

export default function BuyerListings() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchListings = async () => {
    try {
      const res = await fetch(
        'http://localhost:5000/api/buyer/listings'
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || 'Failed to load listings');
        return;
      }

      setListings(data);
    } catch (error) {
      toast.error('Server error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  const buyNow = async (item) => {
    try {
      const res = await fetch(
        'http://localhost:5000/api/notifications/test-buy',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            farmerId: item.farmerId._id,
            cropId: item._id,
            cropName: item.cropName,
            buyerName: 'Demo Buyer',
            buyerPhone: '9999999999',
            quantity: 1,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || 'Purchase failed');
        return;
      }

      toast.success('Purchase request sent');
    } catch (error) {
      toast.error('Server error');
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Crop Listings"
        subtitle="Browse crops available from farmers."
      />

      {loading ? (
        <p>Loading listings...</p>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {listings.map((item) => (
            <div key={item._id} className="card space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg">
                    {item.cropName}
                  </h3>

                  <p className="text-sm text-gray-500">
                    Farmer: {item.farmerId?.name}
                  </p>
                </div>

                <Badge variant="green">
                  {item.status}
                </Badge>
              </div>

              <div className="space-y-2 text-sm text-gray-600">
                <p>
                  Quantity: {item.quantity.amount}{' '}
                  {item.quantity.unit}
                </p>

                <p>
                  Price: ₹{item.price.amount}{' '}
                  {item.price.unit}
                </p>

                <p>
                  Location: {item.location.district},{' '}
                  {item.location.state}
                </p>

                <p>
                  Contact: {item.farmerId?.phone}
                </p>
              </div>

              <Button onClick={() => buyNow(item)}>
                Buy Now
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}