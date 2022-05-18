import axios from "axios";
import { resName } from "./app.config";
import { CreateContactDto } from "@app/types";

export const createContact = (contact: CreateContactDto) =>
  axios.post(resName.contact, contact).then((res) => res.data);
