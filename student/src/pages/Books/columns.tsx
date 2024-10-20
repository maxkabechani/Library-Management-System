import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AxiosError } from "axios"
import { reserveBook } from "@/services/api"

export type Book = {
    book_id: number,
    author: string,
    isbn: string,
    title: string,
    published_year: number,
    edition: number,
    location: string
}

async function handleReserve(id:number) {
    try {
        const res = await reserveBook(id);
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

export const columns: ColumnDef<Book>[] = [
   
    {
        accessorKey: "title",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Title
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
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
        accessorKey: "isbn",
        header: "ISBN",
    },
    {
        accessorKey: "location",
        header: "Location",
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
                        <DropdownMenuItem onClick={()=> handleReserve(book.book_id)}>
                                Reserve Book
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },

]
