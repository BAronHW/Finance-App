'use client';

import { gql, useQuery } from '@apollo/client';
import React from 'react'

const GET_USERS = gql`
  query Users {
    users {
      first_name
      last_name
      uuid
      id
    }
  }
`;

export default function TestComp() {
  const { data, loading, error } = useQuery(GET_USERS);

  const clickme = () => {
    if (data) {
      console.log(data.users);
    } else if (loading) {
      console.log('Loading...');
    } else if (error) {
      console.log('Error:', error);
    }
  }

  return (
    <div>
      <button onClick={clickme}>click me</button>
    </div>
  )
}