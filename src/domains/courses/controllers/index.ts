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

  private _validateRequestData = (request: Request): void => {
    const errors = validationResult(request);
    if(!errors.isEmpty()) {
      throw errors.array();
    }
  }

  create = async (request: Request, response: Response) => {
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

  getById = async (request: Request, response: Response) => {
    try {
      this._validateRequestData(request);
      const { id=0 } = request.params;
      const getCourse = await CoursesModule.getById(Number(id));
      if(!_.isUndefined(getCourse)) {
        response.status(200).send(getCourse);
      } else {
        throw undefined;
      }
    } catch(error) {
      response.status(400).send({ error });
    }
  }
  
  listAll = async (request: Request, response: Response) => {
    try {
      this._validateRequestData(request);
      const courseList = await CoursesModule.listAll();
      if(!_.isUndefined(courseList)) {
        response.status(200).send(courseList);
      } else {
        throw undefined;
      }
    } catch(error) {
      response.status(400).send({ error });
    }
  }

  updateById = async (request: Request, response: Response) => {
    try {
      this._validateRequestData(request);
      const { id=0 } = request.params;
      const payloaUpdateCourse: UpdateCourse = request.body;
      const updateCourse = await CoursesModule.updateById(Number(id), {...payloaUpdateCourse});
      if(!_.isUndefined(updateCourse)) {
        response.status(200).send({ msg: 'Course updated!' });
      } else {
        throw undefined;
      }
    } catch(error) {
      response.status(400).send({ error });
    }
  }

  deleteById = async (request: Request, response: Response) => {
    try {
      this._validateRequestData(request);
      const { id=0 } = request.params;
      const deleteCourse = await CoursesModule.deleteById(Number(id));
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