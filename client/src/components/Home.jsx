import React, { useEffect, useState } from "react";
import Create from "./Create";
import axios from "axios";
import { BsCircle } from "react-icons/bs";
import { BsCircleFill } from "react-icons/bs";

function Home() {
  let [todos, setodos] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3001/get")
      .then((response) => setodos(response.data))
      .catch((err) => console.log(err));
  }, []);
  let handleEdit = (id) => {
    axios
      .put("http://localhost:3001/update/" + id)
      .then((response) => {
        location.reload();
        setodos(response.data);
      })
      .catch((err) => console.log(err));
  };
  let handleDelete = (id) => {
    axios
      .delete("http://localhost:3001/delete/" + id)
      .then((response) => {
        location.reload();
        setodos(response.data);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <h2>Todolist</h2>
      <Create />
      {todos.length === 0 ? (
        <div>
          <h2>No Record</h2>
        </div>
      ) : (
        todos.map((todo) => (
          <div>
            <div onClick={() => handleEdit(todo._id)}>
              {todo.done ? <BsCircle></BsCircle> : <BsCircleFill />}
              <p className={todo.done ? "line-through" : "hello"}>
                {" "}
                {todo.task}{" "}
              </p>
            </div>
            <div>
              <button onClick={() => handleDelete(todo._id)}>delte</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Home;
