/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_APP_HOST_API_kEY: string
    // more env variables...
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }