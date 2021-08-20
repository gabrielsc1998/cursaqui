import { body, param } from 'express-validator';

import { Routes } from '../../types';
import controller from '../controllers';

const BASE_PATH = '/courses';

const routes: Array<Routes> = [
  
  {
    method: 'POST',
    path: '/create',
    validations: [
      body('name').isString(),
      body('category').isString(),
      body('teacher_name').isString(),
      body('qtd_vacancies').isInt(),
      body('value').isFloat(),
      body('duration').isInt(),
      body('status').isString(),
    ],
    handler: controller.create
  },

  {
    method: 'GET',
    path: '/:id',
    validations: [
      param('id').isNumeric()
    ],
    handler: controller.getById
  },

  {
    method: 'GET',
    path: '/',
    handler: controller.listAll
  },

  {
    method: 'PUT',
    path: '/:id',
    validations: [
      param('id').isNumeric()
    ],
    handler: controller.updateById
  },
  
  {
    method: 'DELETE',
    path: '/:id',
    validations: [
      param('id').isNumeric()
    ],
    handler: controller.deleteById
  },

  {
    method: 'DELETE',
    path: '/',
    handler: controller.deleteAll
  },
]

export { BASE_PATH, routes };