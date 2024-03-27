import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Book, Author } from "../../../server/models/Book";
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

interface BookFormData {
  title: string;
  genera: string;
  img: string;
}

const BigFont = styled.span`
  font-size: 24px;
`;

const FormWrapper = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-block: 16px;

  & label {
    display: flex;
    flex-direction: column;
    gap: 8px;

    & input {
      padding: 8px;
      border-radius: 4px;
      border: 1px solid #ccc;
    }
  }
`;

const AddButton = styled.div`
  width: 100%;
  justify-content: flex-end;
  display: flex;
  padding-block: 16px;
  align-items: center;

  & button {
    height: 50px;
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #ccc;
    background-color: white;
    color: #333;
    cursor: pointer;

    &:hover {
      background-color: #f0f0f0;
    }
  }
`;

function Books() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [authors, setAuthors] = useState<string[]>([]);
  const [newAuthor, setNewAuthor] = useState<string>("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const booksData = await BookAPI.getBooks();
        setBooks(booksData);
      } catch (err) {
        console.log("Failed to fetch books", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const removeAuthor = (index: number) => {
    const updatedAuthors = [...authors];
    updatedAuthors.splice(index, 1);
    setAuthors(updatedAuthors);
  };

  const handleAuthorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewAuthor(e.target.value);
  };

  const addAuthor = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (newAuthor?.trim().length === 0) return;
    setAuthors([...authors, newAuthor.trim()]);
    setNewAuthor("");
  };

  const submitBook = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const data: BookFormData = {
      title: formData.get("title") as string,
      genera: formData.get("genera") as string,
      img: formData.get("img") as string,
    };

    try {
      const newBook = await BookAPI.addBook({ ...data, authors });
      setBooks([...books, newBook]);
    } catch (err) {
      console.log("Failed to add book", err);
    } finally {
      setShowAddForm(false);
    }
  };

  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
  };

  return (
    <Wrapper>
      <Nav />
      <AddButton>
        <Header>Books!</Header>
        <button onClick={toggleAddForm}>
          {showAddForm ? "Cancel" : "Add Book"}
        </button>
      </AddButton>

      {showAddForm && (
        <form onSubmit={submitBook}>
          <FormWrapper>
            <label htmlFor="title">
              Title
              <input
                placeholder="Enter title"
                type="text"
                id="title"
                required
                name="title"
              />
            </label>
            <label htmlFor="genera">
              Genre
              <input
                placeholder="Enter genre"
                type="text"
                id="genera"
                required
                name="genera"
              />
            </label>
            <label htmlFor="img">
              Image URL
              <input
                placeholder="Enter image URL"
                type="text"
                id="img"
                required
                name="img"
              />
            </label>
            <label htmlFor="author">
              Author(s)
              <ul>
                {authors?.map((author, i) => (
                  <li key={i}>
                    {author}&nbsp;
                    <button type="button" onClick={() => removeAuthor(i)}>
                      x
                    </button>
                  </li>
                ))}
              </ul>
              <input
                placeholder="Enter author name"
                type="text"
                id="author"
                name="author"
                value={newAuthor}
                onChange={handleAuthorChange}
              />
              <button type="button" onClick={addAuthor}>
                Add Author
              </button>
            </label>
            <button type="submit">Submit</button>
          </FormWrapper>
        </form>
      )}

      {loading ? (
        <LoadingStyle>Loading...</LoadingStyle>
      ) : (
        <ListStyle>
          {books &&
            books.map((book) => (
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
                    <DataLabel bold>Genre</DataLabel>
                    <DataInfo>{book.genera}</DataInfo>
                  </DataStyle>
                  <DataStyle>
                    <DataLabel bold>
                      Author{book?.authors?.length > 1 ? "s" : ""}
                    </DataLabel>
                    <DataInfo>
                      {book.authors.map((author: Author, i: number) => (
                        <Fragment key={`${author.id}-frag`}>
                          <p>
                            <Link to={`/authors/${author.id}`}>
                              {author.firstname} {author.lastname}
                            </Link>
                          </p>
                        </Fragment>
                      ))}
                    </DataInfo>
                  </DataStyle>
                </div>
              </ItemStyle>
            ))}
        </ListStyle>
      )}
    </Wrapper>
  );
}

export default Books;
