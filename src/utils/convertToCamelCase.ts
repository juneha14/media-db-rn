/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { camelCase } from "lodash";

export const convertToCamelCase = (obj: any): any => {
  if (!obj || typeof obj !== "object") {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((x) => convertToCamelCase(x));
  }

  const camelCased = Object.keys(obj).reduce((result, key) => {
    return {
      ...result,
      [camelCase(key)]: convertToCamelCase(obj[key]),
    };
  }, {});

  return camelCased;
};
