import { useState } from 'react';
import toast from 'react-hot-toast';
import { PageHeader, Button } from '../../components/common/UI';

export default function BuyerProfile() {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    location: '',
  });

  const saveProfile = () => {
    toast.success('Profile updated');
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Profile"
        subtitle="Manage your buyer profile."
      />

      <div className="card space-y-4">
        <input
          className="form-input"
          placeholder="Name"
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
          placeholder="Phone"
          value={profile.phone}
          onChange={(e) =>
            setProfile({ ...profile, phone: e.target.value })
          }
        />

        <input
          className="form-input"
          placeholder="Company Name"
          value={profile.company}
          onChange={(e) =>
            setProfile({ ...profile, company: e.target.value })
          }
        />

        <input
          className="form-input"
          placeholder="Location"
          value={profile.location}
          onChange={(e) =>
            setProfile({ ...profile, location: e.target.value })
          }
        />

        <Button onClick={saveProfile}>
          Save Changes
        </Button>
      </div>
    </div>
  );
}