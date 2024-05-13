import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



function Dashboard() {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);



  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await axios.get('/api/v1/users/verify',{ withCredentials: true });
        if (response.status === 200) {
          setUserData(response.data.user); // Destructure user data from response
        }
      } catch (error) {
        console.error('Failed to check authentication:', error);
       // navigate('/login');
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure
      }
    };

    checkAuthentication();
  }, [navigate]);



  const handleLogout = async () => {
    try {
      await axios.post('/api/v1/users/logout', {},
        { withCredentials: true });
      navigate('/login'); // Redirect to login page after successful logout
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };


  if (loading) {
    return <div>Loading...</div>; // Show loading indicator while checking authentication
  }

  return (
    <div>
      <h1>Welcome to Dashboard</h1>
      {userData ? (
        <div className='m-2'>
          <p className='m-2'>Username: {userData.username}</p>
          <p className='m-2'>Email: {userData.Email}</p>
        </div>
      ) : (
        <div>User data not available</div>
      )}
      <button onClick={handleLogout} className='className="rounded-full bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black m-4'>Logout</button>
    </div>
  );
}

export default Dashboard;
