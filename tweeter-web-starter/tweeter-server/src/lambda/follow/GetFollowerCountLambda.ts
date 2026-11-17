import { FollowCountResponse, FollowRequests } from "tweeter-shared";
import { FollowService } from "../../model/service/FollowService";

export const handler = async (request: FollowRequests) : Promise<FollowCountResponse> => {
    const followService = new FollowService();
    const followerCount = await followService.getFollowerCount(request.token, request.userAlias);
    return {
        success: true,
        message: null,
        followCount: followerCount
    }

}