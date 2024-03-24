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
import { Bio } from "../../styles/Bio";
import { AuthorList } from "../../styles/AuthorList";

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
                  <DataLabel bold>
                    <Link to={`/authors/${author.id}`}>
                      {author.firstname} {author.lastname}
                    </Link>
                  </DataLabel>
                </DataStyle>
                <DataStyle>
                  <Bio>{author.bio}</Bio>
                </DataStyle>
                <DataStyle>
                  <DataInfo>
                    {author.books.map((book) => {
                      return (
                        <Fragment key={`${book.id}-frag`}>
                          <AuthorList>
                            - <Link to={`/books/${book.id}`}>{book.title}</Link>
                            {author.books.length > 1 ? ", " : ""}
                          </AuthorList>
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
    </Wrapper>
  );
}

export default Authors;
