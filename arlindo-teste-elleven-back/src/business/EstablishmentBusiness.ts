import { UserDatabase } from "../database/UserDatabase";
import { ConflictError } from "../errors/ConflictError";
import { NotFoundError } from "../errors/NotFoundError";
import { ParamsError } from "../errors/ParamsError";
import { UnprocessableError } from "../errors/UnprocessableError";
import { AuthenticationError } from "../errors/AuthenticationError";
import { AuthorizationError } from "../errors/AuthorizationError";
import { ILoginInputDTO } from "../models/User";
import { Authenticator, ITokenPayload } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";
import { EstablishmentDatabase } from "../database/EstablishmentDatabase";
import {
  ICreateEstablishmentDTO,
  IEstablishmentDb,
  IEstablishmentsOutput,
  Establishment,
  IGetEstablishmentDTO,
  IUpdateEstablishmentDTO,
  IDeleteEstablishmentInputDTO,
} from "../models/Establishment";
import moment from "moment";

export class EstablishmentBusiness {
  constructor(
    private establishmentDatabase: EstablishmentDatabase,
    private idGenerator: IdGenerator,
    private authenticator: Authenticator
  ) {}

  public create = async (establishmentData: ICreateEstablishmentDTO) => {
    const { name, token, status, address, lat, lng } = establishmentData;

    if (!name || status === undefined || !address || !lat || !lng) {
      throw new ParamsError("Missing parameters");
    }

    if (!token) {
      throw new ParamsError("Missing token");
    }

    const tokenData: ITokenPayload | null =
      this.authenticator.getTokenPayload(token);

    if (!tokenData) {
      throw new AuthenticationError("Invalid token");
    }

    const id: string = this.idGenerator.generate();

    const newEstablishment = new Establishment(
      id,
      name,
      tokenData.id,
      new Date(),
      status,
      address,
      {
        lat,
        lng,
      }
    );

    await this.establishmentDatabase.insert(newEstablishment);

    return {
      message: "Establishment created successfully",
    };
  };

  public update = async (establishmentData: IUpdateEstablishmentDTO) => {
    const { id, name, token, status, address, lat, lng } = establishmentData;

    if (!id || !name || status === undefined || !address || !lat || !lng) {
      throw new ParamsError("Missing parameters");
    }

    if (!token) {
      throw new ParamsError("Missing token");
    }

    const tokenData: ITokenPayload | null =
      this.authenticator.getTokenPayload(token);

    if (!tokenData) {
      throw new AuthenticationError("Invalid token");
    }

    const newEstablishment = new Establishment(
      id,
      name,
      tokenData.id,
      new Date(),
      status,
      address,
      {
        lat,
        lng,
      }
    );

    await this.establishmentDatabase.updateById(id, newEstablishment);

    return {
      message: "Establishment updated successfully",
    };
  };

  public getUserEstablishments = async (input: IGetEstablishmentDTO) => {
    const { token } = input;

    if (!token) {
      throw new ParamsError("Missing token");
    }

    const tokenData: ITokenPayload | null =
      this.authenticator.getTokenPayload(token);

    if (!tokenData) {
      throw new AuthenticationError("Invalid token");
    }

    const establishments: IEstablishmentDb[] | undefined =
      await this.establishmentDatabase.selectByCreatorId(tokenData.id);

    if (!establishments || establishments.length === 0) {
      throw new NotFoundError("No establishments were found");
    }

    const establishmentsOutput: IEstablishmentsOutput[] = establishments.map(
      (establishment) => {
        return {
          id: establishment.id,
          name: establishment.name,
          createAt: establishment.create_at.toLocaleDateString(),
          status: establishment.status !== 0,
          address: establishment.address,
          coordinates: {
            lat: establishment.lat,
            lng: establishment.lng,
          },
        };
      }
    );

    return establishmentsOutput;
  };

  public deleteEstablishment = async (input: IDeleteEstablishmentInputDTO) => {
    const { establishmentId, token } = input;

    if (!establishmentId || establishmentId === ":id") {
      throw new ParamsError("Missing parameter: establishment id");
    }

    if (!token) {
      throw new ParamsError("Missing token");
    }

    const tokenData = this.authenticator.getTokenPayload(token);

    if (!tokenData) {
      throw new AuthenticationError("Invalid Token");
    }

    const establishment: IEstablishmentDb | undefined =
      await this.establishmentDatabase.selectById(establishmentId);

    if (!establishment) {
      throw new NotFoundError("Establishment not found");
    }

    if (tokenData.id !== establishment.creator_id) {
      throw new AuthorizationError("Only creator can delete a establishment");
    }

    await this.establishmentDatabase.deleteById(establishment.id);

    return {
      message: "Establishment deleted Sucessfully",
    };
  };
}
