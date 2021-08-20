import _ from 'lodash';

import db from '../../../database/index';

import { CreateCourse, UpdateCourse } from './models';
import { 
  CREATE_COURSES_TABLE,
  CREATE_COURSE,
  GET_ALL_COURSES,
	GET_COURSE_BY_ID,
	DELETE_COURSE_BY_ID,
	UPDATE_COURSE_BY_ID,
	DELETE_ALL_COURSES
} from './querys';

class CoursesModule {

  constructor() {
    this._createTable();
  }

  private _createTable = async () => {
    await db.executeQuery(CREATE_COURSES_TABLE);
  }

	private _loadAlias = async (data: CreateCourse) => {
		const alias:Array<string | number | boolean> = [];
		Object.keys(data).forEach((key: string) => {
			alias.push(data[key]);
		});
		return alias;
	}

	create = async (payload: CreateCourse) => {
		try {
			const alias = await this._loadAlias(payload);
      const result = await db.executeQuery(CREATE_COURSE, alias);
			if(!_.isUndefined(result)) {
				return result.rows[0];
			}
			return result;
		} catch (error) {
			return { error };
		}
	}

	getById = async (id: number) => {
		try {
			const result = await db.executeQuery(GET_COURSE_BY_ID, [id]);
			if(!_.isUndefined(result)) {
				return result.rows[0];
			}
			return result;
		} catch (error) {
			return { error };
		}
	}

	listAll = async () => {
		try {
			const result = await db.executeQuery(GET_ALL_COURSES);
			if(!_.isUndefined(result)) {
				return result.rows;
			}
			return result;
		} catch (error) {
			return { error };
		}
	}

	updateById = async (id: number, payload: UpdateCourse) => {
		try {
			const result = await db.executeQuery(UPDATE_COURSE_BY_ID({...payload}), [id]);
			if(!_.isUndefined(result)) {
				return result.rows;
			}
			return result;
		} catch (error) {
			return { error };
		}
	}

	deleteById = async (id: number) => {
		try {
			const result = await db.executeQuery(DELETE_COURSE_BY_ID, [id]);
			if(!_.isUndefined(result)) {
				return result.rows;
			}
			return result;
		} catch (error) {
			return { error };
		}
	}

	deleteAll = async () => {
		try {	
			const result = await db.executeQuery(DELETE_ALL_COURSES);
			if(!_.isUndefined(result)) {
				return result.rows;
			}
			return result;
		} catch (error) {
			return { error };
		}
	}

}

export default new CoursesModule();