import { Model } from "mongoose";
// user interface
export type IUser = {
  name: string;
  email: string;
  password: string;
};
export type UserModel = Model<IUser, Record<string, unknown>>;
// user filters
export type IUserFilters = {
  searchTerm: string;
  name: string;
  email: string;
};
