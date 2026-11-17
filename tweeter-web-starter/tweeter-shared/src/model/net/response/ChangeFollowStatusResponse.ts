import { Response } from "./Response";

export interface ChangeFollowStatusResponse extends Response
{
    readonly followerCount: number,
    readonly followeeCount: number
}