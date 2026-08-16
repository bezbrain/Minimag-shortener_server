export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT?: string;
      MONGO_URI?: string;
      JWT_SECRET?: string;
      JWT_LIFETIME?: string;
      GOOGLE_APPLICATION_CREDENTIALS?: string;
    }
  }
}
