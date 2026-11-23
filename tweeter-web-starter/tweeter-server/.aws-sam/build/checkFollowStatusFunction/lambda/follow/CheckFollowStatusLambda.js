"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const FollowService_1 = require("../../model/service/FollowService");
const handler = async (request) => {
    //need two users, pass in through request
    //response just needs a boolean, extra along with built in success and message
    const followService = new FollowService_1.FollowService();
    const isFollowing = await followService.getIsFollowerStatus(request.token, request.userAlias, request.selectedUserAlias);
    return {
        success: true,
        message: null,
        isFollowing: isFollowing
    };
};
exports.handler = handler;
