
import { z } from 'zod'

export const LoginSchema = z.object({
    studentID: z.string().min(10, {
        message: 'Enter a valid Student ID'
    }),
    password: z.string().min(8, {
        message: 'Password must be at least 8 characters'
    })
});


export const AddBookSchema = z.object({
    title: z.string().min(1, { message: 'Book Title is Required' }),
    author: z.string().min(1, { message: 'Book Author is Required' }),
    isbn: z.string().length(13, { message: 'ISBN Must be 13 characters long' }),
    publishedYear: z.string(),
    genre: z.string().min(1, { message: 'Book Genre is Required' }),
    description: z.string().min(1, { message: 'Book Description is Required Required' }),
    availableCopies: z.string(),
    totalCopies: z.string(),
    location: z.string().min(1, { message: 'Location of the book in the Library is Required' }),
});
export const AddPastPaperSchema = z.object({
    title: z.string().min(1, { message: 'Book Title is Required' }),
    file: z.string().min(1, { message: 'Book File is Required' }),
});





