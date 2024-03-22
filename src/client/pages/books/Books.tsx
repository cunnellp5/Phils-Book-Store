import React, { useState, useEffect, Fragment } from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

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
  gap: 16,
  borderRadius: 4,

  backgroundColor: "#f9f9f9",
  borderBottom: "1px solid #ccc",
  padding: 16,
  marginBottom: 16,
});

const BooksData = styled.div({
  marginBottom: 16,
});

const BooksDataLabel = styled.p({
  fontWeight: "bold",
});

const BooksDataInfo = styled.p({
  marginLeft: 8,
});

const BooksImg = styled.img({
  width: 100,
  height: 100,
  backgroundColor: "#ffcfb0",
  fontSize: 12,
  borderRadius: 4,
});

const BooksLoading = styled.div({
  color: "white",
  fontSize: 16,
});

function Books() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<Boolean>(true);

  useEffect(() => {
    try {
      setTimeout(() => {
        BookAPI.getBooks()
          .then(setBooks)
          .then(() => setLoading(false));
      }, 250);
    } catch (err) {
      setLoading(false);
      console.log("failed to fetch books", err);
    }
  }, []);

  return (
    <Wrapper>
      <Nav></Nav>
      <Header>Books!</Header>
      {loading ? (
        <BooksLoading>Loading...</BooksLoading>
      ) : (
        <BooksList key="booksList">
          {books.map((book) => {
            return (
              <BooksItem key={`${book.id}-frag`}>
                <BooksImg
                  src="https://picsum.photos/100/100"
                  alt={book.title}
                />
                <div>
                  <BooksData>
                    <BooksDataLabel>
                      <Link to={`/books/${book.id}`}>Title</Link>
                    </BooksDataLabel>
                    <BooksDataInfo>{book.title}</BooksDataInfo>
                  </BooksData>
                  <BooksData>
                    <BooksDataLabel>Genera</BooksDataLabel>
                    <BooksDataInfo>{book.genera}</BooksDataInfo>
                  </BooksData>
                  <BooksData>
                    <BooksDataLabel>
                      Author{book.authors.length > 1 ? "s" : ""}
                    </BooksDataLabel>
                    <BooksDataInfo>
                      {book.authors.map((author) => {
                        return (
                          <Fragment key={`${author.id}-frag`}>
                            <p>
                              <Link to={`/authors/${author.id}`}>
                                {author.firstname} {author.lastname}
                              </Link>
                              {book.authors.length > 1 ? ", " : ""}
                            </p>
                          </Fragment>
                        );
                      })}
                    </BooksDataInfo>
                  </BooksData>
                </div>
              </BooksItem>
            );
          })}
        </BooksList>
      )}
    </Wrapper>
  );
}

export default Books;
