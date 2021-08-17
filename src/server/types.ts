import express from 'express';

export interface HTTPMethods {
  [key: string]: string;
  GET: string;
  PUT: string;
  POST: string;
  DELETE: string;
}

export type Request = express.Request;
export type Response = express.Response;
