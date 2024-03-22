import React from "react";
import { Link } from "react-router-dom";
import { LinkButtons } from "../components/~LinkButtons";

function Nav() {
  return (
    <LinkButtons>
      <Link to="/">Home</Link>
      <Link to="/books">Books</Link>
      <Link to="/authors">Authors</Link>
    </LinkButtons>
  );
}

export default Nav;
