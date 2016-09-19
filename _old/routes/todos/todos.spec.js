import { expect } from 'chai';
import { Todo } from '../../model';

describe('Todos route', () => {
  it('Get list', done => {
    Request
      .get('/todos')
      .expect(200)
      .end((err, res) => {
        done(err);
      });
  });

});
