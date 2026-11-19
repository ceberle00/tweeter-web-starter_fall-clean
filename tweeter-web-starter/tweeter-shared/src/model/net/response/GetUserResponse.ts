import { UserDTO } from "../../dto/UserDTO";
import { TweeterResponse } from "./TweeterResponse";

export interface GetUserResponse extends TweeterResponse
{
    readonly user : UserDTO | null
}