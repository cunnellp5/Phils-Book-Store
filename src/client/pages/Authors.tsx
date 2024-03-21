import React from "react";
import styled from "@emotion/styled";

export const AuthorsStyled = styled.div({
  width: "100%",
  height: 150,
  fontSize: 60,
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

function Authors() {
  return <AuthorsStyled>Authors!</AuthorsStyled>;
}

export default Authors;
