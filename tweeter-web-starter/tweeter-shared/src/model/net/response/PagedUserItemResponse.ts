import { UserDTO } from "../../dto/UserDTO";
import { TweeterResponse } from "./TweeterResponse";

export interface PagedUserItemResponse <T> extends TweeterResponse {
    readonly items: T[] | null,
    readonly hasMore: boolean,
}