import { BaseError } from "./BaseError";

export class NotFoundError extends BaseError {
  constructor(message: string = "Not found") {
    super(404, message);
  }
}
