import React, { useState } from "react";
import axios from "axios";

function Create() {
  const [task, setTask] = useState();
  let handleAdd = () => {
    axios
      .post("http://localhost:3001/add", { task: task })
      .then((response) => {
        location.reload();
        console.log(response);
      })
      .error((err) => console.log(err));
  };
  return (
    <div>
      <input type="text" name="" onChange={(e) => setTask(e.target.value)} />
      <button type="button" onClick={handleAdd}>
        Add
      </button>
    </div>
  );
}

export default Create;
