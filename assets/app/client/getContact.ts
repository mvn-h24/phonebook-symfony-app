import axios, { AxiosResponse } from "axios";
import { Contact } from "@app/types";
import { resName } from "./app.config";

export const getContact = (id: number) =>
  axios
    .get<unknown, AxiosResponse<Contact>>(resName.contact + `/${id}`)
    .then((res) => res.data);
