interface Config {
  db: DbConfig;
  oauth: OauthConfig;
  cloudinary: CloudinaryConfig;
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

interface CloudinaryConfig {
  apiSecret: string;
  apiKey: string;
  cloudName: string;
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

const cloudinaryApiSecret = env.CLOUDINARY_API_SECRET;
if (!cloudinaryApiSecret) throw new Error('CLOUDINARY_API_SECRET environment variable is not set');

const cloudinaryApiKey = env.CLOUDINARY_API_KEY;
if (!cloudinaryApiKey) throw new Error('CLOUDINARY_API_KEY environment variable is not set');

const cloudinaryCloudName = env.CLOUDINARY_CLOUD_NAME;
if (!cloudinaryCloudName) throw new Error('CLOUDINARY_CLOUD_NAME environment variable is not set');

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
  },
  cloudinary: {
    apiSecret: cloudinaryApiSecret,
    apiKey: cloudinaryApiKey,
    cloudName: cloudinaryCloudName,
  },
};

export default config;