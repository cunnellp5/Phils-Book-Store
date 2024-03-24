import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Author as AuthorType } from "../../../server/models/Author";
import * as authorAPI from "../../api/authors";
import { Header } from "../../components/Header";
import Nav from "../../components/Nav";
import { Wrapper } from "../../styles/Wrapper";

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
      <ul>
        <li>
          {author.firstname} {author.lastname} in the house!
        </li>
      </ul>
    </Wrapper>
  );
}

export default Author;
