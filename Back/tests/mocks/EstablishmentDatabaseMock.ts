import { BaseDatabase } from "../../src/database/BaseDatabase";
import {
  IEstablishmentDb,
  Establishment,
} from "../../src/models/Establishment";

export class EstablishmentDatabaseMock extends BaseDatabase {
  public static ESTABLISHMENT_TABLE = "Arlindo-teste-Elleven_Establishments";

  public insert = async (establishment: Establishment): Promise<void> => {};

  public selectByCreatorId = async (): Promise<IEstablishmentDb[]> => {
    const establishments: IEstablishmentDb[] = [
      {
        id: "id-mock",
        name: "Establishment-Mock",
        create_at: new Date("2022/10/10"),
        creator_id: "id-mock",
        status: 1,
        address: "Endereço mocado",
        lat: -10,
        lng: 10,
      },
      {
        id: "id-mock",
        name: "Establishment-Mock-2",
        create_at: new Date("2022/10/09"),
        creator_id: "id-mock",
        status: 0,
        address: "Endereço mocado 2",
        lat: -20,
        lng: 20,
      },
      {
        id: "id-mock",
        name: "Establishment-Mock-3",
        create_at: new Date("2022/10/08"),
        creator_id: "id-mock",
        status: 1,
        address: "Endereço mocado 3",
        lat: -30,
        lng: 30,
      },
    ];

    return establishments;
  };

  public selectById = async (
    id: string
  ): Promise<IEstablishmentDb | undefined> => {
    switch (id) {
      case "id-mock":
        return {
          id: "id-mock",
          name: "Establishment-Mock",
          create_at: new Date("2022/10/10"),
          creator_id: "id-mock",
          status: 1,
          address: "Endereço mocado",
          lat: -10,
          lng: 10,
        };

      case "old-id-mock":
        return {
          id: "old-id-mock",
          name: "Establishment-Mock-2",
          create_at: new Date("2022/10/09"),
          creator_id: "id-mock",
          status: 1,
          address: "Endereço mocado 2",
          lat: -20,
          lng: 20,
        };
      default:
        return undefined;
    }
  };

  public updateById = async (
    id: string,
    updated: Establishment
  ): Promise<void> => {};

  public deleteById = async (id: string): Promise<void> => {};
}
