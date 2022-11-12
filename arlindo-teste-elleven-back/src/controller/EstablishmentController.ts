import { Request, Response } from "express";
import { EstablishmentBusiness } from "../business/EstablishmentBusiness";
import { BaseError } from "../errors/BaseError";
import {
  ICreateEstablishmentDTO,
  IDeleteEstablishmentInputDTO,
  IEstablishmentDb,
  IEstablishmentsOutput,
  IGetEstablishmentDTO,
  IUpdateEstablishmentDTO,
} from "../models/Establishment";

export class EstablishmentController {
  constructor(private establishmentBusiness: EstablishmentBusiness) {}

  public create = async (req: Request, res: Response) => {
    try {
      const { name, status, address, lat, lng } = req.body;
      const token = req.headers.authorization as string;

      const input: ICreateEstablishmentDTO = {
        name,
        token,
        status,
        address,
        lat,
        lng,
      };

      const response = await this.establishmentBusiness.create(input);

      res.status(201).send(response);
    } catch (error: any) {
      if (error instanceof BaseError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
      res.status(500).send({
        message:
          error.sqlMessage ||
          "Erro inesperado no endpoint Create Establishment",
      });
    }
  };

  public update = async (req: Request, res: Response) => {
    try {
      const { name, status, address, lat, lng } = req.body;
      const id = req.params.id as string;
      const token = req.headers.authorization as string;

      const input: IUpdateEstablishmentDTO = {
        id,
        name,
        token,
        status,
        address,
        lat,
        lng,
      };

      const response = await this.establishmentBusiness.update(input);

      res.status(201).send(response);
    } catch (error: any) {
      if (error instanceof BaseError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
      res.status(500).send({
        message:
          error.sqlMessage ||
          "Erro inesperado no endpoint Update Establishment",
      });
    }
  };

  public getUserEstablishments = async (req: Request, res: Response) => {
    try {
      const input: IGetEstablishmentDTO = {
        token: req.headers.authorization as string,
      };

      const response: IEstablishmentsOutput[] =
        await this.establishmentBusiness.getUserEstablishments(input);

      res.status(200).send(response);
    } catch (error: any) {
      if (error instanceof BaseError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
      res.status(500).send({
        message:
          error.sqlMessage ||
          "Erro inesperado no endpoint Get User Establishments",
      });
    }
  };

  public deleteEstablishment = async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization as string;
      const establishmentId = req.params.id;

      const input: IDeleteEstablishmentInputDTO = {
        establishmentId,
        token,
      };

      const response = await this.establishmentBusiness.deleteEstablishment(
        input
      );

      res.status(200).send(response);
    } catch (error: any) {
      if (error instanceof BaseError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
      res.status(500).send({
        message:
          error.sqlMessage || "Erro inesperado no endpoint Delete Establisment",
      });
    }
  };
}
