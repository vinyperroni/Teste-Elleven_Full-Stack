import { Router } from "express";
import { EstablishmentBusiness } from "../business/EstablishmentBusiness";
import { EstablishmentController } from "../controller/EstablishmentController";
import { EstablishmentDatabase } from "../database/EstablishmentDatabase";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

export const establishmentRouter = Router();

const establishmentController = new EstablishmentController(
  new EstablishmentBusiness(
    new EstablishmentDatabase(),
    new IdGenerator(),
    new Authenticator()
  )
);

establishmentRouter.post("/", establishmentController.create);
establishmentRouter.put("/:id", establishmentController.update);
establishmentRouter.get("/", establishmentController.getUserEstablishments);
establishmentRouter.delete("/:id", establishmentController.deleteEstablishment);
