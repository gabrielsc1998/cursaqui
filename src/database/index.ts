import _ from 'lodash';
import { Pool } from 'pg';
import { QueryResult } from 'pg';

import config from '../config';

class Database {

  _pool: Pool;

  constructor() {
    this._pool = this._config();
  }

  _config(): Pool {
    return new Pool({
      user: config.db.user,
      host: config.db.url,
      database: config.db.name,
      password: config.db.password,
      port: config.db.port,
      connectionTimeoutMillis: 2000,
    });
  }

  async connect(): Promise<boolean> {
    try {
      if(await this._pool.connect()) {
        console.log(' ## Connected to database!');
        return true;
      }
    } catch(error) {
      console.log(` ## Error connect db [${error}]`);
    }
    return false;
  }

  executeQuery(query: string, alias?: Array<string | number | boolean | void>): Promise<QueryResult | undefined> {
    return new Promise((resolve, reject) => {
      try {
        _.isUndefined(alias) ? alias = [] : false;
        this._pool.query(query, alias, (error, results) => {
          if (error) {
            throw error
          }
          else {
            resolve(results);
          }
        })
      } catch(error) {
        console.log(` ## Error executeQuery [${error}]`);
        reject(undefined);
      }
    });
  }

}

export default new Database();