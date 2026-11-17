import { AuthToken, FakeData, User, UserDTO } from "tweeter-shared";
import { Service } from "./Service";

export class FollowService implements Service
{
    public async loadMoreFollowees (
        token: string,
        userAlias: string,
        pageSize: number,
        lastItem: UserDTO | null
    ): Promise<[UserDTO[], boolean]> {
        // TODO: Replace with the result of calling server
        return await this.getFakeData(userAlias, pageSize, lastItem);
    };

    public async loadMoreFollowers (
            token: string,
            userAlias: string,
            pageSize: number,
            lastItem: UserDTO | null
    ): Promise<[UserDTO[], boolean]> {
            // TODO: Replace with the result of calling server
            return await this.getFakeData(userAlias, pageSize, lastItem);
    };

    public async getIsFollowerStatus (
        authToken: string,
        user: string,
        selectedUser: String,
    ): Promise<boolean> {
        // TODO: Replace with the result of calling server
        //unsure what to do here
        return FakeData.instance.isFollower(); //left? maybe need to change? girl idk
    };

    public async getFolloweeCount (
        authToken: string,
        user: string,
    ): Promise<number> {
        // TODO: Replace with the result of calling server
        return FakeData.instance.getFolloweeCount(user);
    };

    public async getFollowerCount (
        authToken: string,
        user: string,
    ): Promise<number> {
        // TODO: Replace with the result of calling server
        return FakeData.instance.getFollowerCount(user);
    };

    public async follow (
        authToken: string,
        userToFollow: string,
    ): Promise<[followerCount: number, followeeCount: number]> {
        // Pause so we can see the follow message. Remove when connected to the server
        await new Promise((f) => setTimeout(f, 2000));

        // TODO: Call the server

        return await this.followStatusChange(authToken, userToFollow);
    };

    public async unfollow (
        authToken: string,
        userToUnfollow: string,
    ): Promise<[followerCount: number, followeeCount: number]> {
        // Pause so we can see the unfollow message. Remove when connected to the server
        await new Promise((f) => setTimeout(f, 2000));

        // TODO: Call the server

        return await this.followStatusChange(authToken, userToUnfollow);
    };

    //extra functions for inside this class woohoo
    private async followStatusChange(authToken: string, user: string): Promise<[followerCount: number, followeeCount: number]>
    {
        const followerCount = await this.getFollowerCount(authToken, user);
        const followeeCount = await this.getFolloweeCount(authToken, user);

        return [followerCount, followeeCount];
    }
    private async getFakeData(userAlias: string, pageSize: number, lastItem: UserDTO | null): Promise<[UserDTO[], boolean]> {
        const [users, hasMore] = await FakeData.instance.getPageOfUsers(User.fromDTO(lastItem), pageSize, userAlias);
        const dtos = users.map((user) => user.DTO);
        return [dtos, hasMore];
    }
}