import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { PageHeader, Button } from '../../components/common/UI';
import { useAuth } from '../../context/AuthContext';
import { HiStar, HiOutlineUserCircle, HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker } from 'react-icons/hi';

export default function FarmerProfile() {
  const { user, token } = useAuth();
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    village: '',
    district: '',
    state: '',
  });

  useEffect(() => {
    if (user) {
      setProfile({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        village: user.profile?.village || '',
        district: user.profile?.district || '',
        state: user.profile?.state || '',
      });
    }
  }, [user]);

  const saveProfile = () => {
    toast.success('Profile updated successfully');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto px-4 py-8">
      <PageHeader
        title="Account Settings"
        subtitle="Manage your personal information and view your reputation."
      />

      {/* Reputation Card */}
      <div className="card bg-gradient-to-br from-forest-600 to-forest-800 text-white border-none shadow-xl">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-4xl border-2 border-white/30">
            {user?.name?.[0]?.toUpperCase() || 'F'}
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
              <span className="text-forest-100 text-sm">({user?.totalRatings || 0} reviews)</span>
            </div>
            <p className="text-forest-100 text-sm">Farmer Member since {new Date(user?.createdAt).getFullYear()}</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="card space-y-4">
          <h3 className="font-bold text-gray-800 flex items-center gap-2">
            <HiOutlineUserCircle className="text-forest-600" />
            Basic Information
          </h3>
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase">Full Name</label>
            <input
              className="form-input"
              placeholder="Full Name"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            />
          </div>

          <div className="space-y-2">
             <label className="text-xs font-bold text-gray-400 uppercase">Email Address</label>
             <input
                className="form-input"
                placeholder="Email"
                value={profile.email}
                readOnly
              />
          </div>

          <div className="space-y-2">
             <label className="text-xs font-bold text-gray-400 uppercase">Phone Number</label>
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
            <HiOutlineLocationMarker className="text-forest-600" />
            Address Details
          </h3>
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase">Village</label>
            <input
              className="form-input"
              placeholder="Village"
              value={profile.village}
              onChange={(e) => setProfile({ ...profile, village: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase">District</label>
            <input
              className="form-input"
              placeholder="District"
              value={profile.district}
              onChange={(e) => setProfile({ ...profile, district: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase">State</label>
            <input
              className="form-input"
              placeholder="State"
              value={profile.state}
              onChange={(e) => setProfile({ ...profile, state: e.target.value })}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={saveProfile} className="px-8 py-3">
          Update Profile
        </Button>
      </div>
    </div>
  );
}