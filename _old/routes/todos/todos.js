import express from 'express';
import { Todo } from '../../model';

const router = express.Router();

router.post('/', (req, res) => {
  Todo.createTodo(req.body);
  console.log(req.body);
  res.end('');
});

router.get('/', (req, res) => {
  res.json({
    test: 'test'
  });
});


export default app => app.use('/todos', router);
