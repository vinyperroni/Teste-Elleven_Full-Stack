import { BaseError } from "./BaseError";

export class ConflictError extends BaseError {
  constructor(message: string = "Data already registered") {
    super(409, message);
  }
}
