import { Response } from "./Response";

export interface CheckIfFollowResponse extends Response {
    readonly isFollowing: boolean,
}