import { CheckIfFollowRequest, CheckIfFollowResponse } from "tweeter-shared";
import { FollowService } from "../../model/service/FollowService";

export const handler = async (request: CheckIfFollowRequest) : Promise<CheckIfFollowResponse> => {
    //need two users, pass in through request
    //response just needs a boolean, extra along with built in success and message
    const followService = new FollowService();
    const isFollowing = await followService.getIsFollowerStatus(request.token, request.userAlias, request.selectedUserAlias);
    return {
        success: true,
        message: null,
        isFollowing: isFollowing
    }
}