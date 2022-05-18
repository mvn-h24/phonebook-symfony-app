import { Phone } from "./phone";

export interface Contact {
  id?: string;
  firstName?: string;
  lastName?: string;
  patronimycName?: string;
  phones?: Phone[];
}

export interface CreateContactDto extends Omit<Contact, "id" | "phones"> {
  firstName: string;
  lastName: string;
  patronimycName: string;
}
