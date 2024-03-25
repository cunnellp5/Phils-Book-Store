import styled from "@emotion/styled";

export const ButtonsWrapper = styled.div({
  display: "flex",
  justifyContent: "flex-end",
  width: "100%",
  gap: "10px",
  "& button": {
    padding: "5px 10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    backgroundColor: "#f9f9f9",
    cursor: "pointer",
    "& a": {
      textDecoration: "none",
      color: "#333",
    },
    "&:hover": {
      backgroundColor: "#ccc0c0",
    },
  },
});
