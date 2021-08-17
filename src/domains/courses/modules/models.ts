export interface CreateCourse {
  [key: string]: string | number;
  name: string;
  category: string;
  teacher_name: string;
  qtd_vacancies: number;
  value: number;
  duration: number;
  status: string
}

export interface UpdateCourse {
  [key: string]: string | number | undefined;
  name?: string;
  category?: string;
  teacher_name?: string;
  qtd_vacancies?: number;
  value?: number;
  duration?: number;
  status?: string
}