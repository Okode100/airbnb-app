import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [userProfile, setUserProfile] = useState(null); // State to hold user profile

  useEffect(() => {
    axios.get('http://localhost:3000/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the users!', error);
      });
  }, []);

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {userProfile && ( // Check if userProfile exists
          <li>
            <strong>Profile:</strong> {userProfile.name} - {userProfile.email}
          </li>
        )}
        {users.map(user => ( 
          <li key={user.id} onClick={() => setUserProfile(user)}> {/* Set user profile on click */}
            {user.name} - {user.email}
          </li> // Closing tag for li
        ))}
      </ul>
    </div>
  );
};

export default Users;
