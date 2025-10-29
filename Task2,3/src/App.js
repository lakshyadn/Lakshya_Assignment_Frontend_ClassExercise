import React from 'react';
import { ProfileProvider } from './ProfileContext';
import UserProfile from './components/UserProfile';
import SharedList from './components/SharedList';

function App() {
  return (
    <ProfileProvider>
      <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
        <UserProfile />
        <SharedList />
      </div>
    </ProfileProvider>
  );
}

export default App;