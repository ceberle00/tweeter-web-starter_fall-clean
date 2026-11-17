import { UserDTO } from "../../dto/UserDTO";
import { Response } from "./Response";

export interface PagedUserItemResponse extends Response {
    readonly items: UserDTO[] | null,
    readonly hasMore: boolean,
}