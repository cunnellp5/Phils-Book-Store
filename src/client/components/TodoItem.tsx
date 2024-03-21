import React, { FC } from "react";
import styled from "@emotion/styled";
import { Todo } from "../../server/models/Todo";
import "./TodoItem.css";

export const Wrapper = styled.label({
  display: "flex",
  alignItems: "center",
  width: "100%",
  borderRadius: 4,
  marginBottom: 8,
  padding: 16,
  background: "white",
  fontWeight: "400",
  fontSize: 14,
  cursor: "pointer",
});

const Label = styled.span<{ checked: boolean }>(({ checked }) => ({
  textDecoration: checked ? "line-through" : "none",
  fontSize: 20,
  margin: 0,
  display: "flex",
  flexDirection: "row",
  flexWrap: "nowrap",
  justifyContent: "flex-start",
  alignItems: "center",
}));

const Checkbox = styled.input({
  width: 16,
  height: 16,
  marginRight: 12,
});

export interface TodoItemProps {
  todo: Todo;
  toggle?: (id: number, isCompleted: boolean) => void;
  onDelete?: (id: number) => void;
}

export const TodoItem: FC<TodoItemProps> = ({ todo, toggle, onDelete }) => {
  const { id, completed, description } = todo;

  const handleToggle = (e: { target: { checked: any } }) => {
    console.log(todo);
    console.log("hi there", e.target.checked, id);
    (toggle as (id: number, isCompleted: boolean) => void)(
      id,
      !!e.target.checked
    );
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(id);
    }
  };

  return (
    <Wrapper>
      <Checkbox
        type="checkbox"
        id={`${id}`}
        checked={completed}
        onChange={handleToggle}
      />
      <Label checked={completed}>{description}</Label>
      <div className="buttonsWrapper">
        <button>Edit</button>
        <button onClick={handleDelete}>❌</button>
      </div>
    </Wrapper>
  );
};
