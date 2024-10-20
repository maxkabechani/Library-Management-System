"use client"

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
import { reservedToBorrowed } from "@/services/api"
import { AxiosError } from "axios"

export type ReservedBook = {
    reservation_id: number,
    student_id: string,
    first_name: string,
    last_name: string,
    title: string,
    author: string,
    published_year: number,
    edition: number,


}

async function handleReturn(id: number) {
    try {
        const res = await reservedToBorrowed(id);
        if (res.data.success) {
            window.location.reload();
        }
    } catch (error) {
        console.log(error)
        if (error instanceof AxiosError) {
            console.log(error.response?.data)
        }
    }
}

export const columns: ColumnDef<ReservedBook>[] = [
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
        accessorKey: "published_year",
        header: "Year",
    },
    {
        accessorKey: "edition",
        header: "Edition",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const reservation = row.original

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
                            onClick={() => handleReturn(reservation.reservation_id)}
                        >
                            Change to Borrowed
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
    
]
