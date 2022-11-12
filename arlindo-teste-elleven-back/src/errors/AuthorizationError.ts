import { BaseError } from "./BaseError";

export class AuthorizationError extends BaseError {
  constructor(message: string = "Not Authorized") {
    super(403, message);
  }
}
