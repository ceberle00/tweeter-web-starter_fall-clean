import { TokenRequest } from "./TokenRequest";

export interface GetUserRequest extends TokenRequest
{
    readonly userAlias : string //could be merged with followRequests, change later
}