import React, { useContext, useState, useEffect } from 'react';
import { ProfileContext } from '../ProfileContext';
import './UserProfile.css';

const placeholder = 'https://via.placeholder.com/150';

const UserProfile = () => {
  const { profiles, selectedProfile, addProfile, removeProfile, updateProfile, selectProfile } = useContext(ProfileContext);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ name: '', bio: '', avatar: placeholder, imageFile: null });

  useEffect(() => {
    if (selectedProfile) {
      setFormData({
        name: selectedProfile.name || '',
        bio: selectedProfile.bio || '',
        avatar: selectedProfile.avatar || placeholder,
        imageFile: null,
      });
      setEditing(false);
    }
  }, [selectedProfile]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, avatar: reader.result, imageFile: file });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (!selectedProfile) return;
    updateProfile(selectedProfile.id, {
      name: formData.name,
      bio: formData.bio,
      avatar: formData.avatar,
    });
    setEditing(false);
  };

  const handleAdd = () => {
    const newProfile = {
      name: 'New User',
      bio: '',
      avatar: placeholder,
    };
    addProfile(newProfile);
  };

  const handleRemove = (id) => {
    if (!window.confirm('Remove this profile?')) return;
    removeProfile(id);
  };

  return (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', padding: 24 }}>
      <div style={{ minWidth: 220 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3>Profiles</h3>
          <button onClick={handleAdd}>Add</button>
        </div>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {profiles.map((p) => (
            <li key={p.id} style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
              <img src={p.avatar} alt="avatar" style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover', marginRight: 8 }} />
              <button
                onClick={() => selectProfile(p.id)}
                style={{ flex: 1, textAlign: 'left', background: 'transparent', border: 'none', cursor: 'pointer' }}
              >
                {p.name || 'Unnamed'}
              </button>
              <button onClick={() => handleRemove(p.id)} style={{ marginLeft: 8, background: '#dc3545' }}>Remove</button>
            </li>
          ))}
        </ul>
      </div>

      <div className="profile-card" style={{ width: '100%', maxWidth: 560 }}>
        <img src={formData.avatar} alt="Avatar" className="avatar" />
        {selectedProfile ? (
          editing ? (
            <>
              <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
              <textarea name="bio" value={formData.bio} onChange={handleChange} placeholder="Bio" />
              <input type="file" accept="image/*" onChange={handleImageChange} />
              <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
                <button onClick={handleSubmit}>Save</button>
                <button onClick={() => setEditing(false)} style={{ background: '#6c757d' }}>Cancel</button>
              </div>
            </>
          ) : (
            <>
              <h2>{selectedProfile.name}</h2>
              <p>{selectedProfile.bio}</p>
              <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
                <button onClick={() => setEditing(true)}>Edit</button>
              </div>
            </>
          )
        ) : (
          <div>
            <p>No profile selected</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;