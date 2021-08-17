import { ValidationChain } from 'express-validator';

import { Request, Response } from '../server/types'

export interface Routes {
  [key: string]: string | Array<ValidationChain> | ((request: Request, response: Response) => Promise<void>) | undefined;
  method: string;
  path: string;
  validations?: Array<ValidationChain>;
  handler: ((request: Request, response: Response) => Promise<void>);
}
