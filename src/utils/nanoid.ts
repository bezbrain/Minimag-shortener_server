import { createRequire } from "node:module";

const nodeRequire = createRequire(__filename);
const { nanoid } = nodeRequire("nanoid") as {
  nanoid: (size?: number) => string;
};

export { nanoid };
