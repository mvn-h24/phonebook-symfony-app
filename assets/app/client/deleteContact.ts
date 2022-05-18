import axios from "axios";
import { resName } from "./app.config";

export const deleteContact = (id: number) =>
  axios.delete(resName.contact + `/${id}`).then((res) => res.data);
