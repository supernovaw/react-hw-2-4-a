import React, { useState } from 'react';
import './App.css';
import UsersList from './UsersList';
import UserProfilePreview from './UserProfilePreview';

export default function App() {
  const [shownUser, setShownUser] = useState(null);
  return (
    <div className="App">
      <UsersList onUserClicked={setShownUser} />
      <UserProfilePreview user={shownUser} />
    </div>
  );
};
