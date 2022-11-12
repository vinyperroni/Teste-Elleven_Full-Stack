import { EstablishmentBusiness } from "../src/business/EstablishmentBusiness";
import { BaseError } from "../src/errors/BaseError";
import {
  ICreateEstablishmentDTO,
  IDeleteEstablishmentInputDTO,
  IEstablishmentsOutput,
  IGetEstablishmentDTO,
} from "../src/models/Establishment";
import { AuthenticatorMock } from "./mocks/AuthenticatorMock";
import { IdGeneratorMock } from "./mocks/IdGeneratorMock";
import { EstablishmentDatabaseMock } from "./mocks/EstablishmentDatabaseMock";

describe("Testando a EstablishmentBusiness", () => {
  const establishmentBusiness = new EstablishmentBusiness(
    new EstablishmentDatabaseMock(),
    new IdGeneratorMock(),
    new AuthenticatorMock()
  );

  test("Create - Uma mensagem de sucesso é retornada quando o establishment é criado", async () => {
    const input: ICreateEstablishmentDTO = {
      name: "Mock Establishment",
      token: "token-mock",
      status: true,
      address: "Endereco mocado",
      lat: 10,
      lng: -10,
    };

    const response = await establishmentBusiness.create(input);

    expect(response.message).toBe("Establishment created successfully");
  });

  test("Get All - Uma lista com 3 establishments é retornada", async () => {
    const input: IGetEstablishmentDTO = {
      token: "token-mock",
    };
    const response = await establishmentBusiness.getUserEstablishments(input);

    expect(response.length).toBe(3);
  });

  test("Delete Establishment - Uma mensagem de sucesso é retornada quando o estabelecimento é deletado", async () => {
    const input: IDeleteEstablishmentInputDTO = {
      establishmentId: "old-id-mock",
      token: "token-mock",
    };

    const response = await establishmentBusiness.deleteEstablishment(input);

    expect(response.message).toBe("Establishment deleted Sucessfully");
  });

  test("Create - Retorna erro caso o name seja uma string vazia", async () => {
    expect.assertions(2);

    try {
      const input: ICreateEstablishmentDTO = {
        name: "",
        token: "token-mock",
        status: true,
        address: "Endereco mocado",
        lat: 10,
        lng: -10,
      };

      await establishmentBusiness.create(input);
    } catch (error: unknown) {
      if (error instanceof BaseError) {
        expect(error.statusCode).toEqual(400);
        expect(error.message).toEqual("Missing parameters");
      }
    }
  });

  test("Create - Retorna erro caso o address seja uma string vazia", async () => {
    expect.assertions(2);

    try {
      const input: ICreateEstablishmentDTO = {
        name: "Mock Establishment",
        token: "token-mock",
        status: true,
        address: "",
        lat: 10,
        lng: -10,
      };

      await establishmentBusiness.create(input);
    } catch (error: unknown) {
      if (error instanceof BaseError) {
        expect(error.statusCode).toEqual(400);
        expect(error.message).toEqual("Missing parameters");
      }
    }
  });

  test("Create - Retorna erro caso o token seja uma string vazia", async () => {
    expect.assertions(2);

    try {
      const input: ICreateEstablishmentDTO = {
        name: "Mock Establishment",
        token: "",
        status: true,
        address: "Endereco mocado",
        lat: 10,
        lng: -10,
      };

      await establishmentBusiness.create(input);
    } catch (error: unknown) {
      if (error instanceof BaseError) {
        expect(error.statusCode).toEqual(400);
        expect(error.message).toEqual("Missing token");
      }
    }
  });

  test("Create - Retorna erro caso o token seja invalido", async () => {
    expect.assertions(2);

    try {
      const input: ICreateEstablishmentDTO = {
        name: "Mock Establishment",
        token: "token-incorreto",
        status: true,
        address: "Endereco mocado",
        lat: 10,
        lng: -10,
      };

      await establishmentBusiness.create(input);
    } catch (error: unknown) {
      if (error instanceof BaseError) {
        expect(error.statusCode).toEqual(401);
        expect(error.message).toEqual("Invalid token");
      }
    }
  });

  test("Delete Establishment - Retorna erro caso o establishmentId não seja informado", async () => {
    expect.assertions(2);

    try {
      const input: IDeleteEstablishmentInputDTO = {
        establishmentId: "",
        token: "token-mock",
      };

      await establishmentBusiness.deleteEstablishment(input);
    } catch (error: unknown) {
      if (error instanceof BaseError) {
        expect(error.statusCode).toEqual(400);
        expect(error.message).toEqual("Missing parameter: establishment id");
      }
    }
  });

  test("Delete Establishment - Retorna erro caso o token não seja informado", async () => {
    expect.assertions(2);

    try {
      const input: IDeleteEstablishmentInputDTO = {
        establishmentId: "id-mock",
        token: "",
      };

      await establishmentBusiness.deleteEstablishment(input);
    } catch (error: unknown) {
      if (error instanceof BaseError) {
        expect(error.statusCode).toEqual(400);
        expect(error.message).toEqual("Missing token");
      }
    }
  });

  test("Delete Establishment - Retorna erro caso o token seja invalido", async () => {
    expect.assertions(2);

    try {
      const input: IDeleteEstablishmentInputDTO = {
        establishmentId: "id-mock",
        token: "token-invalid",
      };

      await establishmentBusiness.deleteEstablishment(input);
    } catch (error: unknown) {
      if (error instanceof BaseError) {
        expect(error.statusCode).toEqual(401);
        expect(error.message).toEqual("Invalid Token");
      }
    }
  });

  test("Delete Establishment - Retorna erro caso o estabelecimento nao exista", async () => {
    expect.assertions(2);

    try {
      const input: IDeleteEstablishmentInputDTO = {
        establishmentId: "id-mock-falso",
        token: "token-mock",
      };

      await establishmentBusiness.deleteEstablishment(input);
    } catch (error: unknown) {
      if (error instanceof BaseError) {
        expect(error.statusCode).toEqual(404);
        expect(error.message).toEqual("Establishment not found");
      }
    }
  });
});
