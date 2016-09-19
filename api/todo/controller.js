import express from 'express';
import * as Todo from './model';

const router = express.Router();

router.post('/', async (req, res) => {
  let {value} = req.body;
  let todo;

  try {
    todo = await Todo.create({ value });
  } catch (error) {
    return res.status(500).json({error});
  }

  res.status(201).json({todo});
});

router.get('/:id', async (req, res) => {
  let { id } = req.params;
  let todo = await Todo.getById(id);
  res.json({
    todo
  });
});

router.get('/', async (req, res) => {
  let list = await Todo.getList({});
  res.json({
    list
  });
});



export default app => app.use('/todos', router);
