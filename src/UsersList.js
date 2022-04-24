import React, { useState, useEffect } from 'react';
import LoadingIndicator from './LoadingIndicator';
import './UsersList.css';

export default function UsersList({ onUserClicked }) {
  const [loadedList, setLoadedList] = useState(null);

  useEffect(() => {
    fetch(process.env.REACT_APP_USERDATA_URL + "users.json")
      .then(r => r.json()).then(setLoadedList);
  }, []);

  if (!loadedList) return <div className="UsersList">
    <LoadingIndicator />
  </div>;

  const userDiv = obj =>
    <div className="user" key={obj.id} onClick={e => onUserClicked(obj)}>
      <div>{obj.name}</div>
    </div>;

  return (<div className="UsersList">
    {loadedList.map(userDiv)}
  </div>);
};
