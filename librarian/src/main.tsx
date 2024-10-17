import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App.tsx'
import './index.css'
import Login from './pages/Auth/Login.tsx';
import Dashboard from './pages/Dashboard.tsx';
import Books from './pages/Books/Books.tsx';
import PastPapers from './pages/PastPapers/PastPapers.tsx';
import BorrowedBooks from './pages/BorrowedBooks/BorrowedBooks.tsx';
import AddPastPaper from './pages/PastPapers/AddPastPaper.tsx';
import ALLPastPapers from './pages/PastPapers/AllPastPapers.tsx';
import ReservedBooks from './pages/ReservedBooks/ReservedBooks.tsx';
import AddBook from './pages/Books/AddBook.tsx';
import AddBorrowedBook from './pages/BorrowedBooks/AddBorrowedBook.tsx';
import EditBook from './pages/Books/EditBook.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Dashboard />
      },
      {
        path: "borrowed-books",
        element: <BorrowedBooks />
      },
      {
        path: "lend-book/:id",
        element: <AddBorrowedBook />
      },
      {
        path: "reserved-books",
        element: <ReservedBooks />
      },
      {
        path: "books",
        element: <Books />
      },
      {
        path: "past-papers",
        element: <PastPapers />,
        children: [
          {
            path: "",
            element: <ALLPastPapers />
          },

        ]
      },
      {
        path: "add-book",
        element: <AddBook />
      },
      {
        path: "edit-book/:id",
        element: <EditBook />
      },
      {
        path: "add-past-paper",
        element: <AddPastPaper />,
      }
    ]
  },
  {
    path: "/login",
    element: <Login />
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
