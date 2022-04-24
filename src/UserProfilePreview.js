import React, { useState, useEffect } from 'react';
import LoadingIndicator from './LoadingIndicator';
import './UserProfilePreview.css';

export default function UserProfilePreview({ user }) {
  const [loadedUser, setLoadedUser] = useState(null);

  useEffect(() => {
    if (!user) return;
    if (typeof user.id !== 'number') {
      console.error("can't load user:", user);
      setLoadedUser("failure"); return;
    }

    setLoadedUser(null); // display loading
    const subUrl = user.id + ".json";
    fetch(process.env.REACT_APP_USERDATA_URL + subUrl).then(async response => {
      try { setLoadedUser(await response.json()) } catch (e) {
        setLoadedUser("failure"); console.error("can't load user:", user, e);
      }
    });
  }, [user ? user.id : -1]);

  if (!user)
    return null;
  else if (!loadedUser)
    return <div className="UserProfilePreview"><LoadingIndicator /></div>;
  else if (loadedUser === "failure")
    return <div className="UserProfilePreview"><LoadingIndicator failed /></div>

  const details = loadedUser.details;
  return (
    <div className="UserProfilePreview">
      <img src={loadedUser.avatar} alt="user" width={250} height={250} />
      <div className="user-name">{loadedUser.name}</div>
      <div>City: {details.city}</div>
      <div>Company: {details.company}</div>
      <div>Position: {details.position}</div>
    </div>
  );
};
