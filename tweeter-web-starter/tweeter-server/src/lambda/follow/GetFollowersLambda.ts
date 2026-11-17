import { PagedUserItemRequest, PagedUserItemResponse } from "tweeter-shared";
import { FollowService } from "../../model/service/FollowService";

export const GetFollowersLambda = async (request: PagedUserItemRequest) : Promise<PagedUserItemResponse> => {
    const followService = new FollowService();
}