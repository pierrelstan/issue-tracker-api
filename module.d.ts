declare namespace NodeJS {
    export interface ProcessEnv {
        PORT: string;
        MONGODB_API_KEY: string;
        RANDOM_TOKEN_SECRET: string;
    }
}
