"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Download } from "lucide-react"

export type PastPaper = {
    title: string,
    school: string;
    file_path: string;
}

export const columns: ColumnDef<PastPaper>[] = [
    {
        accessorKey: "title",
        header: "Title",
    },
    {
        accessorKey: "school",
        header: "School",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const pastPaper = row.original

            const handleDownload = (filename: string) => {
                const encodedFilename = encodeURIComponent(filename); // Encode the filename for URL
                window.location.href = `http://localhost:3000/download/${encodedFilename}`; // Navigate to the download endpoint
            };


            return (
                <Download onClick={() => handleDownload(pastPaper.file_path)} className="cursor-pointer"/>

            )
        },
    },

]
