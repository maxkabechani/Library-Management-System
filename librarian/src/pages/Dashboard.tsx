import {
    ArrowUpRight,
    Link,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
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
          <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-4">
              <Card
                  className="xl:col-span-2" x-chunk="dashboard-01-chunk-4"
              >
                  <CardHeader className="flex flex-row items-center">
                      <div className="grid gap-2">
                          <CardTitle>Reserved Books</CardTitle>
                          <CardDescription>
                              Recent reserved books.
                          </CardDescription>
                      </div>
                      <Button asChild size="sm" className="ml-auto gap-1">
                          <Link href="/">
                              View All
                              <ArrowUpRight className="h-4 w-4" />
                          </Link>
                      </Button>
                  </CardHeader>
                  <CardContent>
                      <Table>
                          <TableHeader>
                              <TableRow>
                                  <TableHead>Student</TableHead>
                                  <TableHead className="text-right">Book</TableHead>
                              </TableRow>
                          </TableHeader>
                          <TableBody>
                              <TableRow>
                                  <TableCell>
                                      <div className="font-medium">Liam Johnson</div>
                                      <div className="hidden text-sm text-muted-foreground md:inline">
                                          2022065848
                                      </div>
                                  </TableCell>
                                  <TableCell className="text-right">The Great Gatsby</TableCell>
                              </TableRow>
                          </TableBody>
                      </Table>
                  </CardContent>
              </Card>
              <Card
                  className="xl:col-span-2" x-chunk="dashboard-01-chunk-4"
              >
                  <CardHeader className="flex flex-row items-center">
                      <div className="grid gap-2">
                          <CardTitle>Borrowed Books</CardTitle>
                          <CardDescription>
                              Recent borrowed books.
                          </CardDescription>
                      </div>
                      <Button asChild size="sm" className="ml-auto gap-1">
                          <Link href="/">
                              View All
                              <ArrowUpRight className="h-4 w-4" />
                          </Link>
                      </Button>
                  </CardHeader>
                  <CardContent>
                      <Table>
                          <TableHeader>
                              <TableRow>
                                  <TableHead>Student</TableHead>
                                  <TableHead className="text-right">Book</TableHead>
                              </TableRow>
                          </TableHeader>
                          <TableBody>
                              <TableRow>
                                  <TableCell>
                                      <div className="font-medium">Liam Johnson</div>
                                      <div className="hidden text-sm text-muted-foreground md:inline">
                                          2022065848
                                      </div>
                                  </TableCell>
                                  <TableCell className="text-right">The Great Gatsby</TableCell>
                              </TableRow>
                          </TableBody>
                      </Table>
                  </CardContent>
              </Card>
              
          </div>
      </main>
  )
}
