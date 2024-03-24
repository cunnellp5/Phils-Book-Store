import styled from "@emotion/styled";

export const LinkButtons = styled.div`
  display: flex;
  width: 100%;

  & > a {
    margin: 0.2rem;
    text-align: center;
    text-decoration: none;
    color: black;
    background-color: #ab543e;
    padding: 0.5rem 1.5rem;
  }

  & > a:hover {
    background-color: #ab7365;
    color: white;
  }
`;
