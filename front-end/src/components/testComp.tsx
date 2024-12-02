'use client';

import { useLazyQuery } from '@apollo/client';
import React from 'react';
import { User } from '../lib/GraphQL/User';
import { Button } from './ui/button';
import { GET_ALL_USERS } from '@/src/lib/GraphQL/Users';

export default function TestComp() {
  const [getUsers, { data, loading, error }] = useLazyQuery<{ users: User[] }>(GET_ALL_USERS);

  const fetchUsers = () => {
    getUsers();
  };

  return (
    <div>
      <Button onClick={fetchUsers}>Fetch Users</Button>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && data.users && (
        <ul>
          {data.users.map((user: User) => (
            <li key={user.id}>{user.firstName} {user.lastName}</li>
          ))}
        </ul>
      )}
      {data && data.users && data.users.length === 0 && <p>No users found</p>}
    </div>
  );
}