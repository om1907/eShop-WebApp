import { useState, useEffect } from 'react';
import { useAuth } from '../../context/auth';
import { Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../Spinner';

export default function PrivateRoute() {
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(true);
  const [auth] = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const authCheck = async () => {
      try {
        const res = await axios.get('/api/v1/auth/user-auth', {
          headers: {
            Authorization: `${auth?.token}`, // Ensure token is included in the header
          },
        });

        if (res.data.ok) {
          setOk(true);
        } else {
          setOk(false);
          navigate('/login'); // Redirect if the user is not authorized
        }
      } catch (err) {
        console.error('Authentication error:', err);
        
        // Check for 401 specifically
        if (err.response && err.response.status === 401) {
          // If the error is 401, it means the token is invalid or the user doesn't have the right permissions
          console.log('Unauthorized access: Token invalid or insufficient permissions');
          navigate('/login'); // Redirect to login if the user doesn't have access
        } else {
          // Handle other errors (e.g., network issues, server errors)
          navigate('/error'); // Redirect to a generic error page
        }
      } finally {
        setLoading(false);
      }
    };

    if (auth?.token) {
      authCheck();
    } else {
      setOk(false);
      setLoading(false);
      navigate('/login'); // Redirect to login if no token is found
    }
  }, [auth?.token, navigate]);

  if (loading) {
    return <Spinner path="/login" />;
  }

  return ok ? <Outlet /> : null;
}
