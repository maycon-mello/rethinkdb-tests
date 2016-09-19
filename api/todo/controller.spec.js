import { expect } from 'chai';
import * as Todo from './model';

describe('Todos route', () => {
  it('Get list', async () => {
    let res = await Request.get('/todos').expect(200);

    expect(res.body.list).to.be.an('array');
  });

  it('Get todo by id', async () => {
    let params = {value: 'test'};
    let todo = await Todo.create(params);
    let res = await Request.get(`/todos/${todo.id}`).expect(200);

    expect(res.body.todo.id).to.be.equal(todo.id);
  });

  it('expect to create a new todo', async () => {
    let params = { value: 'test' };
    let res = await Request.post('/todos').send(params).expect(201);
    let { todo } = res.body;

    expect(todo.id).to.be.ok;
    expect(todo.value).to.be.equal(params.value);
  });

});
