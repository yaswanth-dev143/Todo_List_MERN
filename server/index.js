const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const TodoModel = require("./models/todos");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(
  "mongodb+srv://admon:rgukt0123@cluster0.adqd6yb.mongodb.net/?retryWrites=true&w=majority"
);

app.get("/", (request, response) => response.send("<h1>Hello World</h1>"));

app.post("/add", (request, response) => {
  let task = request.body.task;
  TodoModel.create({
    task: task,
  })
    .then((result) => response.json(result))
    .catch((err) => response.json(err));
});

app.get("/get", (request, response) =>
  TodoModel.find()
    .then((result) => response.json(result))
    .catch((err) => console.log(err))
);

app.put("/update/:id", (request, response) => {
  let { id } = request.params;
  console.log(id);
  TodoModel.findByIdAndUpdate({ _id: id }, { done: true })
    .then((response) => response.json(response))
    .catch((err) => response.json(err));
});

app.delete("/delete/:id", (request, response) => {
  let { id } = request.params;
  TodoModel.findByIdAndDelete({ _id: id })
    .then((response) => response.json(response))
    .catch((err) => response.json(err));
});

app.listen(3001, () =>
  console.log("server is running in the port-3001: http://localhost:3001/")
);
