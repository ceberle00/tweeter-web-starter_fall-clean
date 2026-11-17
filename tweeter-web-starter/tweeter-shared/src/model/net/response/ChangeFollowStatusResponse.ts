import { Response } from "./Response";

export interface FollowCountResponse extends Response //follow and unfollow response
{
    readonly followerCount: number,
    readonly followeeCount: number
}