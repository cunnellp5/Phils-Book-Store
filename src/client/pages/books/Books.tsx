import React, { useState, useEffect, Fragment } from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

import * as BookAPI from "../../api/books";
import { Book } from "../../../server/models/Book";

import { Wrapper } from "../../components/~Wrapper";
import Nav from "../../components/Nav";
import { Header } from "../../components/Header";

export const ListStyle = styled.ul({
  width: "100%",
});

export const ItemStyle = styled.li({
  display: "flex",
  flexDirection: "row",
  gap: 16,
  borderRadius: 4,

  backgroundColor: "#f9f9f9",
  borderBottom: "1px solid #ccc",
  padding: 16,
  marginBottom: 16,
});

export const DataStyle = styled.div({
  marginBottom: 16,
});

export const DataLabel = styled.p({
  fontWeight: "bold",
});

export const DataInfo = styled.div({
  marginLeft: 8,
});

export const ImgStyle = styled.img({
  width: 100,
  height: 100,
  backgroundColor: "#ffcfb0",
  fontSize: 12,
  borderRadius: 4,
});

export const LoadingStyle = styled.div({
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
        <LoadingStyle>Loading...</LoadingStyle>
      ) : (
        <ListStyle>
          {books.map((book) => {
            return (
              <ItemStyle key={`${book.id}-frag`}>
                <ImgStyle
                  src="https://picsum.photos/100/100"
                  alt={book.title}
                />
                <div>
                  <DataStyle>
                    <DataLabel>
                      <Link to={`/books/${book.id}`}>Title</Link>
                    </DataLabel>
                    <DataInfo>{book.title}</DataInfo>
                  </DataStyle>
                  <DataStyle>
                    <DataLabel>Genera</DataLabel>
                    <DataInfo>{book.genera}</DataInfo>
                  </DataStyle>
                  <DataStyle>
                    <DataLabel>
                      Author{book.authors.length > 1 ? "s" : ""}
                    </DataLabel>
                    <DataInfo>
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
                    </DataInfo>
                  </DataStyle>
                </div>
              </ItemStyle>
            );
          })}
        </ListStyle>
      )}
    </Wrapper>
  );
}

export default Books;
