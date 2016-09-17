import { expect } from 'chai';
import Note from '../model/note';

describe('Todos route', () => {

  it('Get list', done => {
    Request
      .get('/notes')
      .expect(200)
      .end((err, res) => {
        done(err);
      });
  });

});
