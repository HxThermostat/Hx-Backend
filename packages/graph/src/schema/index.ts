import { promises as fs } from "fs";
import glob from "glob";
import { ITypeDefinitions } from "apollo-server-express";

export default (): Promise<ITypeDefinitions> => {
  return new Promise((resolve, reject) => {
    glob("schema/**/*.graphql", (err, matches) => {
      if (err) {
        reject(err);
      } else {
        Promise.all(
          matches.map(path => fs.readFile(path, { encoding: "utf8" }))
        )
          .then(typeDefs => {
            resolve(typeDefs);
          })
          .catch(e => reject(e));
      }
    });
  });
};
