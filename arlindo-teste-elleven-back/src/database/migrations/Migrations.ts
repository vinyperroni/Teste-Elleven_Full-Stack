import { BaseDatabase } from "../BaseDatabase";
import { EstablishmentDatabase } from "../EstablishmentDatabase";
import { UserDatabase } from "../UserDatabase";

class Migrations extends BaseDatabase {
  execute = async () => {
    try {
      console.log("Creating tables...");
      await this.createTables();
      console.log("Tables created successfully.");

      console.log("Migrations completed.");
    } catch (error) {
      console.log("FAILED! Error in migrations...");
      if (error instanceof Error) {
        console.log(error.message);
      }
    } finally {
      console.log("Ending connection...");
      BaseDatabase.connection.destroy();
      console.log("Connection closed graciously.");
    }
  };

  createTables = async () => {
    await BaseDatabase.connection.raw(`
        DROP TABLE IF EXISTS ${EstablishmentDatabase.ESTABLISHMENT_TABLE};
        DROP TABLE IF EXISTS ${UserDatabase.USER_TABLE};
        
        CREATE TABLE IF NOT EXISTS ${UserDatabase.USER_TABLE}(
            id VARCHAR(255) PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            username VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL
        );

        CREATE TABLE IF NOT EXISTS ${EstablishmentDatabase.ESTABLISHMENT_TABLE}(
            id VARCHAR(255) PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            creator_id VARCHAR(255) NOT NULL,
            create_at DATE NOT NULL,
            status TINYINT DEFAULT 1,
            address VARCHAR(255) NOT NULL,
            lat FLOAT NOT NULL,
            lng FLOAT NOT NULL,
            FOREIGN KEY (creator_id) REFERENCES ${UserDatabase.USER_TABLE}(id)
        );

        `);
  };
}

const migrations = new Migrations();
migrations.execute();
