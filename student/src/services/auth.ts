import axios from '../utils/axiosConfig';

export const login = async (credentials: { email: string; password: string }) => {
    const response = await axios.post('/login', credentials); // Adjust according to your backend route
    return response.data;
};

export const logout = async () => {
    await axios.post('/logout'); // Adjust according to your backend route
};
