import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:4000",
  documents: ["src/**/*.{ts,tsx}"],
  generates: {
    "./src/__generated__/": {
      preset: "client",
      presetConfig: {
        gqlTagName: 'gql',
      }
    },
    "./src/__generated__/types.ts": {
      plugins: ["typescript", "typescript-operations", "typed-document-node"], 
    }
  },
  ignoreNoDocuments: true,
};

export default config;
