"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetFolloweesLambda = void 0;
const FollowService_1 = require("../../model/service/FollowService");
const GetFolloweesLambda = async (request) => {
    const followService = new FollowService_1.FollowService();
    const [items, hasMore] = await followService.loadMoreFollowees(request.token, request.userAlias, request.pageSize, request.lastItem);
    return {
        success: true,
        message: null,
        items: items,
        hasMore: hasMore
    };
};
exports.GetFolloweesLambda = GetFolloweesLambda;
