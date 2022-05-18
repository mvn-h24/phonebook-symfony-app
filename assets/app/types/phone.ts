export interface Phone {
  id?: string;
  phoneNumber?: string;
  comment?: string;
  contact?: string | number;
}

export interface CreatePhoneDto extends Omit<Phone, "id"> {
  phoneNumber: string;
  comment: string;
  contact: number;
}
