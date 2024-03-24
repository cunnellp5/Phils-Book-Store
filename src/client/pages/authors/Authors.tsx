import React, { Fragment, useEffect, useState } from "react";
import styled from "@emotion/styled";

import { Wrapper } from "../../styles/Wrapper";
import Nav from "../../components/Nav";
import { Header } from "../../components/Header";

import { Author } from "../../../server/models/Author";
import * as authorsAPI from "../../api/authors";
import { Link } from "react-router-dom";
import {
  DataInfo,
  DataLabel,
  DataStyle,
  ImgStyle,
  ItemStyle,
  ListStyle,
} from "../../styles/DataStyles";

const Bio = styled.p({
  fontSize: "16px",
  marginLeft: "8px",
});

function Authors() {
  const [authors, setAuthors] = useState<Author[]>([]);

  useEffect(() => {
    try {
      authorsAPI.getAuthors().then(setAuthors);
    } catch (error) {
      console.error(error);
    }
  }, []);
  console.log(authors);
  return (
    <Wrapper>
      <Nav></Nav>
      <Header>Authors!</Header>
      <ListStyle>
        {authors.map((author) => {
          return (
            <ItemStyle key={`${author.id}-frag`}>
              <ImgStyle
                src="https://picsum.photos/150/150"
                alt={author.firstname}
              />
              <div>
                <DataStyle>
                  <DataLabel>Name</DataLabel>
                  <DataInfo>
                    <Link to={`/authors/${author.id}`}>
                      {author.firstname} {author.lastname}
                    </Link>
                  </DataInfo>
                </DataStyle>
                <DataStyle>
                  <DataLabel>Bio</DataLabel>
                  <Bio>{author.bio}</Bio>
                </DataStyle>
                <DataStyle>
                  <DataLabel>
                    Book{author.books.length > 1 ? "s" : ""}
                  </DataLabel>
                  <DataInfo>
                    {author.books.map((book) => {
                      return (
                        <Fragment key={`${book.id}-frag`}>
                          <p>
                            <Link to={`/books/${book.id}`}>{book.title}</Link>
                            {author.books.length > 1 ? ", " : ""}
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
      {/* <ul>
        {authors.map((author) => (
          <li key={author.id}>
            <Link to={`/authors/${author.id}`}>{author.firstname}</Link>
          </li>
        ))}
      </ul> */}
    </Wrapper>
  );
}

export default Authors;
