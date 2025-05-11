import 'dotenv/config'
const private_key = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

interface ServiceAccountConfig {
    type: string | undefined;
    project_id: string | undefined;
    private_key_id: string | undefined;
    private_key: string | undefined;
    client_email: string | undefined;
    client_id: string | undefined;
    auth_uri: string | undefined;
    token_uri: string | undefined;
    auth_provider_x509_cert_url: string | undefined;
    client_x509_cert_url: string | undefined;
}

export const config: ServiceAccountConfig = {
    type: process.env.FIREBASE_TYPE,
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: private_key,
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: process.env.FIREBASE_AUTH_URI,
    token_uri: process.env.FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.CLIENT_X509_CERT_URL,
}


