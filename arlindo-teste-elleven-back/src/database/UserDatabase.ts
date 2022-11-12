import { IUserDB, User } from "../models/User";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
  public static USER_TABLE = "Arlindo_teste_Elleven_Users";

  public insert = async (user: User): Promise<void> => {
    const newUser: IUserDB = user.toIUserDBModel();

    await BaseDatabase.connection(UserDatabase.USER_TABLE).insert(newUser);
  };

  public selectByUsername = async (
    username: string
  ): Promise<IUserDB | undefined> => {
    const users: IUserDB[] = await BaseDatabase.connection(
      UserDatabase.USER_TABLE
    ).where({ username });

    if (users.length !== 0) {
      const user: IUserDB = users[0];
      return user;
    } else {
      return undefined;
    }
  };
}
