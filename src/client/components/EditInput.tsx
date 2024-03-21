import React, { FC, useState } from "react";
import styled from "@emotion/styled";

const Form = styled.form({
  width: "100%",
  display: "flex",
});

const Input = styled.input({
  width: "100%",
  border: "none",
  outline: "none",
});

export interface EditInputProps {
  updateTodo: (label: string) => void;
  description: string;
  closeEditor: (e: { preventDefault: () => void }) => void;
}

export const EditInput: FC<EditInputProps> = ({
  description,
  updateTodo,
  closeEditor,
}) => {
  const [input, setInput] = useState(description);

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        updateTodo(input);
      }}
    >
      <Input
        onChange={(e) => setInput(e.target.value)}
        value={input}
        placeholder={description}
      />
      <div className="buttonsWrapper">
        <button type="submit">update</button>
        <button type="button" onClick={closeEditor}>
          nvm
        </button>
      </div>
    </Form>
  );
};
