import React, { useState, useEffect } from "react";
import TodosList from "./TodosList";
import InputTodo from "./InputTodo";
import Header from "./Header";
import { v4 as uuidv4 } from "uuid";

const TodoContainer = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    console.log("test run");

    //getting stored items
    const temp = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(temp);

    if (loadedTodos) {
      setTodos(loadedTodos);
    }
  }, []);

  useEffect(() => {
    //storing todos items
    const temp = JSON.stringify(todos);
    localStorage.setItem("todos", temp);
  }, [todos]);

  const handleChange = (id) => {
    setTodos((prevState) =>
      //Updater function
      prevState.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo, //Spread Operator to spread the properties of the item
            completed: !todo.completed,
          };
        }
        return todo;
      })
    );
  };

  const addTodoItem = (title) => {
    const newTodo = {
      id: uuidv4(),
      title: title,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  const deleteTodo = (id) => {
    setTodos([
      ...todos.filter((todo) => {
        //filter returns a new array by applying a condition on every array element
        return todo.id !== id;
      }),
    ]);
  };

  const setUpdate = (updatedTitle, id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          todo.title = updatedTitle;
        }
        return todo;
      })
    );
  };

  return (
    <div className="container">
      <div className="inner">
        <Header />
        <InputTodo addTodoProps={addTodoItem} />
        <TodosList
          todos={todos}
          handleChangeProps={handleChange}
          deleteTodoProps={deleteTodo}
          setUpdate={setUpdate}
        />
      </div>
    </div>
  );
};

export default TodoContainer;
