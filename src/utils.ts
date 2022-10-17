import { ALLOWED_AGE, ID_CHAR_SET } from "./constans";
import data from "./data";

import type { TUsers } from "./types";

/**
 * serializ the Users into an array of user object, see type TUser
 */
export function serializUsers(usersData: typeof data) {
  const users = usersData.reduce<TUsers>((acc, user) => {
    if (user.age >= ALLOWED_AGE) {
      const { username, address, age, company } = user;
      acc.push({
        id: genId(),
        username,
        address,
        age,
        companyName: company.name,
      });
    }
    return acc;
  }, []);
  return users;
}

/**
 * will genrate a id with default length of 6 with'ABCDEF123456'
 * @param {number} [length]
 * @defaultvalue 6
 */
export function genId(length: number = 6) {
  let generatedId = "";
  for (let i = 0; i < length; i++) {
    generatedId += ID_CHAR_SET[Math.floor(Math.random() * ID_CHAR_SET.length)];
  }
  return generatedId;
}

/**
 * function to sort the users
 */
export function sortBy<T>(key: keyof T, dir: "asc" | "desc" = "asc") {
  return (a: T, b: T) => {
    const aPart = a[key];
    const bPart = b[key];

    if (dir === "desc") {
      if (aPart > bPart) {
        return -1;
      }
      if (aPart < bPart) {
        return 1;
      }
      return 0;
    }

    if (aPart < bPart) {
      return -1;
    }
    if (aPart > bPart) {
      return 1;
    }
    return 0;
  };
}
