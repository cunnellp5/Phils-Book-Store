import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Author as AuthorType } from "../../../server/models/Author";
import * as authorAPI from "../../api/authors";
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
import { Bio } from "../../styles/Bio";
import { AuthorList } from "../../styles/AuthorList";
import { ButtonsWrapper } from "../../styles/ItemButtons";

function Author() {
  const [author, setAuthor] = useState<AuthorType>();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return navigate("/authors");
    const numberId = parseInt(id);

    try {
      authorAPI.getAuthor(numberId).then(setAuthor);
    } catch (error) {
      console.error(error);
    }
  }, [id]);

  return !author ? (
    <div>
      author gone...
      <Link to={"/authors"}>try again</Link>
    </div>
  ) : (
    <Wrapper>
      <Nav></Nav>
      <Header>eyooo!</Header>
      <ListStyle>
        <ItemStyle key={`${author.id}-frag`}>
          <ImgStyle
            src="https://picsum.photos/150/150"
            alt={author.firstname}
          />
          <div>
            <DataStyle>
              <DataLabel bold>
                {author.firstname} {author.lastname}
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
      </ListStyle>
      <ButtonsWrapper>
        <button>
          <Link to={`/authors`}>Back</Link>
        </button>
        <button>
          <Link to={`/authors/${id}/edit`}>Edit</Link>
        </button>
        <button>
          <Link to={`/authors/${id}/delete`}>Delete</Link>
        </button>
      </ButtonsWrapper>
    </Wrapper>
  );
}

export default Author;
