import styled from "@emotion/styled";

export const EditItemButton = styled.button`
  background-color: #ffd700; /* gold */
  color: #000000; /* black */
  border: none;
  padding: 10px 20px;
  text-align: center;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 8px;
  transition-duration: 0.4s;

  & a {
    text-decoration: none;
    color: #000;
  }

  &:hover {
    background-color: #daa520; /* goldenrod */
    & a {
      color: white;
    }
  }
`;

export const DeleteItemButton = styled.button`
  background-color: #ff6347; /* tomato */
  color: #ffffff; /* white */
  border: none;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 8px;
  transition-duration: 0.4s;

  & a {
    text-decoration: none;
    color: #000;
  }

  &:hover {
    background-color: #cd5c5c; /* indianred */
    & a {
      color: white;
    }
  }
`;

export const BackButton = styled.button`
  background-color: #32cd32; /* limegreen */
  border: none;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 8px;
  transition-duration: 0.4s;

  & a {
    text-decoration: none;
    color: #000;
  }

  &:hover {
    background-color: #006400; /* darkgreen */
    & a {
      color: white;
    }
  }
`;

export const ButtonsWrapper = styled.div({
  display: "flex",
  justifyContent: "flex-end",
  width: "100%",
  gap: "10px",
});
