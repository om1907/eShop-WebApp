import { useState, useContext, createContext, useEffect } from 'react';
import axios from 'axios';

// Create the AuthContext
const AuthContext = createContext();

// AuthProvider component to manage auth state
const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: '',
  });

  // Effect to load auth data from localStorage on initial render
  useEffect(() => {
    const data = localStorage.getItem('auth');
    if (data) {
      const parsedData = JSON.parse(data);
      setAuth(parsedData);  // Directly set the loaded auth data
    }
  }, []);

  // Update axios headers whenever the auth state changes
  useEffect(() => {
    if (auth.token) {
      axios.defaults.headers.common['Authorization'] = `${auth.token}`;
    } else {
      delete axios.defaults.headers.common['Authorization']; // Clear Authorization header if no token
    }
  }, [auth.token]);  // This runs whenever the token changes

  // Provide auth state and setAuth function to the rest of the app
  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
