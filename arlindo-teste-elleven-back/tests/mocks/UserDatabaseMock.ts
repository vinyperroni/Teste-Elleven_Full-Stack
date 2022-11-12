import { IUserDB, User } from "../../src/models/User";
import { BaseDatabase } from "../../src/database/BaseDatabase";

export class UserDatabaseMock extends BaseDatabase {
  public toUserDBModel = (user: User) => {
    const userDB: IUserDB = {
      id: user.getId(),
      name: user.getName(),
      username: user.getusername(),
      password: user.getPassword(),
    };

    return userDB;
  };

  public selectByUsername = async (
    username: string
  ): Promise<IUserDB | undefined> => {
    switch (username) {
      case "usermock":
        const normalUser: IUserDB = {
          id: "id-mock",
          name: "User Mock",
          username: "usermock",
          password: "hash-mock",
        };

        return normalUser;

      case "astrodev":
        const adminUser: IUserDB = {
          id: "id-mock",
          name: "Astrodev",
          username: "astrodev",
          password: "hash-bananinha",
        };

        return adminUser;

      default:
        return undefined;
    }
  };

  public insert = async (user: User): Promise<void> => {};
}
