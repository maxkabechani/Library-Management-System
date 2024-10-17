import axios from '../utils/axiosConfig';

export const login = async (studentID: string, password: string) => {
    return axios.post('/login', { studentID, password });
};

export const logout = async () => {
    return axios.post('/logout');
};

export const fetchUserData = async () => {
    return axios.get('/info');
};


export const fetchDashboardData = async () => {
    try {
        const response = await axios.get('/dashboard');
        return response.data; 
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        throw error; 
    }
};


export const fetchBooks = async () => {
    try {
        const response = await axios.get('/books');
        return response.data;
    } catch (error) {
        console.error('Error fetching books:', error);
        throw error; 
    }
}

export const fetchBorrowedBooks = async () => {
    try {
        const response = await axios.get('/borrowed-books');
        console.log(response)
        return response.data;
    } catch (error) {
        console.error('Error fetching books:', error);
        throw error; 
    }
}

export const fetchReservedBooks = async () => {
    try {
        const response = await axios.get('/reserved-books');
        return response.data;
    } catch (error) {
        console.error('Error fetching books:', error);
        throw error; 
    }
}

export const fetchPastPapers = async () => {
    try {
        const response = await axios.get('/past-papers');
        return response.data;
    } catch (error) {
        console.error('Error fetching past-papers:', error);
        throw error;
    }
}