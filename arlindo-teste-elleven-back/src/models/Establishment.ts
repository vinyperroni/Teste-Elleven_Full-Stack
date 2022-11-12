export interface IEstablishmentDb {
  id: string;
  name: string;
  creator_id: string;
  create_at: Date;
  status: number;
  address: string;
  lat: number;
  lng: number;
}

export interface IEstablishmentsOutput {
  id: string;
  name: string;
  createAt: string;
  status: boolean;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface IGetEstablishmentDTO {
  token: string;
}

export interface ICreateEstablishmentDTO {
  name: string;
  token: string;
  status: boolean;
  address: string;
  lat: number;
  lng: number;
}

export interface IUpdateEstablishmentDTO {
  id: string;
  name: string;
  token: string;
  status: boolean;
  address: string;
  lat: number;
  lng: number;
}

export interface IDeleteEstablishmentInputDTO {
  establishmentId: string;
  token: string;
}

export class Establishment {
  constructor(
    private id: string,
    private name: string,
    private creatorId: string,
    private createAt: Date,
    private status: boolean,
    private address: string,
    private coordinates: {
      lat: number;
      lng: number;
    }
  ) {}

  public toIEstablishmentDBModel = (): IEstablishmentDb => {
    return {
      id: this.id,
      name: this.name,
      creator_id: this.creatorId,
      create_at: this.createAt,
      status: this.getStatus(),
      address: this.address,
      lat: this.coordinates.lat,
      lng: this.coordinates.lng,
    };
  };

  public getId = () => this.id;

  public getEstablishment = () => this.name;

  public getCreatorId = () => this.creatorId;

  public getStartsAt = () => this.createAt;

  public getStatus = (): number => {
    if (this.status) {
      return 1;
    }
    return 0;
  };

  public getAddress = () => this.address;

  public getCoordinates = () => this.coordinates;
}
