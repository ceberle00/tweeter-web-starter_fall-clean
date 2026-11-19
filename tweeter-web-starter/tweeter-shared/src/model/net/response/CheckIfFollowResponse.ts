import { TweeterResponse } from "./TweeterResponse";

export interface CheckIfFollowResponse extends TweeterResponse {
    readonly isFollowing: boolean,
}