import type data from "./data";

export type TUser = {
  id: string;
  username: string;
  address: typeof data[number]["address"];
  age: number;
  companyName: string;

  isRemoved?: boolean;
};
export type TUsers = TUser[];
export type TUserMap = Map<TUser["id"], TUser>;
