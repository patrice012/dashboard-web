/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PUBLIC_FIREBASE_APIKEY: string;
  readonly VITE_PUBLIC_FIREBASE_AUTHDOMAIN: string;
  readonly VITE_PUBLIC_FIREBASE_PROJECTID: string;
  readonly VITE_PUBLIC_FIREBASE_STORAGE_BUCKET: string;
  readonly VITE_PUBLIC_FIREBASE_MESSAGE_SENDER_ID: string;
  readonly VITE_PUBLIC_FIREBASE_APPID: string;
  readonly VITE_PUBLIC_FIREBASE_MEASUREMENTID: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
