import React from "react";
import TodosList from "./TodosList";
import InputTodo from "./InputTodo";
import Header from "./Header";
import {v4 as uuidv4} from "uuid";

class TodoContainer extends React.Component{
    state = {
        todos:[
            {
                id: uuidv4(),
                title: "Setup development environment",
                completed: true
            },
            {
                id: uuidv4(),
                title: "Develop website and add content",
                completed: false
            },
            {
                id: uuidv4(),
                title: "Deploy to live server",
                completed: false
            }
        ]
    };

    handleChange = (id) =>{
        this.setState(prevState => ({ //Updater function
            todos: prevState.todos.map(todo => {
                if (todo.id === id) {
                    return {
                        ...todo, //Spread Operator to spread the properties of the item
                        completed: !todo.completed,
                    }
                }
                return todo
            }),
        }))
    };

    addTodoItem = title => {
        const newTodo = {
            id: uuidv4(),
            title: title,
            completed: false
        };
        this.setState({
            todos: [...this.state.todos, newTodo]
        })
    };

    delTodo = (id) =>{
        this.setState({
            todos: [
                ...this.state.todos.filter(todo => { //filter returns a new array by applying a condition on every array element
                    return todo.id !== id;
                })
            ]
        })
    };
    
    render(){
        return(
            <div className="container">
                <div className="inner">
                    <Header />
                    <InputTodo addTodoProps={this.addTodoItem}/>
                    <TodosList 
                        todos={this.state.todos}
                        handleChangeProps={this.handleChange}
                        deleteTodoProps={this.delTodo}
                    />
                </div>
            </div>
        )
    };
}
export default TodoContainer