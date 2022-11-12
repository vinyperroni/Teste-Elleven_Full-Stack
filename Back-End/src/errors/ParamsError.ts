import { BaseError } from "./BaseError";

export class ParamsError extends BaseError {
  constructor(message: string = "Invalid or missing parameters") {
    super(400, message);
  }
}
