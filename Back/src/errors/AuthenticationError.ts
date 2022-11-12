import { BaseError } from "./BaseError";

export class AuthenticationError extends BaseError {
  constructor(message: string = "Invalid credentials") {
    super(401, message);
  }
}
