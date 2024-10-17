import { ColumnDef } from "@tanstack/react-table"

export type BorrowedBook = {
    title: string,
    author: string,
    published_year: number,
    edition: number,
    borrow_date: string,
    due_date: string,
}



export const columns: ColumnDef<BorrowedBook>[] = [
    {
        accessorKey: "title",
        header: "Book Title",
    },
    {
        accessorKey: "author",
        header: "Author",
    },
    
    {
        accessorKey: "edition",
        header: "Edition",
    },
    {
        accessorKey: "status",
        header: "Status",
    },
    {
        accessorKey: "borrow_date",
        header: "Borrowed On",
    },
    {
        accessorKey: "due_date",
        header: "Due Date",
    },

]
