import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";

import { Wrapper } from "../../components/~Wrapper";
import Nav from "../../components/Nav";
import { Header } from "../../components/Header";

import { Author } from "../../../server/models/Author";
import * as authorsAPI from "../../api/authors";
import { Link } from "react-router-dom";

function Authors() {
  const [authors, setAuthors] = useState<Author[]>([]);

  useEffect(() => {
    try {
      authorsAPI.getAuthors().then(setAuthors);
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <Wrapper>
      <Nav></Nav>
      <Header>Authors!</Header>
      <ul>
        {authors.map((author) => (
          <li key={author.id}>
            <Link to={`/authors/${author.id}`}>{author.firstname}</Link>
          </li>
        ))}
      </ul>
    </Wrapper>
  );
}

export default Authors;
