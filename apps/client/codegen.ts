import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:4051/graphql/",
  // schema: GRAPHQL_URI,
  documents: "./src/**/*.graphql",
  generates: {
    "./src/graphQL/generated/": {
      preset: "client",
      plugins: [],
    },
  },
};

export default config;
