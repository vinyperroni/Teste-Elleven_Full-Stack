import { BaseError } from "./BaseError";

export class UnprocessableError extends BaseError {
  constructor(message: string = "Semantic erros on parameters") {
    super(422, message);
  }
}
