import { useEffect, useState } from "react";
import { PastPaper, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import { fetchPastPapers } from "@/services/api";

export default function AllPastPapers() {

  const [pastPapers, setPastPapers] = useState<PastPaper[] | null>(null);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getPastPapers = async () => {
      try {
        const data = await fetchPastPapers();
        console.log(data)
        setPastPapers(data);
      } catch (error) {
        setError('Error fetching dashboard data');
        console.log(error);
      }
    };

    getPastPapers();
  }, []);

  if (pastPapers === null) {
    return <p className="grid min-h-screen place-content-center">Loading...</p>;
  }


  return (
    <div className="container mx-auto">
      <p className="text-red-600">{error && "Error" }</p>
      <DataTable columns={columns} data={pastPapers} />
    </div>
  )
}
