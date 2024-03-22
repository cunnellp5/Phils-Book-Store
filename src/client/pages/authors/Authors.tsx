import React from "react";
import styled from "@emotion/styled";

import { Wrapper } from "../../components/~Wrapper";
import Nav from "../../components/Nav";

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
  return (
    <Wrapper>
      <Nav></Nav>
      <AuthorsStyled>Authors!</AuthorsStyled>
    </Wrapper>
  );
}

export default Authors;
