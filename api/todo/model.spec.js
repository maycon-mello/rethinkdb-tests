import { expect } from 'chai';
import uuid from 'uuid';
import * as Todo from './model';

describe('Todos model', () => {

  it('expect to create a todo', async () => {
    let params = {
      value: '2'
    };
    let todo = await Todo.create(params);

    expect(todo.value).to.equal(params.value);
  });

  it('expect to get a todo by id', async () => {
    let params = {
      value: '2'
    };
    let { id, value } = await Todo.create(params);
    let todo = await Todo.getById(id);

    expect(todo.id).to.equal(id);
    expect(todo.value).to.equal(value);
  });

  it('expect to remove a todo', async () => {
    let params = {
      value: '2'
    };

    let { id, value } = await Todo.create(params);
    await Todo.remove(id);
    let todo = await Todo.getById(id);

    expect(todo).to.equal(null);
  });

  it('expect get a todo list', async () => {
    let params = { value: 'test' };

    // create a todo
    await Todo.create(params);
    let todos = await Todo.getList({});
    expect(todos.length >= 0).to.be.ok;
  });

  it('expect get a todo list with filter', async () => {
    let id = uuid();

    // create 5 todos
    for (let i = 0; i < 10; i++) {
      await Todo.create({
        value: id + `-${i}`,
      });
    }

    let todos = await Todo.getList({
      value: id,
      orderBy: 'value',
      limit: 5,
      skip: 1,
    });

    expect(todos.length).to.equal(5);
    expect(todos[0].value).to.equal(`${id}-1`);
  });

});
