import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { PageHeader, Button } from '../../components/common/UI';
import { useAuth } from '../../context/AuthContext';
import { HiStar, HiOutlineUserCircle, HiOutlineOfficeBuilding, HiOutlineLocationMarker } from 'react-icons/hi';

export default function BuyerProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    location: '',
  });

  useEffect(() => {
    if (user) {
      setProfile({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        company: user.profile?.businessName || '',
        location: user.profile?.location || '',
      });
    }
  }, [user]);

  const saveProfile = () => {
    toast.success('Profile updated successfully');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto px-4 py-8">
      <PageHeader
        title="Buyer Profile"
        subtitle="Manage your business credentials and view your rating."
      />

      {/* Reputation Card */}
      <div className="card bg-gradient-to-br from-blue-600 to-blue-800 text-white border-none shadow-xl">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-4xl border-2 border-white/30">
            {user?.name?.[0]?.toUpperCase() || 'B'}
          </div>
          <div className="text-center md:text-left space-y-1">
            <h2 className="text-2xl font-bold">{user?.name}</h2>
            <div className="flex items-center justify-center md:justify-start gap-2">
              <div className="flex text-yellow-400">
                {[1, 2, 3, 4, 5].map((s) => (
                  <HiStar key={s} className={s <= Math.round(user?.averageRating || 0) ? 'fill-current' : 'opacity-30'} />
                ))}
              </div>
              <span className="font-bold">{user?.averageRating?.toFixed(1) || '0.0'}</span>
              <span className="text-blue-100 text-sm">({user?.totalRatings || 0} reviews)</span>
            </div>
            <p className="text-blue-100 text-sm">Buyer Account • Since {new Date(user?.createdAt).getFullYear()}</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="card space-y-4">
          <h3 className="font-bold text-gray-800 flex items-center gap-2">
            <HiOutlineUserCircle className="text-blue-600" />
            Personal Details
          </h3>
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase">Full Name</label>
            <input
              className="form-input"
              placeholder="Name"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase">Email</label>
            <input
              className="form-input"
              placeholder="Email"
              value={profile.email}
              readOnly
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase">Phone</label>
            <input
              className="form-input"
              placeholder="Phone"
              value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
            />
          </div>
        </div>

        <div className="card space-y-4">
          <h3 className="font-bold text-gray-800 flex items-center gap-2">
            <HiOutlineOfficeBuilding className="text-blue-600" />
            Business Info
          </h3>
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase">Company Name</label>
            <input
              className="form-input"
              placeholder="Company Name"
              value={profile.company}
              onChange={(e) => setProfile({ ...profile, company: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase">Primary Location</label>
            <input
              className="form-input"
              placeholder="Location"
              value={profile.location}
              onChange={(e) => setProfile({ ...profile, location: e.target.value })}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={saveProfile} className="bg-blue-600 hover:bg-blue-700 px-8 py-3">
          Save Profile
        </Button>
      </div>
    </div>
  );
}