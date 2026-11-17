import { ChangeFollowStatusResponse, FollowRequests } from "tweeter-shared";
import { FollowService } from "../../model/service/FollowService";

export const handler = async (request: FollowRequests) : Promise<ChangeFollowStatusResponse> => {
    const followService = new FollowService();
    const [followerCount, followeeCount] = await followService.follow(request.token, request.userAlias)
    return {
        success: true,
        message: null,
        followerCount: followerCount,
        followeeCount: followeeCount,
    }
}