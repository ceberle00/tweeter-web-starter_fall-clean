"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetFollowersLambda = void 0;
const FollowService_1 = require("../../model/service/FollowService");
const GetFollowersLambda = async (request) => {
    const followService = new FollowService_1.FollowService();
    const [items, hasMore] = await followService.loadMoreFollowers(request.token, request.userAlias, request.pageSize, request.lastItem);
    return {
        success: true,
        message: null,
        items: items,
        hasMore: hasMore
    };
};
exports.GetFollowersLambda = GetFollowersLambda;
