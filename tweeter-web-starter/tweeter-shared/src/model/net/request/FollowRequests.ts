import { TokenRequest } from "./TokenRequest";

export interface FollowRequests extends TokenRequest
{
    readonly userAlias : string,
}