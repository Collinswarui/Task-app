const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// creating the server
const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/mern_todo", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Connected to DB"))
  .catch(console.error);

// importing the model created for the apllicatiion

const Todo = require('./models/Todo');

app.get('/todos', async (req, res) => {
    const todos = await Todo.find();

    res.json(todos);
});

app.listen(3001, () => console.log("Server started at port 3001"));