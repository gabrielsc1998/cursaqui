import server from './server';
import database from './database';

import courseModule from './domains/courses/modules';

(async function () {
  if(await database.connect()) {
    if(await server.start()) {
      courseModule.create({
        name: 'Instagram',
        category: 'Marketing', 
        teacher_name: 'Marina da Costa',
        qtd_vacancies: 20,
        value: 10.00,
        duration: 200,
        status: 'open'
      });
    }
  }
})();