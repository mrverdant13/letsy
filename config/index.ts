interface Config {
  db: DbConfig;
}

interface DbConfig {
  connectionString: string;
}

const connectionString = process.env.DB_CONNECTION_STRING;
if (!connectionString) throw new Error('DB_CONNECTION_STRING environment variable is not set');

const config: Config = {
  db: {
    connectionString,
  },
};

export default config;