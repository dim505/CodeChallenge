import { expect } from 'chai';
import { it, describe } from 'mocha'
import { agent as request } from 'supertest';


import App from '../src/app';
const app = new App()

//created a new test case for end point
describe('DepartmentTesting', () => {
	it('It should return some data', async () => {
			const results = await request(app.service).get('/v1/departments/4').send()
			expect(results.status).to.equal(200);
			expect(results.body).to.be.a('array');
			expect(results.body).not.to.be.empty;
			expect(results.body.error).to.be.undefined;
			
	})	
		it('It should error out', async () => {
		const results = await request(app.service).get('/v1/departments/999999999999').send()
		expect(results.status).to.equal(404);
		expect(results.body).not.to.be.empty;
	})


})