import { useState } from 'react';
import toast from 'react-hot-toast';
import { PageHeader, Button } from '../../components/common/UI';

export default function ProviderProfile() {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    location: '',
  });

  const save = () => {
    toast.success('Profile updated');
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Profile"
        subtitle="Manage provider profile."
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
          placeholder="Service Type"
          value={profile.service}
          onChange={(e) =>
            setProfile({ ...profile, service: e.target.value })
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

        <Button onClick={save}>
          Save Changes
        </Button>
      </div>
    </div>
  );
}