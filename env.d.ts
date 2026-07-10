declare global {
  namespace NodeJS {
    interface ProcessEnv {
      VITE_CLERK_PUBLISHABLE_KEY: string
      API_URL: string
      API_KEY: string
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}
