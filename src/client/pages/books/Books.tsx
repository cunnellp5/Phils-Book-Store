import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Book } from "../../../server/models/Book";
import * as BookAPI from "../../api/books";
import { Header } from "../../components/Header";
import Nav from "../../components/Nav";
import { Wrapper } from "../../styles/Wrapper";
import {
  DataInfo,
  DataLabel,
  DataStyle,
  ImgStyle,
  ItemStyle,
  ListStyle,
  LoadingStyle,
} from "../../styles/DataStyles";

function Books() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<Boolean>(true);

  useEffect(() => {
    try {
      BookAPI.getBooks()
        .then(setBooks)
        .then(() => setLoading(false));
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
                  src="https://picsum.photos/150/150"
                  alt={book.title}
                />
                <div>
                  <DataStyle>
                    <DataLabel bold>
                      <h3>
                        <Link to={`/books/${book.id}`}>{book.title}</Link>
                      </h3>
                    </DataLabel>
                  </DataStyle>
                  <DataStyle>
                    <DataLabel bold>Genera</DataLabel>
                    <DataInfo>{book.genera}</DataInfo>
                  </DataStyle>
                  <DataStyle>
                    <DataLabel bold>
                      Author{book.authors.length > 1 ? "s" : ""}
                    </DataLabel>
                    <DataInfo>
                      {book.authors.map((author, i) => {
                        return (
                          <Fragment key={`${author.id}-frag`}>
                            <p>
                              <Link to={`/authors/${author.id}`}>
                                {author.firstname} {author.lastname}
                              </Link>
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
