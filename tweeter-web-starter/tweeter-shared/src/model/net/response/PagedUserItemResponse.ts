import { UserDTO } from "../../dto/UserDTO";
import { Response } from "./Response";

export interface PagedUserItemResponse <T> extends Response {
    readonly items: T[] | null,
    readonly hasMore: boolean,
}