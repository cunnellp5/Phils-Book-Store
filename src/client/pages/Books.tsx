import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";

import * as BookAPI from "../api/books";
import { Book } from "../../server/models/Book";

import styles from "./~Books.module.css";
import { Wrapper } from "../components/~Wrapper";
import Nav from "../components/Nav";

export const BooksStyled = styled.div({
  width: "100%",
  height: 150,
  fontSize: 60,
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

function Books() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    try {
      BookAPI.getBooks().then(setBooks);
    } catch (err) {
      console.log("failed to fetch books", err);
    }
  });

  return (
    <Wrapper>
      <Nav></Nav>
      <BooksStyled>Books!</BooksStyled>
      <ul>
        {books.map((book) => {
          return (
            <>
              <li className={styles.booksList} key={book.id}>
                {book.title}
              </li>
              <small>Genera: {book.genera}</small>
            </>
          );
        })}
      </ul>
    </Wrapper>
  );
}

export default Books;
