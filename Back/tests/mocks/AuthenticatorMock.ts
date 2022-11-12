import { ITokenPayload } from "../../src/services/Authenticator";

export class AuthenticatorMock {
  public generateToken = (payload: ITokenPayload): string => {
    return "token-mock";
  };

  public getTokenPayload = (token: string): ITokenPayload | null => {
    switch (token) {
      case "token-mock":
        const adminPayload: ITokenPayload = {
          id: "id-mock",
        };

        return adminPayload;

      case "token-mock":
        const normalPayload: ITokenPayload = {
          id: "id-mock",
        };

        return normalPayload;

      default:
        return null;
    }
  };
}
