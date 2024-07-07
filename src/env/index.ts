import { getEnvSafely } from './config';

/**
 * For server-used only
 */
const MONGO_URI = getEnvSafely('MONGO_URI');
const GITHUB_ID = getEnvSafely('GITHUB_ID');
const GITHUB_SECRET = getEnvSafely('GITHUB_SECRET');
const GOOGLE_CLIENT_ID = getEnvSafely('GOOGLE_CLIENT_ID');
const GOOGLE_CLIENT_SECRET = getEnvSafely('GOOGLE_CLIENT_SECRET');
const AZURE_SAS_TOKEN = getEnvSafely('AZURE_SAS_TOKEN');
const AZURE_STORAGE_ACCOUNT_NAME = getEnvSafely('AZURE_STORAGE_ACCOUNT_NAME');
const AZURE_STORAGE_CONTAINER_NAME = getEnvSafely('AZURE_STORAGE_CONTAINER_NAME');
const NODE_ENV = getEnvSafely('NODE_ENV');
const API_KEY = getEnvSafely('API_KEY');

const env = {
	MONGO_URI,
	GITHUB_ID,
	GITHUB_SECRET,
	GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET,
	AZURE_SAS_TOKEN,
	AZURE_STORAGE_ACCOUNT_NAME,
	AZURE_STORAGE_CONTAINER_NAME,
	NODE_ENV,
	API_KEY,
};

export default env;
