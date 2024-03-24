import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Book as BookType } from "../../../server/models/Book";
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
} from "../../styles/DataStyles";

function Book() {
  const [book, setBook] = useState<BookType>();
  const [loading, setLoading] = useState<Boolean>(true);
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    if (!id) return navigate("/books"); // unsure how this would ever get hit

    try {
      const numberId = parseInt(id);
      BookAPI.getBook(numberId)
        .then(setBook)
        .then(() => setLoading(false));
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }, []);

  return (
    <Wrapper>
      <Nav></Nav>
      <Header>A Book</Header>
      <ListStyle>
        {!book ? (
          <div>
            no books, eat rocks
            <Link to={"/books"}>bookies</Link>
          </div>
        ) : (
          <ItemStyle key={`${book.id}-frag`}>
            <ImgStyle src="https://picsum.photos/100/100" alt={book?.title} />
            <div>
              <DataStyle>
                <DataLabel bold>
                  <h3>{book.title}</h3>
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
        )}
      </ListStyle>
    </Wrapper>
  );
}

export default Book;
