import { useEffect, useState } from "react";
import { ReservedBook, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import { fetchReservedBooks } from "@/services/api";

export default function ReservedBooks() {

  const [reservedBooks, setReservedBooks] = useState<ReservedBook[] | null>(null);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getDashboardData = async () => {
      try {
        const data = await fetchReservedBooks();
        console.log(data)
        setReservedBooks(data);
      } catch (error) {
        setError('Error fetching reserved data');
        console.log(error);
      }
    };

    getDashboardData();
  }, []);

  if (reservedBooks === null) {
    return <p className="grid min-h-screen place-content-center">Loading...</p>;
  }
  return (
    <main className="flex flex-1 flex-col gap-6 p-4">
      <div className="mx-auto grid w-full max-w-6xl">
        <h1 className="text-3xl font-semibold">Reserved Books</h1>
      </div>
      <div className="container mx-auto">
        <p className="text-red-600">{error && "Error"}</p>
        <DataTable columns={columns} data={reservedBooks} />
      </div>
    </main>

  )
}
