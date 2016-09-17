import express from 'express';
import { Todo } from '../../model';

const router = express.Router();

router.post('/', (req, res) => {
  Todo.createTodo(req.body);
  console.log(req.body);
  res.end('');
});

router.get('/:id', (req, res) => {
  res.json({
    test: req.params.id
  });
});


export default app => app.use('/todos', router);
