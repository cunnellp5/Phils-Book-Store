import React from "react";
import styled from "@emotion/styled";

export const BooksStyled = styled.div({
  width: "100%",
  height: 150,
  fontSize: 60,
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

function Books() {
  return <BooksStyled>books!</BooksStyled>;
}

export default Books;
