import _ from 'lodash';
import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../src/app';
import { Express } from 'express';

chai.use(chaiHttp);
const expect = chai.expect;

type Server = Express | undefined;
type Request = ChaiHttp.Agent
let server: Server;
let request: Request; // = chai.request; 

// import { teste } from './createCourse.spec';

const payload = {
	name: "React JS",
  category: "Programação",
  teacher_name: "Gabriel Caetano",
  qtd_vacancies: 20,
  value: 59.90,
  duration: 500,
  status: "Aberto"
};

let id: number | undefined;

describe('Testing...', function () {
  
  before(async function () { 
    server = await app();
    if(_.isUndefined(server)) {
      throw ` ## Problem to start the server!` 
    }
  })

  beforeEach(() => request = chai.request(server))
  
  it('Should delete all courses', async () => {
    const { status } = await request.delete('/courses/');
    expect(status).to.equal(200);
  });

  it('Should create a course', async () => {
    const { status, body } = await request.post('/courses/create').send({...payload});
    console.log(body);
    
    id = body.id;
    expect(status).to.equal(201);
  });

  it('Should get course by id', async () => {
    const { status, body } = await request.get(`/courses/${id}`).send({...payload});
    console.log(body);
    expect(status).to.equal(200);
  });

  it('Should list all', async () => {
    const { status, body } = await request.get('/courses/');
    console.log(body);
    expect(status).to.equal(200);
  })

});

after(done => {
  done();
})
