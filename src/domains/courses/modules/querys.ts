import { UpdateCourse } from './models';

const tableName = 'courses';

export const CREATE_COURSES_TABLE = `
  CREATE TABLE IF NOT EXISTS ${tableName} (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    category VARCHAR(50),
    teacher_name VARCHAR(100),
    qtd_vacancies INTEGER,
    value NUMERIC(10, 2),
    duration INTEGER,
    status VARCHAR(50),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(id, name)
  );
`;

export const CREATE_COURSE = `
  INSERT INTO ${tableName} (
    name, 
    category, 
    teacher_name,
    qtd_vacancies,
    value,
    duration,
    status
  ) VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING id;
`;

export const GET_ALL_COURSES = `
  SELECT * FROM ${tableName}
`;

export const GET_COURSE_BY_ID = `
  SELECT * FROM ${tableName} WHERE id=$1
`;

const buildSetUpdate = (values: UpdateCourse): string => {
  let setUpdate = '';
  const qtdKeys = Object.keys(values).length;
  Object.keys(values).forEach((key: string, index: number) => {
    setUpdate += `${key}=`;
    setUpdate += typeof values[key] === 'string' ? `'${values[key]}'`: `${values[key]}`;
    setUpdate += (qtdKeys > 1 && index === 0 || index+1 < qtdKeys) ? ', ' : '';
  });
  return setUpdate;
};

export const UPDATE_COURSE_BY_ID = (values: UpdateCourse): string => (`
  UPDATE ${tableName} SET ${buildSetUpdate(values)} WHERE id=$1
`);

export const DELETE_COURSE_BY_ID = `
  DELETE FROM ${tableName} WHERE id=$1
`;

export const DELETE_ALL_COURSES = `
  TRUNCATE TABLE ${tableName}
`;
