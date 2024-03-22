import React, { useState, useEffect, Fragment } from "react";
import styled from "@emotion/styled";

import * as BookAPI from "../../api/books";
import { Book } from "../../../server/models/Book";

import { Wrapper } from "../../components/~Wrapper";
import Nav from "../../components/Nav";
import { Header } from "../../components/Header";

const BooksList = styled.ul({
  width: "100%",
});

const BooksItem = styled.li({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: 16,

  backgroundColor: "#f9f9f9",
  borderBottom: "1px solid #ccc",
  padding: 16,
  marginBottom: 16,
});

const BooksData = styled.span({
  marginBlock: 4,
});

const BooksDataLabel = styled.p({
  fontWeight: "bold",
});

const BooksDataInfo = styled.p({
  marginLeft: 8,
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
      <Header>Books!</Header>
      <BooksList key="booksList">
        {books.map((book) => {
          return (
            <BooksItem key={`${book.id}-frag`}>
              <img src={book.img} alt="images" />
              <div>
                <BooksData>
                  <BooksDataLabel>Title</BooksDataLabel>
                  <BooksDataInfo>{book.title}</BooksDataInfo>
                </BooksData>
                <BooksData>
                  <BooksDataLabel>Genera</BooksDataLabel>
                  <BooksDataInfo>{book.genera}</BooksDataInfo>
                </BooksData>
              </div>
            </BooksItem>
          );
        })}
      </BooksList>
    </Wrapper>
  );
}

export default Books;
