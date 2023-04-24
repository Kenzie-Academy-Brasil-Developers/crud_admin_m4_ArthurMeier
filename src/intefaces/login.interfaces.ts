import { z } from "zod";
import {
  requestLoginSchema,
  responseLoginSchema,
} from "../schemas/login.schemas";

type TloginRequest = z.infer<typeof requestLoginSchema>;
type TloginResponse = z.infer<typeof responseLoginSchema>;

export { TloginRequest, TloginResponse };
