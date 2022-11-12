import { UserBusiness } from "../src/business/UserBusiness";
import { BaseError } from "../src/errors/BaseError";
import { ILoginInputDTO, ISignupInputDTO } from "../src/models/User";
import { AuthenticatorMock } from "./mocks/AuthenticatorMock";
import { HashManagerMock } from "./mocks/HashManagerMock";
import { IdGeneratorMock } from "./mocks/IdGeneratorMock";
import { UserDatabaseMock } from "./mocks/UserDatabaseMock";

describe("Testando a UserBusiness", () => {
  const userBusiness = new UserBusiness(
    new UserDatabaseMock(),
    new IdGeneratorMock(),
    new HashManagerMock(),
    new AuthenticatorMock()
  );

  test("Signup - Um token e uma mensagem é retornado quando o cadastro é bem-sucedido", async () => {
    const input: ISignupInputDTO = {
      username: "fulano",
      name: "Fulano",
      password: "fulano123",
    };

    const response = await userBusiness.signup(input);
    expect(response.message).toBe("User created successfully");
    expect(response.token).toBe("token-mock");
  });

  test("Login - Um token e uma mensagem é retornado quando o login é bem-sucedido", async () => {
    const input: ILoginInputDTO = {
      username: "astrodev",
      password: "bananinha",
    };

    const response = await userBusiness.login(input);
    expect(response.message).toBe("Successfully logged in");
    expect(response.token).toBe("token-mock");
  });

  test("Signup - Retorna erro caso o name seja uma string vazia", async () => {
    expect.assertions(2);

    try {
      const input: ISignupInputDTO = {
        username: "fulano",
        name: "",
        password: "bananinha",
      };

      await userBusiness.signup(input);
    } catch (error: unknown) {
      if (error instanceof BaseError) {
        expect(error.statusCode).toEqual(400);
        expect(error.message).toEqual("Missing parameters");
      }
    }
  });

  test("Signup - Retorna erro caso o username seja uma string vazia", async () => {
    expect.assertions(2);

    try {
      const input: ISignupInputDTO = {
        username: "",
        name: "Fulano",
        password: "bananinha",
      };

      await userBusiness.signup(input);
    } catch (error: unknown) {
      if (error instanceof BaseError) {
        expect(error.statusCode).toEqual(400);
        expect(error.message).toEqual("Missing parameters");
      }
    }
  });

  test("Signup - Retorna erro caso o password seja uma string vazia", async () => {
    expect.assertions(2);

    try {
      const input: ISignupInputDTO = {
        username: "fulano",
        name: "Fulano",
        password: "",
      };

      await userBusiness.signup(input);
    } catch (error: unknown) {
      if (error instanceof BaseError) {
        expect(error.statusCode).toEqual(400);
        expect(error.message).toEqual("Missing parameters");
      }
    }
  });

  test("Signup - Retorna erro caso o name tenha tipo diferente de string", async () => {
    expect.assertions(2);

    try {
      const input = {
        username: "fulano",
        name: 10,
        password: "bananinha",
      } as unknown as ISignupInputDTO;

      await userBusiness.signup(input);
    } catch (error: unknown) {
      if (error instanceof BaseError) {
        expect(error.message).toEqual("Wrong type parameters");
        expect(error.statusCode).toEqual(422);
      }
    }
  });

  test("Signup - Retorna erro caso o username tenha tipo diferente de string", async () => {
    expect.assertions(2);

    try {
      const input = {
        username: 10,
        name: "Fulano",
        password: "bananinha",
      } as unknown as ISignupInputDTO;

      await userBusiness.signup(input);
    } catch (error: unknown) {
      if (error instanceof BaseError) {
        expect(error.message).toEqual("Wrong type parameters");
        expect(error.statusCode).toEqual(422);
      }
    }
  });

  test("Signup - Retorna erro caso o password tenha tipo diferente de string", async () => {
    expect.assertions(2);

    try {
      const input = {
        username: "fulano",
        name: "Fulano",
        password: 10,
      } as unknown as ISignupInputDTO;

      await userBusiness.signup(input);
    } catch (error: unknown) {
      if (error instanceof BaseError) {
        expect(error.message).toEqual("Wrong type parameters");
        expect(error.statusCode).toEqual(422);
      }
    }
  });

  test("Signup - Erro quando 'password' for menor que 6 caracteres", async () => {
    expect.assertions(2);

    try {
      const input: ISignupInputDTO = {
        username: "fulano",
        name: "Fulano",
        password: "bana",
      };

      await userBusiness.signup(input);
    } catch (error) {
      if (error instanceof BaseError) {
        expect(error.statusCode).toBe(422);
        expect(error.message).toBe("Password must be 6 or more characters");
      }
    }
  });

  test("Signup - Erro quando 'name' for menor que 3 caracteres", async () => {
    expect.assertions(2);

    try {
      const input: ISignupInputDTO = {
        username: "fulano",
        name: "Fu",
        password: "banana",
      };

      await userBusiness.signup(input);
    } catch (error) {
      if (error instanceof BaseError) {
        expect(error.statusCode).toBe(422);
        expect(error.message).toBe("Name must be 3 or more characters");
      }
    }
  });

  test("Signup - Erro quando o username já for cadastrado", async () => {
    expect.assertions(2);

    try {
      const input: ISignupInputDTO = {
        username: "usermock",
        name: "User Mock",
        password: "banananinha",
      };

      await userBusiness.signup(input);
    } catch (error: unknown) {
      if (error instanceof BaseError) {
        expect(error.statusCode).toEqual(409);
        expect(error.message).toEqual("username already registered");
      }
    }
  });

  test("Login - Retorna erro caso o username seja uma string vazia", async () => {
    expect.assertions(2);

    try {
      const input: ILoginInputDTO = {
        username: "",
        password: "bananinha",
      };

      await userBusiness.login(input);
    } catch (error: unknown) {
      if (error instanceof BaseError) {
        expect(error.statusCode).toEqual(400);
        expect(error.message).toEqual("Missing parameters");
      }
    }
  });

  test("Login - Retorna erro caso o password seja uma string vazia", async () => {
    expect.assertions(2);

    try {
      const input: ILoginInputDTO = {
        username: "fulano",
        password: "",
      };

      await userBusiness.login(input);
    } catch (error: unknown) {
      if (error instanceof BaseError) {
        expect(error.statusCode).toEqual(400);
        expect(error.message).toEqual("Missing parameters");
      }
    }
  });

  test("Login - Retorna erro caso o username tenha tipo diferente de string", async () => {
    expect.assertions(2);

    try {
      const input = {
        username: 10,
        password: "bananinha",
      } as unknown as ILoginInputDTO;

      await userBusiness.login(input);
    } catch (error: unknown) {
      if (error instanceof BaseError) {
        expect(error.message).toEqual("Wrong type parameters");
        expect(error.statusCode).toEqual(422);
      }
    }
  });

  test("Login - Retorna erro caso o password tenha tipo diferente de string", async () => {
    expect.assertions(2);

    try {
      const input = {
        username: "fulano",
        password: 10,
      } as unknown as ILoginInputDTO;

      await userBusiness.login(input);
    } catch (error: unknown) {
      if (error instanceof BaseError) {
        expect(error.message).toEqual("Wrong type parameters");
        expect(error.statusCode).toEqual(422);
      }
    }
  });

  test("Login - Erro quando 'password' for menor que 6 caracteres", async () => {
    expect.assertions(2);

    try {
      const input: ILoginInputDTO = {
        username: "fulano",
        password: "bana",
      };

      await userBusiness.login(input);
    } catch (error) {
      if (error instanceof BaseError) {
        expect(error.statusCode).toBe(422);
        expect(error.message).toBe("Password must be 6 or more characters");
      }
    }
  });

  test("Login - Erro quando o username não for registrado", async () => {
    expect.assertions(2);

    try {
      const input: ILoginInputDTO = {
        username: "fulano",
        password: "banananinha",
      };

      await userBusiness.login(input);
    } catch (error: unknown) {
      if (error instanceof BaseError) {
        expect(error.statusCode).toEqual(404);
        expect(error.message).toEqual("User Not Found");
      }
    }
  });

  test("Login - Erro quando a senha for incorreta", async () => {
    expect.assertions(2);

    try {
      const input: ILoginInputDTO = {
        username: "astrodev",
        password: "1234567",
      };

      await userBusiness.login(input);
    } catch (error: unknown) {
      if (error instanceof BaseError) {
        expect(error.statusCode).toEqual(401);
        expect(error.message).toEqual("Invalid credentials");
      }
    }
  });
});
