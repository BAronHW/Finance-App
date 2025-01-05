'use client';

import { useLazyQuery } from '@apollo/client';
import React from 'react';
import { Button } from './ui/button';
import { GET_ALL_USERS } from '@/src/lib/GraphQL/Users';

export default function TestComp() {
  const [getUsers, { data, loading, error }] = useLazyQuery<{ users: any[] }>(GET_ALL_USERS);

  const fetchUsers = async () => {
    try {
      console.log('Fetching users...');
      const result = await getUsers();
      console.log('Query result:', result);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };
  
  return (
    <div>
      <Button onClick={fetchUsers}>Fetch Users</Button>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && data.users && (
        <ul>
          {data.users.map((user) => (
            <li key={user.id}>{user.username || `User ${user.id}`}</li>
          ))}
        </ul>
      )}
      {data && data.users && data.users.length === 0 && <p>No users found</p>}
    </div>
  );
}