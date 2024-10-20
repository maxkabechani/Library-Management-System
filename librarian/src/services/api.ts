import axios from '../utils/axiosConfig';

export const login = async (email: string, password: string) => {
    return axios.post('login', { email, password });
};

export const logout = async () => {
    return axios.post('logout');
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
        const response = await axios.get('books');
        return response.data;
    } catch (error) {
        console.error('Error fetching books:', error);
        throw error;
    }
}

export const fetchBorrowedBooks = async () => {
    try {
        const response = await axios.get('/borrowed-books');
        return response.data;
    } catch (error) {
        console.error('Error fetching books:', error);
        throw error;
    }
}

export const fetchReservedBooks = async () => {
    try {
        const response = await axios.get('/reserved-books');
        console.log(response)
        return response.data;
    } catch (error) {
        console.error('Error fetching books:', error);
        throw error;
    }
}

export const findStudent = async (student_id: string) => {
    const response = await axios.post('/find-student', {
        student_id
    });
    return response;
}
export const getBook = async (id: string) => {
    try {
        console.log(id)
        const response = await axios.get(`/book/${id}`);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

export const deleteBook = async (id: number) => {
    try {
        const response = await axios.post(`/delete-book/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching past-papers:', error);
        throw error;
    }
}

export const addBorrowedBook = async (book_id: number, student_id: number, due_date: Date) => {
    try {
        const response = await axios.post('/lend-book', {
            book_id, student_id, due_date
        });
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

export const addBook = async (title: string,
    author: string,
    isbn: string,
    publishedYear: number,
    edition: number,
    genre: string,
    description: string,
    availableCopies: number,
    totalCopies: number,
    location: string) => {
    try {
        const response = await axios.post('/book', {
            title,
            author,
            isbn,
            publishedYear,
            edition,
            genre,
            description,
            availableCopies,
            totalCopies,
            location,
        });
        return response.data;
    } catch (error) {
        console.error('Error adding book:', error);
        throw error;
    }
}
export const editBook = async (id: string, title: string,
    author: string,
    isbn: string,
    publishedYear: number,
    edition: number,
    genre: string,
    description: string,
    availableCopies: number,
    totalCopies: number,
    location: string) => {
    try {
        const response = await axios.post(`/edit-book/${id}`, {
            title,
            author,
            isbn,
            publishedYear,
            edition,
            genre,
            description,
            availableCopies,
            totalCopies,
            location,
        });
        return response.data;
    } catch (error) {
        console.error('Error adding book:', error);
        throw error;
    }
}


export const returnBook = async (id: number) => {
    try {
        const response = await axios.post(`/return-book/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching past-papers:', error);
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


export const addPastPaper = async (title: string, schoolId: string,
    file: File,) => {
    try {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('school_id', schoolId);
        formData.append('file', file);

        const response = await axios.post('/past-paper', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error adding past paper:', error);
        throw error;
    }
}


export const reservedToBorrowed = async (id: number) => {
    const response = await axios.post(`/reserved-borrowed/${id}`);
    return response;
}


export const getSchools = async () => {
    const response = await axios.get('/schools')
    return response.data;
}