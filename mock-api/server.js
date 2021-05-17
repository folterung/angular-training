const { json, urlencoded } = require('body-parser');
const cors = require('cors');
const express = require('express');
const { writeFileSync } = require('fs');
const { join } = require('path');
const app = express();
const port = 1337;
const PRIORITIES_PATH = './priorities.json';
const TODOS_PATH = './todos.json';

let priorities = require(PRIORITIES_PATH);
let todos = require(TODOS_PATH);

let todoIdCounter;

priorities.sort(sortById(false));
todos.sort(sortById(false));

todoIdCounter = todos.length > 0 ? todos[todos.length - 1].id + 1 : 0;

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

app.get('/priorities', (req, res) => {
  res.status(200);
  res.json(priorities);
});

app.get('/todos', (req, res) => {
  res.status(200);
  res.json(todos);
});

app.put('/todos', (req, res) => {
  const updateTodos = req.body;

  updateTodos.forEach(updateTodo => {
    const todoToUpdateIndex = todos.findIndex(todo => todo.id === updateTodo.id);

    if (todoToUpdateIndex > -1) {
      todos.splice(todoToUpdateIndex, 1, updateTodo);
    }
  });

  save(TODOS_PATH, todos);

  res.status(200);
  res.send(updateTodos);
});

app.post('/todos', (req, res) => {
  const todosToAdd = req.body;

  todosToAdd.forEach(todoToAdd => {
    todoToAdd.id = todoIdCounter++;
  });

  todos.push(...todosToAdd);

  save(TODOS_PATH, todos);

  res.status(200);
  res.send(todosToAdd);
});

app.delete('/todos/:todoId', (req, res) => {
  console.log('todoId: ', req.params);
  const todoId = req.params.todoId;

  const todoToDeleteIndex = todos.findIndex(todo => todo.id === parseInt(todoId));

  if (todoToDeleteIndex > -1) {
    todos.splice(todoToDeleteIndex, 1);
    save(TODOS_PATH, todos);
  }

  res.status(200);
  res.send(todoId);
});

app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});

function save(target, data) {
  writeFileSync(join(__dirname, target), JSON.stringify(data, null, 2), { encoding: 'utf-8' });
}

function sortById(isAsc = false) {
  const ascension = isAsc ? 1 : -1;

  return (idA, idB) => {
    return idA === idB ? 0 : (idA > idB ? 1 : -1 * ascension);
  }
}