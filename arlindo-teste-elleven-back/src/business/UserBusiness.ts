import { UserDatabase } from "../database/UserDatabase";
import { ConflictError } from "../errors/ConflictError";
import { NotFoundError } from "../errors/NotFoundError";
import { ParamsError } from "../errors/ParamsError";
import { UnprocessableError } from "../errors/UnprocessableError";
import { AuthenticationError } from "../errors/AuthenticationError";
import { ILoginInputDTO, ISignupInputDTO, User } from "../models/User";
import { Authenticator, ITokenPayload } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";

export class UserBusiness {
  constructor(
    private userDatabase: UserDatabase,
    private idGenerator: IdGenerator,
    private hashManager: HashManager,
    private authenticator: Authenticator
  ) {}

  public signup = async (userData: ISignupInputDTO) => {
    const { name, username, password } = userData;

    if (!name || !username || !password) {
      throw new ParamsError("Missing parameters");
    }

    if (
      typeof name !== "string" ||
      typeof username !== "string" ||
      typeof password !== "string"
    ) {
      throw new UnprocessableError("Wrong type parameters");
    }

    if (password.length < 6) {
      throw new UnprocessableError("Password must be 6 or more characters");
    }

    if (name.length < 3) {
      throw new UnprocessableError("Name must be 3 or more characters");
    }

    const user = await this.userDatabase.selectByUsername(username);

    if (user) {
      throw new ConflictError("username already registered");
    }

    const id: string = this.idGenerator.generate();
    const hashPassword = await this.hashManager.hash(password);

    const newUser = new User(id, name, username, hashPassword);

    await this.userDatabase.insert(newUser);

    const tokenPayload: ITokenPayload = {
      id,
    };

    const token = this.authenticator.generateToken(tokenPayload);

    return {
      message: "User created successfully",
      token,
    };
  };

  public login = async (userData: ILoginInputDTO) => {
    const { username, password } = userData;

    if (!username || !password) {
      throw new ParamsError("Missing parameters");
    }

    if (typeof username !== "string" || typeof password !== "string") {
      throw new UnprocessableError("Wrong type parameters");
    }

    if (password.length < 6) {
      throw new UnprocessableError("Password must be 6 or more characters");
    }

    const user = await this.userDatabase.selectByUsername(username);

    if (!user) {
      throw new NotFoundError("User Not Found");
    }

    const isValidPassword = await this.hashManager.compare(
      password,
      user.password
    );

    if (!isValidPassword) {
      throw new AuthenticationError();
    }

    const tokenPayload: ITokenPayload = {
      id: user.id,
    };

    const token = this.authenticator.generateToken(tokenPayload);

    return {
      message: "Successfully logged in",
      token,
    };
  };
}
