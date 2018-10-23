import * as fs from "fs-extra";
import * as path from "path";
import { parsePath } from "../../parser";
import { generateOpenApiV3 } from "./openapi-3";

const EXAMPLES_DIR = path.join(__dirname, "..", "..", "..", "..", "examples");

describe("OpenAPI 3 generator", () => {
  describe("produces valid code", () => {
    for (const testCaseName of fs.readdirSync(EXAMPLES_DIR)) {
      if (!fs.lstatSync(path.join(EXAMPLES_DIR, testCaseName)).isDirectory()) {
        continue;
      }
      test(testCaseName, async () => {
        const api = await parsePath(
          path.join(EXAMPLES_DIR, testCaseName, "api.ts")
        );
        const serverSource = generateOpenApiV3(api, "yaml");
        expect(serverSource).toMatchSnapshot();
      });
    }
  });
});