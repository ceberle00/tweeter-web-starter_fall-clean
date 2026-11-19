import { TweeterResponse } from "./TweeterResponse";

export interface ChangeFollowStatusResponse extends TweeterResponse
{
    readonly followerCount: number,
    readonly followeeCount: number
}