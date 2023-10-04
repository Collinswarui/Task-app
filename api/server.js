const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

// creating the server
const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, {
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

app.post('/todo/new', (req, res) => {
  const todo = new Todo({
    text: req.body.text
  });

  todo.save();

  res.json(todo);

});


app.delete('/todo/delete/:id', async (req, res) => {
  const result = await Todo.findByIdAndDelete(req.params.id);

  res.json(result);
});

app.get('todo/complete/:id', async (req, res) => {
  const todo =  await Todo.findById(req.params.id);

  todo.complete = !todo.complete;

  todo.save();

  res.json(todo);
})

app.put('/todo/update/:id', async(req, res) => {
  const todo = await Todo.findById(req.params.id);

  todo.text = req.body.text;

  todo.save();

  res.json(todo);
})


const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server started at port ${port}`));