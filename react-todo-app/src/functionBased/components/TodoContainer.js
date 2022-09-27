import React, { useState, useEffect } from "react";
import TodosList from "./TodosList";
import InputTodo from "./InputTodo";
import Header from "./Header";
import Navbar from "./Navbar";
import { v4 as uuidv4 } from "uuid";
import { Route, Routes } from "react-router-dom";
import About from "../pages/About";
import NoMatch from "../pages/NoMatch";

const TodoContainer = () => {
  const uri = "https://localhost:7110/api/todoitems";
  const [todos, setTodos] = useState(getInitialTodos());

  function getInitialTodos() {
    //getting stored items
    const temp = localStorage.getItem("todos");
    const savedTodos = JSON.parse(temp);
    return savedTodos || [];
  }

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

    fetch(uri, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    })
      .then(() => {
        setTodos([...todos, newTodo]);
      })
      .catch((error) => console.error("Unable to add item.", error));
  };

  const deleteTodo = (id) => {
    fetch(`${uri}/${id}`, {
      method: "DELETE",
    }).then(() => {
      setTodos([
        ...todos.filter((todo) => {
          //filter returns a new array by applying a condition on every array element
          return todo.id !== id;
        }),
      ]);
    });
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
    //React fragment
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
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
          }
        />
        <Route path="/about/*" element={<About />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  );
};

export default TodoContainer;
