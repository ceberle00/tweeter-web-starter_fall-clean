import { FollowRequests } from "./FollowRequests";

export interface CheckIfFollowRequest extends FollowRequests
{
    readonly selectedUserAlias : string
}