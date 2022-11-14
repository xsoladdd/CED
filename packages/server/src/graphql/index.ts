import { readFileSync } from "fs";
import glob from "glob";
import { authResolver } from "./resolvers/auth/authResolver";
import { employeeResolver } from "./resolvers/employee/employeeResolver";
import { globalVarResolver } from "./resolvers/globalVars/globalVarResolver";
import { meowResolver } from "./resolvers/meow/meowResolver";

export const generateTypeDefs = async (): Promise<string> => {
  return await new Promise((resolve) => {
    // Read all graphql files
    glob("**/*.graphql", {}, function (_, files) {
      let stringCombine = "";
      // Map through eac graphql files
      files.map((route) => {
        const string = readFileSync(route, {
          encoding: "utf-8",
        });
        // Append each to single string
        stringCombine = stringCombine + " \n" + string;
      });
      // Resolve
      resolve(stringCombine);
    });
  });
};

export const resolvers = [
  meowResolver,
  authResolver,
  employeeResolver,
  globalVarResolver,
];
