import { useEffect, useState } from "react";
import { Book, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import { fetchBooks } from "@/services/api";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Books() {
  const navigate = useNavigate();


  const [books, setBooks] = useState<Book[] | null>(null);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getDashboardData = async () => {
      try {
        const data = await fetchBooks();
        console.log(data)
        setBooks(data);
      } catch (error) {
        setError('Error fetching data');
        console.log(error);
      }
    };

    getDashboardData();
  }, []);

  if (books === null) {
    return <p className="grid min-h-screen place-content-center">Loading...</p>;
  }


  return (
    
    <main className="flex flex-1 flex-col gap-6 p-4">
      <div className="mx-auto grid w-full max-w-6xl">
        <h1 className="text-3xl font-semibold">Books</h1>
      </div>
      <div className="container mx-auto">
        <Button onClick={() => navigate('/add-book')}>Add Book</Button>
        <p className="text-red-600">{error && "Error"}</p>
        <DataTable columns={columns} data={books} />
      </div>
    </main>

  )
}
