import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Dashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        // Fetch user authentication status from the server
        const response = await axios.post('http://localhost:3000/api/v1/users/verify');

        console.log(response);
      } catch (error) {
        // Handle error (e.g., network error)
        console.error('Failed to check authentication:', error);
        // Redirect to login page in case of error
        //navigate('/login');
      }
    };

    checkAuthentication();
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>; // You can show a loading indicator while checking authentication
  }

  return <div>Dashboard</div>;
}

export default Dashboard;
