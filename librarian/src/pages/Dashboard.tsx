import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { fetchDashboardData } from "@/services/api"
import { useState, useEffect } from "react"


export default function Dashboard() {
    const [dashboardData, setDashboardData] = useState<{
        totalBooks: number;
        borrowedBooks: number;
        reservedBooks: number;
        overdueBooks: number;
    } | null>(null);

    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getDashboardData = async () => {
            try {
                const data = await fetchDashboardData();
                setDashboardData(data);
            } catch (error) {
                setError('Error fetching dashboard data');
                console.log(error);
            }
        };

        getDashboardData();
    }, []);

    if (dashboardData === null) {
        return <p className="grid min-h-screen place-content-center">Loading...</p>;
    }

    
  return (
      <main className="flex flex-1 flex-col gap-6 p-4">
          {error && <p className="text-red-500">{error}</p>}
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
              <Card>
                  <CardHeader>
                      <CardTitle>Total Books</CardTitle>
                  </CardHeader>
                  <CardContent>
                      <p className="text-2xl font-bold">
                          {dashboardData.totalBooks}
                      </p>
                  </CardContent>
              </Card>
              <Card>
                  <CardHeader>
                      <CardTitle>Borrowed Books</CardTitle>
                  </CardHeader>
                  <CardContent>
                      <p className="text-2xl font-bold">
                          {dashboardData.borrowedBooks}
                      </p>
                  </CardContent>
              </Card>
              <Card>
                  <CardHeader>
                      <CardTitle>Reserved Books</CardTitle>
                  </CardHeader>
                  <CardContent>
                      <p className="text-2xl font-bold">
                          {dashboardData.reservedBooks}
                      </p>
                  </CardContent>
              </Card>
              <Card>
                  <CardHeader>
                      <CardTitle>Overdue Books</CardTitle>
                  </CardHeader>
                  <CardContent>
                      <p className="text-2xl font-bold">
                          {dashboardData.overdueBooks}
                      </p>
                  </CardContent>
              </Card>
          </div>
      </main>
  )
}
