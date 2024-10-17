import { ColumnDef } from "@tanstack/react-table"

export type ReservedBook = {
    title: string,
    author: string,
    published_year: number,
    edition: number,
    status: string,
    reserved_at: string,
}



export const columns: ColumnDef<ReservedBook>[] = [
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
        accessorKey: "reserved_at",
        header: "Reserved On",
    },

]
