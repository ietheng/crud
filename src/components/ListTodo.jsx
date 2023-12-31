import { Fragment, useEffect, useState } from "react";
import EditTodo from "./EditTodo";

const ListTodos = () => {
  const [todos, setTodos] = useState([]);

  // delete todo function

  const deleteTodo = async (id) => {
    try {
      // eslint-disable-next-line no-unused-vars
      const deleteTodo = await fetch(
        `https://booking-system-api-ietheng.sigma-school-full-stack.repl.co/todos/${id}`,
        {
          method: "DELETE",
        }
      );

      //   console.log(deleteTodo);
      setTodos(todos.filter((todo) => todo.todo_id !== id));
      //will be deleted instantly
    } catch (err) {
      console.error(err.message);
    }
  };

  const getTodos = async () => {
    try {
      const response = await fetch(
        "https://booking-system-api-ietheng.sigma-school-full-stack.repl.co/todos"
      );
      const jsonData = await response.json();
      //   console.log(jsonData);
      setTodos(jsonData);
    } catch (err) {
      console.error(err.message);
    }
    //able to see all datas in array
  };

  useEffect(() => {
    getTodos();
  }, []);
  //[]) makes it only do one request

  //   console.log(todos);

  return (
    <Fragment>
      {""}
      <table className="table mt-5 text-center">
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {/* <tr>
            <td>John</td>
            <td>Doe</td>
            <td>john@example.com</td>
          </tr>*/}
          {todos.map((todo) => (
            <tr key={todo.todo_id}>
              <td>{todo.description}</td>
              <td>
                <EditTodo todo={todo} />
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteTodo(todo.todo_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListTodos;
