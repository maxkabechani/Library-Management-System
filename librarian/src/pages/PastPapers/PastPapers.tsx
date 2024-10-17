import { Outlet, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button";


export default function PastPapers() {
  const navigate = useNavigate();
  return (
    <main className="flex flex-1 flex-col gap-6 p-4">
      <div className="mx-auto grid w-full max-w-6xl">
        <h1 className="text-3xl font-semibold">Past Papers</h1>
      </div>
      <div className="container mx-auto">
        <Button onClick={() => navigate('/add-past-paper')}>Add Past Paper</Button>
        <Outlet />      
        </div>
    </main>
  )
}
