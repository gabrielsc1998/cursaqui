import 'dotenv/config';

const env = <string>process.env.NODE_ENV || 'dev';

interface ObjectConfig {
  app: {
    port: number
  },
  db: {
    url: string,
    name: string,
    port: number,
    user: string,
    password: string
  }
}

interface Config {
  [key: string]: ObjectConfig,
  dev: ObjectConfig
}

const config: Config = {
  dev: {
    app: {
      port: Number(process.env.APP_PORT) || 3000,
    },
    db: {
      url: process.env.DB_URL || 'localhost',
      name: process.env.DB_NAME || 'postgres',
      port: Number(process.env.DB_PORT) || 5432,
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || '',
    }
  },
}

export default config[env];