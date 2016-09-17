import { expect } from 'chai';

/**
 * Test a bad request Response
 *
 * @param {Response} res
 */
export function badRequest(res) {
  expect(res.statusCode).to.equal(400);
  expect(res.body.error).to.be.a('string');
}
