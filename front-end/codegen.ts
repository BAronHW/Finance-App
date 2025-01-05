import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:4000",
  documents: ["src/**/*.(tsx|ts)"],
  generates: {
    "./src/__generated__/": {
      preset: "client", 
    },
    "./src/__generated__/types.ts": {
      plugins: ["typescript", "typescript-operations"], 
    }
  },
  ignoreNoDocuments: true,
};

export default config;
