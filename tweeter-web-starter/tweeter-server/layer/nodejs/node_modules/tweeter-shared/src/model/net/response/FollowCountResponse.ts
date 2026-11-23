import { TweeterResponse } from "./TweeterResponse";

export interface FollowCountResponse extends TweeterResponse {
    readonly followCount: number //works for followee and follower
}