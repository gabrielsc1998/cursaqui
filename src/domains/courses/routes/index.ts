import { body, param } from 'express-validator';

import controller from '../controllers';

const BASE_PATH = '/courses';
const routes = [
  
  {
    method: 'POST',
    path: `/create`,
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
    path: `/:id`,
    validations: [
      param('id').isNumeric()
    ],
    handler: controller.getById
  },

  {
    method: 'GET',
    path: `/`,
    handler: controller.listAll
  },

  {
    method: 'UPDATE',
    path: `/:id`,
    validations: [
      param('id').isNumeric()
    ],
    handler: controller.updateById
  },
  
  {
    method: 'DELETE',
    path: `/:id`,
    validations: [
      param('id').isNumeric()
    ],
    handler: controller.deleteById
  },
]

export { BASE_PATH, routes };