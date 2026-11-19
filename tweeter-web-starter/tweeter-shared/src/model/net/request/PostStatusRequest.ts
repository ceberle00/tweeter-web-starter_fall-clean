import { StatusDTO } from "../../dto/StatusDTO";
import { TokenRequest } from "./TokenRequest";

export interface PostStatusRequest extends TokenRequest
{
    readonly post : StatusDTO
}