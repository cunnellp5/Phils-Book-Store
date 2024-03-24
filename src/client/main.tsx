import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import Books from "./pages/books/Books";
import Book from "./pages/books/Book";
import Authors from "./pages/authors/Authors";
import Author from "./pages/authors/Author";

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
    path: "/authors",
    element: <Authors></Authors>,
  },
  {
    path: "/authors/:id",
    element: <Author />,
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
