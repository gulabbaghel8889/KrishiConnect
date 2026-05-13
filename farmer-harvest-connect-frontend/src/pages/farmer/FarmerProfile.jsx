import { useState } from 'react';
import toast from 'react-hot-toast';
import { PageHeader, Button } from '../../components/common/UI';

export default function FarmerProfile() {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    village: '',
    district: '',
    state: '',
  });

  const saveProfile = () => {
    toast.success('Profile updated successfully');
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Profile"
        subtitle="Manage your farmer profile information."
      />

      <div className="card space-y-4">
        <input
          className="form-input"
          placeholder="Full Name"
          value={profile.name}
          onChange={(e) =>
            setProfile({ ...profile, name: e.target.value })
          }
        />

        <input
          className="form-input"
          placeholder="Email"
          value={profile.email}
          onChange={(e) =>
            setProfile({ ...profile, email: e.target.value })
          }
        />

        <input
          className="form-input"
          placeholder="Phone Number"
          value={profile.phone}
          onChange={(e) =>
            setProfile({ ...profile, phone: e.target.value })
          }
        />

        <input
          className="form-input"
          placeholder="Village"
          value={profile.village}
          onChange={(e) =>
            setProfile({ ...profile, village: e.target.value })
          }
        />

        <input
          className="form-input"
          placeholder="District"
          value={profile.district}
          onChange={(e) =>
            setProfile({ ...profile, district: e.target.value })
          }
        />

        <input
          className="form-input"
          placeholder="State"
          value={profile.state}
          onChange={(e) =>
            setProfile({ ...profile, state: e.target.value })
          }
        />

        <Button onClick={saveProfile}>
          Save Changes
        </Button>
      </div>
    </div>
  );
}