import React from "react";
import { Form, useNavigate, useParams } from "react-router-dom";
import { ButtonsWrapper } from "../../styles/ButtonsWrapper";
import { Wrapper } from "../../styles/Wrapper";
import { Header } from "../../components/Header";
import Nav from "../../components/Nav";
import styled from "@emotion/styled";

const InputsWrapper = styled.div({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  gap: 16,
  marginBlock: 16,
  "& label": {
    display: "flex",
    color: "#938e8e",
    flexDirection: "column",
    gap: 8,
    "& input": {
      padding: 8,
      borderRadius: 4,
      border: "1px solid #ccc",
    },
  },
});

function EditBook() {
  const navigator = useNavigate();
  const { id } = useParams();

  const closeEditor = () => {
    console.log("close editor");
    navigator(`/books/${id}`);
  };

  return (
    <Wrapper>
      <Nav></Nav>
      <Header>edit that shi!</Header>
      <Form style={{ width: "100%" }}>
        <InputsWrapper>
          <label htmlFor="title">
            Title
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Title"
            ></input>
          </label>
          <label htmlFor="genera">
            Genera
            <input
              type="text"
              id="genera"
              name="genera"
              placeholder="Genera"
            ></input>
          </label>
          <label htmlFor="author">
            Author
            <input
              type="text"
              id="author"
              name="author"
              placeholder="Author"
            ></input>
          </label>
        </InputsWrapper>

        <ButtonsWrapper>
          <button type="submit">update</button>
          <button type="button" onClick={closeEditor}>
            nvm
          </button>
        </ButtonsWrapper>
      </Form>
    </Wrapper>
  );
}

export default EditBook;
