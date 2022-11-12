import { IEstablishmentDb, Establishment } from "../models/Establishment";
import { BaseDatabase } from "./BaseDatabase";

export class EstablishmentDatabase extends BaseDatabase {
  public static ESTABLISHMENT_TABLE = "Arlindo_teste_Elleven_Establishments";

  public insert = async (establishment: Establishment): Promise<void> => {
    const newEstablishment: IEstablishmentDb =
      establishment.toIEstablishmentDBModel();

    await BaseDatabase.connection(
      EstablishmentDatabase.ESTABLISHMENT_TABLE
    ).insert(newEstablishment);
  };

  public selectByCreatorId = async (
    id: string
  ): Promise<IEstablishmentDb[] | undefined> => {
    const establishments: IEstablishmentDb[] = await BaseDatabase.connection
      .select()
      .from(EstablishmentDatabase.ESTABLISHMENT_TABLE)
      .where({ creator_id: id });

    return establishments;
  };

  public selectById = async (
    id: string
  ): Promise<IEstablishmentDb | undefined> => {
    const establishments: IEstablishmentDb[] = await BaseDatabase.connection
      .select()
      .from(EstablishmentDatabase.ESTABLISHMENT_TABLE)
      .where({ id });

    return establishments[0];
  };

  public updateById = async (
    id: string,
    updated: Establishment
  ): Promise<void> => {
    const establishment = updated.toIEstablishmentDBModel();
    const { name, address, lat, lng, status } = establishment;

    await BaseDatabase.connection
      .update({ name, address, lat, lng, status })
      .from(EstablishmentDatabase.ESTABLISHMENT_TABLE)
      .where({ id: id });
  };

  public deleteById = async (id: string): Promise<void> => {
    await BaseDatabase.connection
      .delete()
      .from(EstablishmentDatabase.ESTABLISHMENT_TABLE)
      .where({ id: id });
  };
}
