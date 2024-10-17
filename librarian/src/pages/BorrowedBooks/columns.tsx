import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { returnBook } from "@/services/api"
import { AxiosError } from "axios"

export type BorrowedBook = {
    borrow_id: number
    student_id: string,
    first_name: string,
    last_name: string,
    title: string,
    author: string,
    published_year: number,
    edition: number,
    due_date: string
}

async function handleReturn(id: number) {
    try {
        const res = await returnBook(id);
        if (res.success) {
            window.location.reload();
        }
    } catch (error) {
        console.log(error)
        if (error instanceof AxiosError) {
            console.log(error.response?.data)
        }
    }
}

export const columns: ColumnDef<BorrowedBook>[] = [
    {
        accessorKey: "student_id",
        header: "Student ID",
    },
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
        accessorKey: "due_date",
        header: "Due Date",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const book = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={()=> handleReturn(book.borrow_id)}
                        >
                            Mark as Returned
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },

]
