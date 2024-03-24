import styled from "@emotion/styled";

export const ListStyle = styled.ul({
  width: "100%",
});

export const ItemStyle = styled.li({
  display: "flex",
  flexDirection: "row",
  gap: 16,
  borderRadius: 4,

  backgroundColor: "#f9f9f9",
  borderBottom: "1px solid #ccc",
  padding: 16,
  marginBottom: 16,
});

export const DataStyle = styled.div({
  marginBottom: 16,
});

export const DataLabel = styled.p<{ bold: boolean }>(({ bold }) => ({
  fontWeight: bold ? "bold" : "normal",
  paddingBottom: 2,
  "& a": {
    textDecoration: "none",
  },
}));

export const DataInfo = styled.div`
  margin-left: 8px;
  & a {
    text-decoration: none;
  }
`;

export const ImgStyle = styled.img({
  width: 100,
  height: 100,
  backgroundColor: "#ffcfb0",
  fontSize: 12,
  borderRadius: 4,
});

export const LoadingStyle = styled.div({
  color: "white",
  fontSize: 16,
});
