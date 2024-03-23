import React, { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";

import * as BookAPI from "../../api/books";

import { Wrapper } from "../../components/~Wrapper";
import Nav from "../../components/Nav";
import { Header } from "../../components/Header";

import { Book as BookType } from "../../../server/models/Book";
import { useNavigate } from "react-router-dom";

function Book() {
  const [book, setBook] = useState<BookType>();
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    if (!id) return navigate("/books"); // unsure how this would ever get hit

    try {
      const numberId = parseInt(id);
      BookAPI.getBook(numberId).then(setBook);
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <Wrapper>
      <Nav></Nav>
      <Header>A Book</Header>
    </Wrapper>
  );
}

export default Book;
