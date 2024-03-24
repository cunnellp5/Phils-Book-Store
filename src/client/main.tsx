import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import Books from "./pages/books/Books";
import Book from "./pages/books/Book";
import Authors from "./pages/authors/Authors";
import Author from "./pages/authors/Author";
import EditBook from "./pages/books/EditBook";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
  },
  {
    path: "/books",
    element: <Books></Books>,
  },
  {
    path: "/books/:id",
    element: <Book></Book>,
  },
  {
    path: "/books/:id/edit",
    element: <EditBook></EditBook>,
  },
  {
    path: "/books/delete",
    element: <EditBook></EditBook>,
  },
  {
    path: "/authors",
    element: <Authors></Authors>,
  },
  {
    path: "/authors/:id",
    element: <Author />,
  },
  {
    path: "/authors/:id/edit",
    element: <EditBook></EditBook>,
  },
  {
    path: "/authors/delete",
    element: <EditBook></EditBook>,
  },
]);

// children routes example
// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Root />,
//     errorElement: <ErrorPage />,
//     children: [
//       {
//         path: "contacts/:contactId",
//         element: <Contact />,
//       },
//     ],
//   },

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
