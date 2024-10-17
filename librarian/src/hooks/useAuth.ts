import { useEffect, useState } from 'react';
import axios from '../utils/axiosConfig';
import { useNavigate } from 'react-router-dom';

interface User {
    isAuthenticated: boolean;
    first_name?: string;
    last_name?: string;
}

export const useAuth = () => {
    const [user, setUser] = useState<User | null>(null); // null indicates loading state
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                // Call the updated authentication endpoint
                const response = await axios.get('/');
                if (response.data.isAuthenticated) {
                    // If authenticated, set user data
                    setUser({
                        isAuthenticated: true,
                        first_name: response.data.first_name,
                        last_name: response.data.last_name,
                    });
                } else {
                    // If not authenticated, redirect to login
                    setUser({ isAuthenticated: false });
                    navigate('/login');
                }
            } catch (error) {
                console.error('Authentication check failed:', error);
                setUser({ isAuthenticated: false }); // Handle error by setting unauthenticated
                navigate('/login'); // Redirect to login
            }
        };

        checkAuth();
    }, [navigate]); // Only run once on mount

    return user; // Return the user data
};
