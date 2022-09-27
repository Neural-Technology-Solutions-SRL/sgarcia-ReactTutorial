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
  const uri = "http://www.todoapisrgarcia.somee.com/api/todoitems";
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch(uri)
      .then((response) => response.json())
      .then((data) => setTodos(data))
      .catch((error) => console.error("Unable to get items.", error));
  }, []);

  const handleChange = (item) => {
    const todo = {
      ...item,
      completed: !item.completed,
    };

    fetch(`${uri}/${item.id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    })
      .then(
        setTodos((prevState) =>
          //Updater function
          prevState.map((todo) => {
            if (todo.id === item.id) {
              return {
                ...todo, //Spread Operator to spread the properties of the item
                completed: !todo.completed,
              };
            }
            return todo;
          })
        )
      )
      .catch((error) => console.error("Unable to check item.", error));
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
    })
      .then(() => {
        setTodos([
          ...todos.filter((todo) => {
            //filter returns a new array by applying a condition on every array element
            return todo.id !== id;
          }),
        ]);
      })
      .catch((error) => console.error("Unable to delete item.", error));
  };

  const setUpdate = (updatedTitle, item) => {
    const todo = {
      ...item,
      title: updatedTitle,
    };

    fetch(`${uri}/${item.id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    })
      .then(
        setTodos(
          todos.map((todo) => {
            if (todo.id === item.id) {
              todo.title = updatedTitle;
            }
            return todo;
          })
        )
      )
      .catch((error) => console.error("Unable to update item.", error));
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
