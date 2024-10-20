
import { z } from 'zod'

export const LoginSchema = z.object({
    email: z.string().email({
        message: 'Enter a valid email'
    }),
    password: z.string().min(8, {
        message: 'Password must be at least 8 characters'
    })
});


export const AddBookSchema = z.object({
    title: z.string().min(1, { message: 'Book Title is Required' }),
    author: z.string().min(1, { message: 'Book Author is Required' }),
    isbn: z.string().length(13, { message: 'ISBN Must be 13 characters long' }),
    publishedYear: z.coerce.number(),
    edition: z.coerce.number(),
    genre: z.string().min(1, { message: 'Book Genre is Required' }),
    description: z.string().min(1, { message: 'Book Description is Required Required' }),
    availableCopies: z.coerce.number().min(1, { message: "Available Copies Required" }),
    totalCopies: z.coerce.number().min(1, {message: "Total Copies Required"}),
    location: z.string().min(1, { message: 'Location of the book in the Library is Required' }),
});
export const AddPastPaperSchema = z.object({
    title: z.string().min(1, { message: 'Book Title is Required' }),
    school: z.string().min(1, {message: "School is Required"}),
    file: z
        .any()
        .refine((file) => file instanceof File, { message: 'Book File is required' }),
});
export const AddBorrowedBookSchema = z.object({
    book_id: z.number().min(1, { message: 'Book is required' }),
    student_id: z.number().min(1, { message: 'Student ID is Required' }),
    first_name: z.string().min(1, { message: 'Student ID is Required' }),
    last_name: z.string().min(1, { message: 'Student ID is Required' }),
    book_title: z.string().min(1, { message: 'Student ID is Required' }),
    book_author: z.string().min(1, { message: 'Student ID is Required' }),
    due_date: z.date({ message: 'Due Date is Required' }),
});


export type PastPaper = {
    id: string
    amount: number
    status: "pending" | "processing" | "success" | "failed"
    email: string
}




