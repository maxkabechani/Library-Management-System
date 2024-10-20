import {
  Book,
  BookMarked,
  BookMarkedIcon,
  BookUp2,
  BookUp2Icon,
  CircleUser,
  Home,
  Library,
  Menu,
  Paperclip,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from './hooks/useAuth';
import { logout } from "./services/api";

export default function App() {
  const user = useAuth()
  const navigate = useNavigate();



  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (user === null) {
    return <p className="grid min-h-screen place-content-center">Loading...</p>;
  }

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <NavLink to="/" className="flex items-center gap-2 font-semibold">
              <Library className="h-6 w-6" />
              <span className="">LMS</span>
            </NavLink>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <NavLink
                to="/"
                className={({ isActive }) => `flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${isActive && "bg-muted"}`}
              >
                <Home className="h-4 w-4" />
                Dashboard
              </NavLink>
              <NavLink
                to="/books"
                className={({ isActive }) => `flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${isActive && "bg-muted"}`}
              >
                <Book className="h-4 w-4" />
                Books
              </NavLink>
              <NavLink
                to="/borrowed-books"
                className={({ isActive }) => `flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${isActive && "bg-muted"}`}
              >
                <BookUp2 className="h-4 w-4" />
                Borrowed Books{" "}
              </NavLink>
              <NavLink
                to="/reserved-books"
                className={({ isActive }) => `flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${isActive && "bg-muted"}`}
              >
                <BookMarkedIcon className="h-4 w-4" />
                Reserved Books
              </NavLink>
              <NavLink
                to="/past-papers"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Paperclip className="h-4 w-4" />
                Past Papers
              </NavLink>
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <NavLink
                  to="#"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Library className="h-6 w-6" />
                  <span className="sr-only">Acme Inc</span>
                </NavLink>
                <NavLink
                  to="/"
                  className={({ isActive }) => `mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground ${isActive && "bg-muted"}`}
                >
                  <Book className="h-5 w-5" />
                  Dashboard
                </NavLink>
                <NavLink
                  to="/books"
                  className={({ isActive }) => `mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground ${isActive && "bg-muted"}`}
                >
                  <Book className="h-5 w-5" />
                  Books
                </NavLink>
                <NavLink
                  to="borrowed-books"
                  className={({ isActive }) => `mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground ${isActive && "bg-muted"}`}
                >
                  <BookUp2Icon className="h-5 w-5" />
                  Borrowed Books
                </NavLink>
                <NavLink
                  to="reserved-books"
                  className={({ isActive }) => `mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground ${isActive && "bg-muted"}`}
                >
                  <BookMarked className="h-5 w-5" />
                  Reserved Books
                </NavLink>
                <NavLink
                  to="/past-papers"
                  className={({ isActive }) => `mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground ${isActive && "bg-muted"}`}
                >
                  <Paperclip className="h-5 w-5" />
                  Past Papers
                </NavLink>
              </nav>
            </SheetContent>
          </Sheet>
          <DropdownMenu >
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{user?.first_name} {user?.last_name}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <Outlet />
      </div>
    </div>
  );
}
