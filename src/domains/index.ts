import _ from 'lodash';
import fs from 'fs';
import path from 'path';

import Server from '../server';
import { Routes } from './types';
const SUBDIR_ROUTES = 'routes';

import { Router } from 'express';
class Domains {

  private _domainRoutes: Array<{BASE_PATH?: string, routes: Routes }>=[];
  constructor() {
    this._domainRoutes = [];
    this._sweepAndGet();
  }

  private _sweepAndGet = () => {
    // Busca em cada domínio o arquivo 'routes' e importa as rotas, inserindo no array 'domainRoutes'
    fs  
      .readdirSync(__dirname)
      .forEach(async (subDir) => {
        if(subDir.indexOf('.ts') === -1) {
          const filesAndSubDir = fs.readdirSync(path.resolve(`${__dirname}/${subDir}`));
          if(filesAndSubDir.length != 0) {
            const routesDir = filesAndSubDir.filter(subDir => subDir === SUBDIR_ROUTES)
            if(routesDir.length != 0) {
              const pathResolved = path.resolve(`${__dirname}/${subDir}/${SUBDIR_ROUTES}`, 'index.ts');
              const routesFromDomain = await import(pathResolved);
              this._domainRoutes.push(routesFromDomain);
            }
          }
        }
      });
  }

  startRoutes = async (server: typeof Server) => {
    if(this._domainRoutes.length != 0) {
      this._domainRoutes.forEach(domainRoutes => {
        const { BASE_PATH, routes }: {BASE_PATH?: string, routes?: Routes } = domainRoutes;
        if(!_.isUndefined(BASE_PATH) && (_.isArray(routes) && routes.length != 0)) {
          const router = server.getRouter();
          if(!_.isUndefined(router)) {
            routes.forEach(route => {
              const { path, validations=undefined, handler, method } = route;
              if(!_.isUndefined(method)) {
                interface Routers {
                  [key: string]: () => void;
                  GET: () => void;
                  POST: () => void;
                  PUT: () => void;
                  DELETE: () => void;
                }

                const routers: Routers = {
                  GET: () => router.get(path, !_.isUndefined(validations) ? validations : [], handler),
                  POST: () => router.post(path, !_.isUndefined(validations) ? validations : [], handler),
                  PUT: () => router.put(path, !_.isUndefined(validations) ? validations : [], handler),
                  DELETE: () => router.delete(path, !_.isUndefined(validations) ? validations : [], handler)
                }

                Object.prototype.hasOwnProperty.call(routers, method) && routers[method]();
              }
            });
            
            server.useRouter(BASE_PATH, router);
          }
        }
      })
    }
  }

}

export default new Domains();