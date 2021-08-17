import _ from 'lodash';
import { validationResult } from 'express-validator';

import { Request, Response } from '../../../server/types';
import CoursesModule from './../modules';
import { CreateCourse, UpdateCourse } from './../modules/models';

class CoursesController {

  private _module;

  constructor() {
    this._module = CoursesModule;
  }

  private _validateRequestData(request: Request): void {
    const errors = validationResult(request);
    if(!errors.isEmpty()) {
      throw errors.array();
    }
  }

  async create(request: Request, response: Response) {
    try {
      this._validateRequestData(request);
      const payloadCreateCourse: CreateCourse = request.body;
      const result = await this._module.create(payloadCreateCourse);
      if(!_.isUndefined(result)) {
        response.status(201).send({ msg: 'Course created!' });
      } else {
        throw undefined;
      }
    } catch(error) {
      response.status(400).send({ error });
    }
  }

  async getById(request: Request, response: Response) {
    try {
      this._validateRequestData(request);
      const { id=0 } = request.params;
      const getCourse = await this._module.getById(Number(id));
      if(!_.isUndefined(getCourse)) {
        response.status(200).send(getCourse);
      } else {
        throw undefined;
      }
    } catch(error) {
      response.status(400).send({ error });
    }
  }
  
  async listAll(request: Request, response: Response) {
    try {
      this._validateRequestData(request);
      const courseList = await this._module.listAll();
      if(!_.isUndefined(courseList)) {
        response.status(200).send(courseList);
      } else {
        throw undefined;
      }
    } catch(error) {
      response.status(400).send({ error });
    }
  }

  async updateById(request: Request, response: Response) {
    try {
      this._validateRequestData(request);
      const { id=0 } = request.params;
      const payloaUpdateCourse: UpdateCourse = request.body;
      const updateCourse = await this._module.updateById(Number(id), {...payloaUpdateCourse});
      if(!_.isUndefined(updateCourse)) {
        response.status(200).send({ msg: 'Course updated!' });
      } else {
        throw undefined;
      }
    } catch(error) {
      response.status(400).send({ error });
    }
  }


  async deleteById(request: Request, response: Response) {
    try {
      this._validateRequestData(request);
      const { id=0 } = request.params;
      const deleteCourse = await this._module.deleteById(Number(id));
      if(!_.isUndefined(deleteCourse)) {
        response.status(200).send({ msg: 'Course deleted!' });
      } else {
        throw undefined;
      }
    } catch(error) {
      response.status(400).send({ error });
    }
  }

}

export default new CoursesController();