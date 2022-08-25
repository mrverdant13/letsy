interface Config {
  db: DbConfig;
  githubOauthApp: GithubOauthAppConfig;
}

interface DbConfig {
  connectionString: string;
}

interface GithubOauthAppConfig {
  clientId: string;
  clientSecret: string;
}

const env = process.env;

const connectionString = env.DB_CONNECTION_STRING;
if (!connectionString) throw new Error('DB_CONNECTION_STRING environment variable is not set');

const githubOauthAppClientId = env.GITHUB_OAUTH_APP_CLIENT_ID;
if (!githubOauthAppClientId) throw new Error('GITHUB_OAUTH_APP_CLIENT_ID environment variable is not set');

const githubOauthAppClientSecret = env.GITHUB_OAUTH_APP_CLIENT_SECRET;
if (!githubOauthAppClientSecret) throw new Error('GITHUB_OAUTH_APP_CLIENT_SECRET environment variable is not set');

const config: Config = {
  db: {
    connectionString,
  },
  githubOauthApp: {
    clientId: githubOauthAppClientId,
    clientSecret: githubOauthAppClientSecret,
  },
};

export default config;