import React, { Fragment, useEffect, useState } from "react";
import { Form, Link } from "react-router-dom";
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
import styled from "@emotion/styled";

const BigFont = styled.span({
  fontSize: 24,
});

const FormWrapper = styled.div({
  color: "white",
  display: "flex",
  flexDirection: "column",
  gap: 16,
  marginBlock: 16,
  "& label": {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    "& input": {
      padding: 8,
      borderRadius: 4,
      border: "1px solid #ccc",
    },
  },
});

const AddButton = styled.div({
  width: "100%",
  justifyContent: "flex-end",
  display: "flex",
  paddingBlock: 16,
  alignItems: "center",

  "& button": {
    height: "50px",
    padding: 8,
    borderRadius: 4,
    border: "1px solid #ccc",
    backgroundColor: "white",
    color: "#333",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#f0f0f0",
    },
  },
});

function Books() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<Boolean>(true);
  const [addBook, setAddBook] = useState(false);
  const [authorsList, setAuthorsList] = useState<string[]>([]);
  const [author, setAuthor] = useState<string>("");

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

  function removeAuthor(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    i: number
  ) {
    e.preventDefault();
    authorsList.splice(i, 1); // rm item from list
    setAuthorsList(authorsList); // set new list
  }

  function handleAuthorChange(e: {
    target: { value: React.SetStateAction<string> };
  }) {
    setAuthor(e?.target.value);
  }

  function updateAuthor(e: {
    preventDefault: () => void;
    target: { value: any };
  }) {
    // e.preventDefault();
    if (author.length === 0) return;
    setAuthorsList([...authorsList, author]);
    setAuthor("");
  }

  function submitBook(e: any) {
    e.preventDefault();
    const form = e.target;

    const formData = new FormData(form);

    const data = {
      title: formData.get("title") as string,
      genera: formData.get("genera") as string,
      authors: authorsList,
      img: formData.get("img"),
    };

    BookAPI.addBook(data)
      .then((book) => {
        setBooks([...books, book]);
      })
      .then(() => {
        setAddBook(false);
      });
  }

  function handleAddBook() {
    setAddBook(!addBook);
  }

  return (
    <Wrapper>
      <Nav></Nav>
      <AddButton>
        <Header>Books!</Header>
        <button onClick={handleAddBook}>{addBook ? "nvm" : "add"}</button>
      </AddButton>

      {addBook && (
        <Form onSubmit={submitBook}>
          <FormWrapper>
            Add a book:
            <label htmlFor="title">
              Title
              <input
                placeholder="add title"
                type="text"
                id="title"
                required
                name="title"
              />
            </label>
            <label htmlFor="genera">
              genera
              <input
                placeholder="add genera"
                type="text"
                id="genera"
                required
                name="genera"
              />
            </label>
            <label htmlFor="img">
              img
              <input
                placeholder="add img"
                type="text"
                id="img"
                required
                name="img"
              />
            </label>
            <label htmlFor="author">
              author(s)
              <ul>
                {authorsList.map((author, i) => (
                  <li key={i}>
                    {author}&nbsp;
                    <button type="button" onClick={(e) => removeAuthor(e, i)}>
                      x
                    </button>
                  </li>
                ))}
              </ul>
              <input
                placeholder="add author"
                type="text"
                id="author"
                name="author"
                value={author}
                onChange={handleAuthorChange}
              />
              <button type="button" onClick={updateAuthor}>
                add author
              </button>
            </label>
            <button type="submit">submit</button>
          </FormWrapper>
        </Form>
      )}

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
                      <BigFont>
                        <Link to={`/books/${book.id}`}>{book.title}</Link>
                      </BigFont>
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
