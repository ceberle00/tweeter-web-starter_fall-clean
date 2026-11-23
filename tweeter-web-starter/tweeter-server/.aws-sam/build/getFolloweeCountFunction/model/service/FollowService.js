"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FollowService = void 0;
const tweeter_shared_1 = require("tweeter-shared");
class FollowService {
    async loadMoreFollowees(token, userAlias, pageSize, lastItem) {
        // TODO: Replace with the result of calling server
        return await this.getFakeData(userAlias, pageSize, lastItem);
    }
    ;
    async loadMoreFollowers(token, userAlias, pageSize, lastItem) {
        // TODO: Replace with the result of calling server
        return await this.getFakeData(userAlias, pageSize, lastItem);
    }
    ;
    async getIsFollowerStatus(authToken, user, selectedUser) {
        // TODO: Replace with the result of calling server
        //unsure what to do here
        return tweeter_shared_1.FakeData.instance.isFollower(); //left? maybe need to change? girl idk
    }
    ;
    async getFolloweeCount(authToken, user) {
        // TODO: Replace with the result of calling server
        return tweeter_shared_1.FakeData.instance.getFolloweeCount(user);
    }
    ;
    async getFollowerCount(authToken, user) {
        // TODO: Replace with the result of calling server
        return tweeter_shared_1.FakeData.instance.getFollowerCount(user);
    }
    ;
    async follow(authToken, userToFollow) {
        // Pause so we can see the follow message. Remove when connected to the server
        await new Promise((f) => setTimeout(f, 2000));
        // TODO: Call the server
        return await this.followStatusChange(authToken, userToFollow);
    }
    ;
    async unfollow(authToken, userToUnfollow) {
        // Pause so we can see the unfollow message. Remove when connected to the server
        await new Promise((f) => setTimeout(f, 2000));
        // TODO: Call the server
        return await this.followStatusChange(authToken, userToUnfollow);
    }
    ;
    //extra functions for inside this class woohoo
    async followStatusChange(authToken, user) {
        const followerCount = await this.getFollowerCount(authToken, user);
        const followeeCount = await this.getFolloweeCount(authToken, user);
        return [followerCount, followeeCount];
    }
    async getFakeData(userAlias, pageSize, lastItem) {
        const [users, hasMore] = await tweeter_shared_1.FakeData.instance.getPageOfUsers(tweeter_shared_1.User.fromDTO(lastItem), pageSize, userAlias);
        const dtos = users.map((user) => user.DTO);
        return [dtos, hasMore];
    }
}
exports.FollowService = FollowService;
