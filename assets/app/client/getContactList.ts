import axios, { AxiosResponse } from "axios";
import { Contact } from "@app/types";
import { resName } from "./app.config";

export const getContactList = () =>
  axios
    .get<unknown, AxiosResponse<Contact[] | unknown>>(resName.contact)
    .then((res) => res.data);
