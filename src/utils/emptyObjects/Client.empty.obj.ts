import { IClient, IInsertClient } from "@/interfaces/person/client/IClient";

export const emptyClient: IInsertClient = {
    id: "",
    name: "",
    document: "",
    email: "",
    phone: "",
    street: "",
    houseNumber: "",
    complement: "",
    neighbor: "",
    uf: "",
    cep: "",
    roofType: "",
    propertyType: "",
  };
  