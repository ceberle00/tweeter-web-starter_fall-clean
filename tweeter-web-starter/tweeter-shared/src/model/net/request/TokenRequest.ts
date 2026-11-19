import { TweeterRequest } from "./TweeterRequest";

export interface TokenRequest extends TweeterRequest
{
    readonly token : string
}