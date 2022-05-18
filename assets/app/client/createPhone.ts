import { CreatePhoneDto } from "@app/types";
import axios from "axios";
import { resName } from "./app.config";

export const createPhone = (dto: CreatePhoneDto) =>
  axios.post(resName.phone, dto).then((res) => res.data);
