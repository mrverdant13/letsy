interface Config {
  db: DbConfig;
  oauth: OauthConfig;
}

interface DbConfig {
  connectionString: string;
}

interface OauthConfig {
  github: GithubOauthAppConfig;
  google: GoogleOauthAppConfig;
}

interface GithubOauthAppConfig {
  clientId: string;
  clientSecret: string;
}

interface GoogleOauthAppConfig {
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

const googleOauthAppClientId = env.GOOGLE_OAUTH_APP_CLIENT_ID;
if (!googleOauthAppClientId) throw new Error('GOOGLE_OAUTH_APP_CLIENT_ID environment variable is not set');

const googleOauthAppClientSecret = env.GOOGLE_OAUTH_APP_CLIENT_SECRET;
if (!googleOauthAppClientSecret) throw new Error('GOOGLE_OAUTH_APP_CLIENT_SECRET environment variable is not set');

const config: Config = {
  db: {
    connectionString,
  },
  oauth: {
    github: {
      clientId: githubOauthAppClientId,
      clientSecret: githubOauthAppClientSecret,
    },
    google: {
      clientId: googleOauthAppClientId,
      clientSecret: googleOauthAppClientSecret,
    }
  }
};

export default config;