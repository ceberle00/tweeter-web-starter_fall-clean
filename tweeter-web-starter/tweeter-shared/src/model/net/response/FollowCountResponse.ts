import { Response } from "./Response";

export interface FollowCountResponse extends Response {
    readonly followCount: number //works for followee and follower
}