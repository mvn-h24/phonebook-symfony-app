import axios from "axios";
import { resName } from "./app.config";
import { Contact } from "@app/types";

export const putContact = (contact: Contact) =>
  axios
    .put(resName.contact + `/${contact.id}`, contact)
    .then((res) => res.data);
