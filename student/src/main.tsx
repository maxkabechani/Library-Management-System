import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App.tsx'
import './index.css'
import Login from './pages/Auth/Login.tsx';
import Dashboard from './pages/Dashboard/Dashboard.tsx';
import Books from './pages/Books/Books.tsx';
import BorrowedBooks from './pages/BorrowedBook/BorrowedBooks.tsx';
import ReservedBooks from './pages/ReservedBook/ReservedBooks.tsx';
import PastPapers from './pages/PastPapers/PastPapers.tsx';
import path from 'path';
import AllPastPapers from './pages/PastPapers/AllPastPapers.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Dashboard />
      },
      {
        path: "/books",
        element: <Books />
      },
      {
        path: "/borrowed-books",
        element: <BorrowedBooks />
      },
      {
        path: "/reserved-books",
        element: <ReservedBooks />
      },
      {
        path: "/past-papers",
        element: <PastPapers />,
        children: [
          {
            path: "",
            element: <AllPastPapers/>
          }
        ]
      },
    ]
  },
  {
    path: "/login",
    element: <Login />
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
