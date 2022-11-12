export interface IUserDB {
  id: string;
  name: string;
  username: string;
  password: string;
}

export interface ISignupInputDTO {
  name: string;
  username: string;
  password: string;
}

export interface ILoginInputDTO {
  username: string;
  password: string;
}

export class User {
  constructor(
    private id: string,
    private name: string,
    private username: string,
    private password: string
  ) {}

  public toIUserDBModel = (): IUserDB => {
    return {
      id: this.id,
      name: this.name,
      username: this.username,
      password: this.password,
    };
  };

  public getId = () => this.id;

  public getName = () => this.name;

  public getusername = () => this.username;

  public getPassword = () => this.password;

  public setId = (newId: string) => {
    this.id = newId;
  };

  public setName = (newName: string) => {
    this.name = newName;
  };

  public setusername = (newusername: string) => {
    this.username = newusername;
  };

  public setPassword = (newPassword: string) => {
    this.password = newPassword;
  };
}
